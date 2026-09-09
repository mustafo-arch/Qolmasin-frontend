// src/store/authStore.ts

import { create } from 'zustand';
// import { persist } from 'zustand/middleware'; // <--- OLIB TASHLANDI
import type { AuthState, LoginDto, RegisterDto } from './types';
import { authEndpoints } from './api';

interface AuthActions {
  login: (credentials: LoginDto) => Promise<void>;
  register: (userData: RegisterDto) => Promise<void>;
  logout: () => Promise<void>;
  logoutAll: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

// persist o'rniga oddiy create ishlatiladi
export const useAuthStore = create<AuthStore>()((set, get) => ({
  // Initial state
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Actions
  login: async (credentials: LoginDto) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await authEndpoints.login(credentials);
      const { accessToken, user } = response.data;
      
      set({
        user,
        accessToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  register: async (userData: RegisterDto) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await authEndpoints.register(userData);
      const { accessToken, user } = response.data;
      
      set({
        user,
        accessToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      await authEndpoints.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        error: null,
      });
    }
  },

  logoutAll: async () => {
    try {
      await authEndpoints.logoutAll();
    } catch (error) {
      console.error('Logout all error:', error);
    } finally {
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        error: null,
      });
    }
  },

  checkAuth: async () => {
    const { accessToken } = get();
    
    // Agar token yo'q bo'lsa, refresh cookie orqali yangilashga urinamiz
    if (!accessToken) {
      try {
        const response = await authEndpoints.refresh();
        const newAccessToken = response.data.accessToken;
        
        set({ accessToken: newAccessToken });
        
        const userResponse = await authEndpoints.getCurrentUser();
        set({
          user: userResponse.data,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return;
      } catch {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
        return;
      }
    }

    // Token mavjud bo'lsa validate qilamiz
    set({ isLoading: true });
    
    try {
      const response = await authEndpoints.getCurrentUser();
      set({
        user: response.data,
        accessToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      // Token invalid bo'lsa refresh qilishga urinamiz
      try {
        const refreshResponse = await authEndpoints.refresh();
        const newAccessToken = refreshResponse.data.accessToken;
        
        set({ accessToken: newAccessToken });
        
        const userResponse = await authEndpoints.getCurrentUser();
        set({
          user: userResponse.data,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));