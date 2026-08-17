import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

// Create Axios Instance with default headers and credentials
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request Interceptor: Inject JWT Token & Role Header for strict security
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('foodbridge_jwt_token');
    const userRole = localStorage.getItem('foodbridge_user_role') || 'USER';
    const userId = localStorage.getItem('foodbridge_user_id') || '1';

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['X-User-Role'] = userRole;
    config.headers['X-User-Id'] = userId;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle global API responses & errors gracefully
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 403) {
      console.warn('[FoodBridge Security Warning]: 403 Forbidden - Access denied to private owner resource.');
    }
    return Promise.reject(error);
  }
);

// End-to-End Connected API Endpoints
export const FoodBridgeApi = {
  // Authentication
  login: (credentials) => apiClient.post('/auth/login', credentials),
  register: (userData) => apiClient.post('/auth/register', userData),
  googleAuth: (data) => apiClient.post('/auth/google', data),
  requestPhoneOtp: (phoneData) => apiClient.post('/auth/phone/send-otp', phoneData),
  verifyPhoneOtp: (otpData) => apiClient.post('/auth/phone/verify-otp', otpData),
  getMe: () => apiClient.get('/auth/me'),

  // Role Onboarding
  onboardBusiness: (data) => apiClient.post('/onboarding/business', data),
  onboardNgo: (data) => apiClient.post('/onboarding/ngo', data),

  // Owner Private Business Profile (403 Forbidden for non-owners)
  getOwnerBusinessProfile: () => apiClient.get('/businesses/me'),

  // Map & Geo Entities
  getNearbyMapPlaces: (lat, lng, radius = 5.0) => apiClient.get(`/map/nearby?lat=${lat}&lng=${lng}&radiusKm=${radius}`),
  getRestaurants: () => apiClient.get('/map/restaurants'),
  getNgos: () => apiClient.get('/map/ngos'),

  // Food Surplus Listings & Workflows
  getFoodListings: (params) => apiClient.get('/food/nearby', { params }),
  createFoodListing: (foodData) => apiClient.post('/food', foodData),
  claimDonation: (donationData) => apiClient.post('/donations/claim', donationData),
  
  // Wallet & Receipts
  getWalletBalance: () => apiClient.get('/wallet/balance'),
  getTaxReceipt: (receiptId) => apiClient.get(`/tax/receipt/${receiptId}`)
};
