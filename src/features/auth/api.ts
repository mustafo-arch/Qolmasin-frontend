// src/api/auth.api.ts

import axios from 'axios';
import type {
  LoginDto,
  RegisterDto,
  ForgotPasswordDto,
  ResendVerificationDto,
  ResetPasswordDto,
  VerifyEmailDto,
  AuthResult,
  PublicUser,
} from './types';
import { useAuthStore } from './store';

const API_BASE_URL = 'http://localhost:3000/api/v1';

export const authApi = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  withCredentials: true, // Refresh token cookie orqali yuboriladi
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - access token Zustand store'dan olinadi
authApi.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - 401 da refresh token orqali yangilash
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Refresh token orqali yangi access token olish
        const response = await authApi.post('/refresh');
        const { accessToken } = response.data;
        
        // Yangi access token ni Zustand store'da yangilash
        useAuthStore.setState({ accessToken });
        
        // Original requestni yangi token bilan takrorlash
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return authApi(originalRequest);
      } catch (refreshError) {
        // Refresh ham ishlamasa, logout qilish
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export const authEndpoints = {
  register: (data: RegisterDto) => 
    authApi.post<AuthResult>('/register', data),
  
  login: (data: LoginDto) => 
    authApi.post<AuthResult>('/login', data),
  
  logout: () => 
    authApi.post('/logout'),
  
  logoutAll: () => 
    authApi.post('/logout-all'),
  
  refresh: () => 
    authApi.post<{ accessToken: string }>('/refresh'),
  
  verifyEmail: (data: VerifyEmailDto) => 
    authApi.post('/verify-email', data),
  
  resendVerification: (data: ResendVerificationDto) => 
    authApi.post('/resend-verification', data),
  
  forgotPassword: (data: ForgotPasswordDto) => 
    authApi.post('/forgot-password', data),
  
  resetPassword: (data: ResetPasswordDto) => 
    authApi.post('/reset-password', data),
  
  getCurrentUser: () => 
    authApi.get<PublicUser>('/me'),
};