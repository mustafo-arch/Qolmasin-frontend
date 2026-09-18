import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// Eslatma: UserRole tipini import qilish shart emas, chunki biz string bilan ishlaymiz
// Lekin agar kerak bo'lsa: import type { UserRole } from '@/features/auth/types';
import { useAuthStore } from '@/features/auth/store';

interface RoleGuardProps {
  // allowedRoles endi string[] bo'ladi, bu xavfsizroq
  allowedRoles: string[]; 
}

const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles }) => {
  const { user, isAuthenticated } = useAuthStore();

  // 1. Agar login qilinmagan bo'lsa -> Login sahifasiga
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Rolni tekshirish (Debug uchun console.log qo'shamiz)
  // Konsolda "Checking role: ADMIN against ['MODERATOR', 'ADMIN']" ko'rinadi
  console.log('RoleGuard Check:', { 
    currentUserRole: user.role, 
    allowedRoles: allowedRoles 
  });

  // includes() metodi stringlar uchun ishonchli ishlaydi
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. Hammasi joyida bo'lsa -> Bolalarni (Outlet) ko'rsatish
  return <Outlet />;
};

export default RoleGuard;