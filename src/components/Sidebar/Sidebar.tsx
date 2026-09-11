import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserRole } from '@/features/auth/types'; // Enum manzilingizni tekshiring
import { useAuthStore } from '@/features/auth/store';

// Menyu konfiguratsiyasi
const menuConfig = {
  CUSTOMER: [
    { name: 'Bosh sahifa', path: '/app/dashboard', icon: '🏠' }, // /app prefix qo'shildi
    { name: 'Buyurtmalarim', path: '/app/orders', icon: '🛍️' },
    { name: 'Sevimlilar', path: '/app/favorites', icon: '❤️' },
    { name: 'Xabarnomalar', path: '/app/alerts', icon: '' },
    { name: 'Profil', path: '/app/profile', icon: '👤' },
  ],
  BUSINESS: [
    { name: 'Analitika', path: '/app/business/dashboard', icon: '📊' },
    { name: 'Filiallar', path: '/app/business/branches', icon: '📍' },
    { name: 'Mahsulotlar', path: '/app/business/products', icon: '' },
    { name: 'Chegirmalar', path: '/app/business/offers', icon: '🏷️' },
    { name: 'Buyurtmalar', path: '/app/business/orders', icon: '📋' },
    { name: 'Jamoa', path: '/app/business/team', icon: '👥' },
    { name: 'Sharhlar', path: '/app/business/reviews', icon: '⭐' },
  ],
  ADMIN: [
    { name: 'Admin Panel', path: '/app/admin/dashboard', icon: '🛡️' },
    { name: 'Foydalanuvchilar', path: '/app/admin/users', icon: '👥' },
    { name: 'Bizneslar', path: '/app/admin/businesses', icon: '🏢' },
    { name: 'Kategoriyalar', path: '/app/admin/categories', icon: '️' },
    { name: 'Shikoyatlar', path: '/app/admin/reports', icon: '🚩' },
    { name: 'Anomaliyalar', path: '/app/admin/anomalies', icon: '️' },
    { name: 'Audit Loglari', path: '/app/admin/audit-logs', icon: '📜' },
  ],
};

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // 1. Store dan user va logout funksiyasini olamiz
  const { user, logout } = useAuthStore(); 

  // 2. Rolga qarab menyuni tanlash
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

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full shadow-sm">
      {/* Logo qismi */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Qolmasin</h1>
      </div>

      {/* Foydalanuvchi ma'lumoti (ixtiyoriy) */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
          {user?.fullName || 'Foydalanuvchi'}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
          {user?.role?.toLowerCase().replace('_', ' ')}
        </p>
      </div>

      {/* Menyu elementlari */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {currentMenu.map((item) => {
          // Path to'liq mosligini tekshirish
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300" 
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Pastki qism (Logout) */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 transition-colors"
        >
          <span>🚪</span> Chiqish
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;