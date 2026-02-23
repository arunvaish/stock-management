import axios from 'axios';
import type { LoginCredentials, SignupData, AuthResponse, User } from '../types';
import { mockAuthApi } from './mockAuthApi';

// Use mock API in development or when VITE_USE_MOCK_API is true
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true' || import.meta.env.DEV;

// Configure your API base URL here
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    if (USE_MOCK_API) {
      return mockAuthApi.login(credentials);
    }

    try {
      const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    }
  },

  signup: async (data: SignupData): Promise<AuthResponse> => {
    if (USE_MOCK_API) {
      return mockAuthApi.signup(data);
    }

    try {
      const response = await axiosInstance.post<AuthResponse>('/auth/signup', {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      return response.data;
    } catch (error) {
      throw new Error('Signup failed. Please try again.');
    }
  },

  getCurrentUser: async (): Promise<User> => {
    if (USE_MOCK_API) {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No token found');
      return mockAuthApi.getCurrentUser(token);
    }

    try {
      const response = await axiosInstance.get<User>('/auth/me');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user information.');
    }
  },

  logout: async (): Promise<void> => {
    if (USE_MOCK_API) {
      return mockAuthApi.logout();
    }

    try {
      await axiosInstance.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
};

export default axiosInstance;
