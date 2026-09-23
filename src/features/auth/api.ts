// src/api/auth.api.ts

import axios from 'axios';
import type {
  LoginDto,
  RegisterDto,
  ForgotPasswordDto,
  ResendVerificationDto,
  ResetPasswordDto,
  ChangePasswordDto,
  VerifyEmailDto,
  AuthResult,
  PublicUser,
} from './types';
import { useAuthStore } from './store';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

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
    // Agar bu refresh yoki logout so'rovi bo'lsa, token qo'shmaslik kerak (ba'zan)
    // Lekin asosan accessToken kerak
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
    
    // MUHIM: Agar so'rov /refresh yoki /logout bo'lsa va 401 kelsa, 
    // yana refresh qilishga urinmaymiz (loop oldini olish uchun)
    if (
      error.response?.status === 401 && 
      !originalRequest._retry && 
      !originalRequest.url?.includes('/refresh') &&
      !originalRequest.url?.includes('/logout')
    ) {
      originalRequest._retry = true;
      
      try {
        // Refresh token orqali yangi access token olish
        // Bu yerda authApi.post ishlatamiz, lekin u yana interceptorga tushmasligi uchun
        // alohida axios instance yoki flag ishlatish mumkin. 
        // Hozircha oddiy usul bilan ketamiz, chunki /refresh 401 bermasligi kerak.
        const response = await authApi.post('/refresh');
        const { accessToken } = response.data;
        
        // Yangi access token ni Zustand store'da yangilash
        useAuthStore.setState({ accessToken });
        
        // Original requestni yangi token bilan takrorlash
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return authApi(originalRequest);
      } catch (refreshError) {
        // Refresh ham ishlamasa, logout qilish
        // Lekin logout so'rovini yubormasdan turib state ni tozalaymiz
        useAuthStore.getState().logout(false); // false = serverga so'rov yuborma
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
  
  // logoutNow parametri qo'shildi: agar false bo'lsa, serverga so'rov yuborilmaydi
  logout: (sendRequest = true) => 
    sendRequest ? authApi.post('/logout') : Promise.resolve(),
  
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

  changePassword: (data: ChangePasswordDto) => 
    authApi.post<{ message: string }>('/change-password', data),
  
  getCurrentUser: () => 
    authApi.get<PublicUser>('/me'),
};