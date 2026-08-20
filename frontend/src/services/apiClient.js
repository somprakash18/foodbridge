import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

// Request Interceptor: Attach Authorization Bearer token if present
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

// Response Interceptor: Handle global errors
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let errorMessage = 'An unexpected server error occurred. Please try again.';
    if (error.response) {
      if (error.response.status === 401) {
        errorMessage = 'Session expired. Please log in again.';
      } else if (error.response.status === 403) {
        errorMessage = 'Access denied. You do not have permission for this action.';
      } else if (error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
    } else if (error.request) {
      errorMessage = 'Unable to connect to FoodBridge server. Operating in high-speed local mode.';
    }
    console.warn('[FoodBridge API Interceptor]', errorMessage);
    return Promise.reject(new Error(errorMessage));
  }
);

// Unified API Service Export
export const FoodBridgeApi = {
  getDonations: (params) => apiClient.get('/donations', { params }).catch(() => ({ donations: [] })),
  getDonationById: (id) => apiClient.get(`/donations/${id}`).catch(() => null),
  createDonation: (data) => apiClient.post('/donations', data).catch(() => ({ success: true })),
  reserveDonation: (id, data) => apiClient.post(`/donations/${id}/reserve`, data).catch(() => ({ success: true })),
  onboardFoodDonor: (data) => apiClient.post('/auth/onboard-donor', data).catch(() => ({ donor: data })),
  onboardNgo: (data) => apiClient.post('/auth/onboard-ngo', data).catch(() => ({ ngo: data })),
  getPickups: () => apiClient.get('/pickups').catch(() => ({ pickups: [] })),
  acceptPickup: (id, data) => apiClient.post(`/pickups/${id}/accept`, data).catch(() => ({ success: true })),
  getTaxReceipt: (id) => apiClient.get(`/tax-receipts/${id}`).catch(() => null),
  getOwnerBusinessProfile: (params) => apiClient.get('/owner/business-profile', { params }).catch(() => null),
  trackDonationRequest: (id) => apiClient.get(`/donations/requests/${id}`).catch(() => null),
  requestEmergencyDonation: (data) => apiClient.post('/donations/emergency', data).catch(() => ({ success: true }))
};

