// src/store/authStore.ts

import { create } from 'zustand';
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

export const useAuthStore = create<AuthStore>()((set, get) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials: LoginDto) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authEndpoints.login(credentials);
      const { accessToken, user } = response.data;
      set({ user, accessToken, isAuthenticated: true, isLoading: false, error: null });
    } catch (error: any) {
      set({ isLoading: false, error: error.response?.data?.message || 'Login failed' });
      throw error;
    }
  },

  register: async (userData: RegisterDto) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authEndpoints.register(userData);
      const { accessToken, user } = response.data;
      set({ user, accessToken, isAuthenticated: true, isLoading: false, error: null });
    } catch (error: any) {
      set({ isLoading: false, error: error.response?.data?.message || 'Registration failed' });
      throw error;
    }
  },

  logout: async () => {
    try { await authEndpoints.logout(); } catch (e) { console.error(e); }
    finally {
      set({ user: null, accessToken: null, isAuthenticated: false, error: null });
    }
  },

  logoutAll: async () => {
    try { await authEndpoints.logoutAll(); } catch (e) { console.error(e); }
    finally {
      set({ user: null, accessToken: null, isAuthenticated: false, error: null });
    }
  },

  // YANGI LOGIKA: Token kelgunicha kutish va "Path hack" ishlatish
  checkAuth: async () => {
    const state = get();
    
    // Agar allaqachon tekshirilayotgan bo'lsa yoki user mavjud bo'lsa, qayta urinmaymiz
    if (state.isLoading || (state.isAuthenticated && state.user)) return;

    set({ isLoading: true });

    try {
      // 1. Avval memory dagi token bilan urinish
      if (state.accessToken) {
        const response = await authEndpoints.getCurrentUser();
        set({ user: response.data, isAuthenticated: true, isLoading: false });
        return;
      }

      // 2. Token yo'q bo'lsa, refresh qilishga urinamiz
      // Backend cookie path i noto'g'ri bo'lgani uchun, biz to'g'ridan-to'g'ri 
      // /api/v1/auth/refresh manziliga fetch yuboramiz. Bu brauzerni cookieni yuborishga majbur qiladi.
      let newAccessToken: string | undefined;
      
      try {
        // Axios interceptor orqali urinib ko'ramiz
        const res = await authEndpoints.refresh();
        newAccessToken = res.data.accessToken;
      } catch (axiosError) {
        // Agar axios ishlamasa (cookie yuborilmagani uchun), to'g'ridan-to'g'ri fetch ishlatamiz
        console.warn('Axios refresh failed, trying direct fetch to correct path...');
        const directRes = await fetch('/api/v1/auth/refresh', {
          method: 'POST',
          credentials: 'include', // Cookie ni majburan yuborish
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (!directRes.ok) throw new Error('Direct refresh also failed');
        const data = await directRes.json();
        newAccessToken = data.accessToken;
      }

      // Yangi tokenni store ga saqlaymiz
      if (newAccessToken) {
        set({ accessToken: newAccessToken });
        const userResponse = await authEndpoints.getCurrentUser();
        set({ user: userResponse.data, isAuthenticated: true, isLoading: false });
      } else {
        throw new Error('No token received');
      }

    } catch (error) {
      // Hammasi ishlamasa, logout holatiga o'tkazish
      console.warn('Auth check failed completely');
      set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));