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

// Request Interceptor: Automatically inject JWT Bearer Token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('foodbridge_jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle global API responses & errors gracefully
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.warn('[FoodBridge API Connection Notice]:', error.message || 'API request failed');
    return Promise.reject(error);
  }
);

// End-to-End Connected API Endpoints
export const FoodBridgeApi = {
  // Authentication
  login: (credentials) => apiClient.post('/auth/login', credentials),
  register: (userData) => apiClient.post('/auth/register', userData),
  googleAuth: (googleToken) => apiClient.post('/auth/google', { token: googleToken }),
  verifyPhoneOtp: (otpData) => apiClient.post('/auth/phone-verify', otpData),
  getMe: () => apiClient.get('/auth/me'),

  // Map & Geo Entities
  getNearbyMapPlaces: (lat, lng, radius = 5.0) => apiClient.get(`/map/nearby?lat=${lat}&lng=${lng}&radiusKm=${radius}`),
  getRestaurants: () => apiClient.get('/map/restaurants'),
  getNgos: () => apiClient.get('/map/ngos'),
  getDrivers: () => apiClient.get('/map/drivers'),

  // Entity Registrations & Updates
  registerRestaurant: (data) => apiClient.post('/restaurants/register', data),
  updateRestaurantLocation: (locationData) => apiClient.put('/restaurants/location', locationData),
  registerNgo: (data) => apiClient.post('/ngos/register', data),
  updateDriverLocation: (locationData) => apiClient.post('/drivers/location', locationData),

  // Food Surplus Listings
  getFoodListings: (params) => apiClient.get('/food/nearby', { params }),
  createFoodListing: (foodData) => apiClient.post('/food', foodData),
  
  // Orders & Wallet
  createOrder: (orderData) => apiClient.post('/orders', orderData),
  claimDonation: (donationData) => apiClient.post('/donations/claim', donationData),
  getWalletBalance: () => apiClient.get('/wallet/balance'),
  getTransactions: () => apiClient.get('/wallet/transactions')
};
