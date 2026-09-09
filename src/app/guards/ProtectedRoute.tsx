// src/guards/ProtectedRoute.tsx
import { useAuthStore } from '@/features/auth/store';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'; // <--- Outlet ni import qiling

interface ProtectedRouteProps {
  children?: React.ReactNode; // <--- '?' belgisini qo'shing
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();

  React.useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      checkAuth();
    }
  }, [isAuthenticated, isLoading, checkAuth]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Agar children berilgan bo'lsa uni, bo'lmasa Outlet orqali router bolalarini chiqaramiz
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;