// src/components/layout/Navbar.tsx

import React, { useState, useRef, useEffect } from 'react';
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
  Settings,
  X,
  ChevronDown,
} from 'lucide-react';

import { UserRole } from '@/features/auth/types';
import { useAuthStore } from '@/features/auth/store';

// Profil menyusi olib tashlandi, faqat navbarda turadigan asosiy tugmalar qoldi
const menuConfig = {
  CUSTOMER: [
    { name: 'Bosh sahifa', path: '/app/dashboard', icon: Home },
    { name: 'Buyurtmalarim', path: '/app/orders', icon: ShoppingBag },
    { name: 'Sevimlilar', path: '/app/favorites', icon: Heart },
    { name: 'Xabarnomalar', path: '/app/alerts', icon: Bell },
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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Tashqariga bosilganda dropdown menyuni yopish
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleConfirmLogout = async () => {
    await logout();
    setIsLogoutDialogOpen(false);
    setIsUserMenuOpen(false);
    navigate('/login', { replace: true });
  };

  return (
    <>
      <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm select-none transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-1">
              <span className="text-2xl font-black text-[#005B41] dark:text-emerald-400 tracking-tight">
                Qol<span className="text-amber-500">masin</span>
              </span>
            </Link>
          </div>

          {/* Sahifalarga o'tish tugmalari */}
          <nav className="hidden md:flex items-center space-x-2 overflow-x-auto py-2 custom-scrollbar">
            {currentMenu.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-50 text-[#005B41] font-semibold dark:bg-gray-800 dark:text-emerald-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-[#005B41] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors duration-200 ${
                      isActive ? 'text-[#005B41] dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Foydalanuvchi profili (Dropdown) */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-3 py-1.5 px-3 bg-emerald-50/40 hover:bg-emerald-50 border border-emerald-200/60 dark:bg-gray-800/60 dark:hover:bg-gray-800 dark:border-gray-700 rounded-full transition-all duration-200 cursor-pointer outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-[#005B41] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'M'}
              </div>
              <div className="min-w-0 text-left pr-1">
                <p className="text-xs font-bold text-gray-900 dark:text-white truncate max-w-[110px]">
                  {user?.fullName || 'Mustafo'}
                </p>
                <p className="text-[10px] text-emerald-700 dark:text-emerald-400 capitalize truncate font-medium">
                  {user?.role ? user.role.toLowerCase().replace('_', ' ') : 'Customer'}
                </p>
              </div>
              <ChevronDown className={`w-4 h-4 text-emerald-800 dark:text-emerald-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menyusi */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 z-50 animate-fadeIn">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                    {user?.fullName || 'Mustafo'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email || 'foydalanuvchi@app.uz'}
                  </p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      navigate('/app/profile');
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <User className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    <span>Profilga o'tish</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      navigate('/app/settings');
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <Settings className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    <span>Sozlamalar</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-gray-100 dark:border-gray-800">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsLogoutDialogOpen(true);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Tizimdan chiqish</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobil interfeys uchun navigatsiya */}
        <div className="md:hidden flex items-center overflow-x-auto px-4 py-2 border-t border-gray-100 dark:border-gray-800 space-x-1">
          {currentMenu.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-50 text-[#005B41] font-semibold dark:bg-gray-800 dark:text-emerald-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#005B41] dark:text-emerald-400' : 'text-gray-500'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* Chiqishni tasdiqlash modali */}
      {isLogoutDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-gray-800">
            <button
              onClick={() => setIsLogoutDialogOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
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