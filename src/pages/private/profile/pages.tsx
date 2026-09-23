// src/pages/private/profile/ProfilePage.tsx

import React, { useState } from 'react';
import { useAuthStore } from '@/features/auth/store';
import { User, Mail, Phone, Shield, Calendar, CheckCircle2, XCircle, Clock, KeyRound } from 'lucide-react';
import { ChangePasswordModal } from './components/ChangePasswordModal';

const ProfilePage: React.FC = () => {
  const { user, isLoading } = useAuthStore();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
        <User className="w-16 h-16 mb-4 opacity-50" />
        <p>Foydalanuvchi ma'lumotlari topilmadi</p>
      </div>
    );
  }

  // Rolni chiroyli formatlash
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'ADMIN': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'MODERATOR': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300';
      case 'BUSINESS_OWNER': 
      case 'BUSINESS_STAFF': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      default: return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 animate-fadeIn">
      
      {/* Sarlavha */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mening Profilim</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Shaxsiy ma'lumotlaringiz va akkaunt holati</p>
      </div>

      {/* Asosiy Profil Kartasi */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        
        {/* Header qismi (Gradient fon) */}
        <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-500 relative">
          <div className="absolute -bottom-12 left-8 flex items-end gap-4">
            {/* Katta Avatar */}
            <div className="w-24 h-24 rounded-2xl bg-white dark:bg-gray-800 p-1 shadow-lg">
              <div className="w-full h-full rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
            </div>
            
            {/* Ism va Rol (Header ustida) */}
            <div className="mb-2">
              <h2 className="text-2xl font-bold text-gray-700 dark:text-white">{user.fullName}</h2>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getRoleBadgeColor(user.role)}`}>
                {user.role.toLowerCase().replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>

        {/* Ma'lumotlar qismi */}
        <div className="pt-16 pb-8 px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Email */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                <Mail className="w-4 h-4" />
                <span>Email manzil</span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-base font-semibold text-gray-900 dark:text-white">
                  {user.email || 'Email kiritilmagan'}
                </p>
                {user.emailVerified ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" xlinkTitle="Tasdiqlangan" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" xlinkTitle="Tasdiqlanmagan" />
                )}
              </div>
            </div>

            {/* Telefon */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                <Phone className="w-4 h-4" />
                <span>Telefon raqami</span>
              </div>
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                {user.phone}
              </p>
            </div>

            {/* Ro'yxatdan o'tgan sana */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Ro'yxatdan o'tgan sana</span>
              </div>
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                {/* Backend dan createdAt kelishi kerak, hozircha placeholder */}
                2024-yil 1-yanvar
              </p>
            </div>

            {/* Akkaunt Holati */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                <Shield className="w-4 h-4" />
                <span>Akkaunt holati</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  <Clock className="w-3 h-3" />
                  Faol (Active)
                </span>
              </div>
            </div>

          </div>

          {/* Pastki qism - Qo'shimcha harakatlar */}
          <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Qo'shimcha sozlamalar</h3>
            <div className="flex flex-wrap gap-3">
              <button 
                type="button"
                onClick={() => setIsPasswordModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-xl transition-all shadow-sm active:scale-[0.98]"
              >
                <KeyRound className="size-4 text-emerald-600 dark:text-emerald-400" />
                Parolni o'zgartirish
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Parolni o'zgartirish modali */}
      <ChangePasswordModal 
        isOpen={isPasswordModalOpen} 
        onClose={() => setIsPasswordModalOpen(false)} 
      />
    </div>
  );
};

export default ProfilePage;