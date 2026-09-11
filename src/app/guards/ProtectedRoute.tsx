// src/components/auth/ProtectedRoute.tsx

import { Loader } from '@/components/Loader/Loader';
import { useAuthStore } from '@/features/auth/store';
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading, checkAuth, user, accessToken } = useAuthStore();

  useEffect(() => {
    // Faqatgina agar auth holati noma'lum bo'lsa va loading bo'lmasa tekshiramiz
    if (!isAuthenticated && !isLoading && !user && !accessToken) {
      checkAuth();
    }
  }, [isAuthenticated, isLoading, user, accessToken, checkAuth]);

  // Token kelishi kutilayotganda ekranda loader turadi
  if (isLoading) {
    return <Loader />;
  }

  // Auth tekshiruvidan o'tmagan bo'lsa login sahifasiga otadi
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};