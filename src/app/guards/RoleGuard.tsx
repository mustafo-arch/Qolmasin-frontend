// src/guards/RoleGuard.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import type { UserRole } from '@/features/auth/types'; // Type manzilingizni tekshiring
import { useAuthStore } from '@/features/auth/store';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children?: React.ReactNode; // <--- MUHIM: '?' belgisini qo'shing
}

const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const { user, isAuthenticated } = useAuthStore();

  // Agar login qilinmagan bo'lsa
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Agar roli mos kelmasa
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Agar children berilgan bo'lsa uni chiqaramiz, bo'lmasa Outlet orqali router bolalarini chiqaramiz
  return children ? <>{children}</> : <Outlet />;
};

export default RoleGuard;