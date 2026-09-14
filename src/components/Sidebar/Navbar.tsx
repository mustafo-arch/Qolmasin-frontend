// src/components/layout/Navbar.tsx

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  ShoppingBag,
  Heart,
  Bell,
  User,
  BarChart3,
  MapPin,
  Package,
  Tag,
  ClipboardList,
  Users,
  Star,
  ShieldAlert,
  UserCheck,
  Building2,
  FolderTree,
  Flag,
  AlertTriangle,
  FileText,
  LogOut,
  X,
} from 'lucide-react';

import { UserRole } from '@/features/auth/types';
import { useAuthStore } from '@/features/auth/store';

const menuConfig = {
  CUSTOMER: [
    { name: 'Bosh sahifa', path: '/app/dashboard', icon: Home },
    { name: 'Buyurtmalarim', path: '/app/orders', icon: ShoppingBag },
    { name: 'Sevimlilar', path: '/app/favorites', icon: Heart },
    { name: 'Xabarnomalar', path: '/app/alerts', icon: Bell },
    { name: 'Profil', path: '/app/profile', icon: User },
  ],
  BUSINESS: [
    { name: 'Analitika', path: '/app/business/dashboard', icon: BarChart3 },
    { name: 'Filiallar', path: '/app/business/branches', icon: MapPin },
    { name: 'Mahsulotlar', path: '/app/business/products', icon: Package },
    { name: 'Chegirmalar', path: '/app/business/offers', icon: Tag },
    { name: 'Buyurtmalar', path: '/app/business/orders', icon: ClipboardList },
    { name: 'Jamoa', path: '/app/business/team', icon: Users },
    { name: 'Sharhlar', path: '/app/business/reviews', icon: Star },
  ],
  ADMIN: [
    { name: 'Admin Panel', path: '/app/admin/dashboard', icon: ShieldAlert },
    { name: 'Foydalanuvchilar', path: '/app/admin/users', icon: UserCheck },
    { name: 'Bizneslar', path: '/app/admin/businesses', icon: Building2 },
    { name: 'Kategoriyalar', path: '/app/admin/categories', icon: FolderTree },
    { name: 'Shikoyatlar', path: '/app/admin/reports', icon: Flag },
    { name: 'Anomaliyalar', path: '/app/admin/anomalies', icon: AlertTriangle },
    { name: 'Audit Loglari', path: '/app/admin/audit-logs', icon: FileText },
  ],
};

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isLoading } = useAuthStore();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  let currentMenu = menuConfig.CUSTOMER;

  if (user?.role) {
    const businessRoles: UserRole[] = [UserRole.BUSINESS_OWNER, UserRole.BUSINESS_STAFF];
    const adminRoles: UserRole[] = [UserRole.MODERATOR, UserRole.ADMIN, UserRole.SUPER_ADMIN];

    if (businessRoles.includes(user.role)) {
      currentMenu = menuConfig.BUSINESS;
    } else if (adminRoles.includes(user.role)) {
      currentMenu = menuConfig.ADMIN;
    }
  }

  const handleConfirmLogout = async () => {
    await logout();
    setIsLogoutDialogOpen(false);
    navigate('/login', { replace: true });
  };

  return (
    <>
      <header className="w-full bg-white dark:bg-gray-900 border-b border-emerald-100/60 dark:border-gray-800 shadow-sm select-none transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-1">
              <span className="text-2xl font-black text-emerald-900 dark:text-emerald-400 tracking-tight">
                Qol<span className="text-amber-500">masin</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 overflow-x-auto py-2 custom-scrollbar">
            {currentMenu.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/10'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-emerald-50/80 dark:hover:bg-gray-800 hover:text-emerald-900 dark:hover:text-white'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500'
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side: User Profile & Logout */}
          <div className="flex items-center gap-3">
            {/* User Info Badge */}
            <div className="hidden sm:flex items-center gap-3 py-1.5 px-3 bg-emerald-50/50 dark:bg-gray-800/50 rounded-2xl border border-emerald-100/50 dark:border-gray-700/50">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'F'}
              </div>
              <div className="min-w-0 text-left">
                <p className="text-xs font-bold text-gray-900 dark:text-white truncate max-w-[100px]">
                  {user?.fullName || 'Foydalanuvchi'}
                </p>
                <p className="text-[10px] text-emerald-700 dark:text-emerald-400 capitalize truncate font-medium">
                  {user?.role ? user.role.toLowerCase().replace('_', ' ') : 'Foydalanuvchi'}
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={() => setIsLogoutDialogOpen(true)}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100/80 dark:bg-red-950/30 dark:hover:bg-red-900/40 rounded-xl transition-all duration-200 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Chiqish</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-navigation (agar ekran kichik bo'lsa pastda chiqishi uchun) */}
        <div className="md:hidden flex items-center overflow-x-auto px-4 py-2 border-t border-emerald-50 dark:border-gray-800 space-x-1">
          {currentMenu.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-emerald-50/80 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* Modal Dialog */}
      {isLogoutDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-2xl border border-emerald-50 dark:border-gray-800">
            <button
              onClick={() => setIsLogoutDialogOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mt-2">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto mb-4">
                <LogOut className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Tizimdan chiqish
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Haqiqatan ham hisobingizdan chiqmoqchimisiz?
              </p>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsLogoutDialogOpen(false)}
                className="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Bekor qilish
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={handleConfirmLogout}
                className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-red-600/20 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  'Chiqish'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;