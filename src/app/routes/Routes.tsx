import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar/Sidebar';
import RoleGuard from '../guards/RoleGuard';
import { LoginForm } from '@/features/auth/Pages/Login';
import { UserRole } from '@/features/auth/types';
import ProtectedRoute from '../guards/ProtectedRoute';
import { RegisterForm } from '@/features/auth/Pages/Register';
import Dashboard from '@/pages/public/Dashboard';
import About from '@/pages/public/about/About';

// =====================================================================
// ⚠️ VAQTINCHA PLACEHOLDER
// =====================================================================
const Placeholder = ({ name }: { name: string }) => (
  <div className="flex flex-col items-center justify-center h-full min-h-[50vh]">
    <div className="text-6xl mb-4"></div>
    <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
    <p className="mt-2 text-gray-500">Bu sahifa ishlab chiqilmoqda</p>
  </div>
);

// =====================================================================
// 🔒 PRIVATE LAYOUT (Sidebar + Content)
// =====================================================================
const AppLayout = () => (
  <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
    <Sidebar />
    <main className="flex-1 overflow-y-auto p-4 md:p-6 relative">
      {/* Ichki routelar shu yerda chiqadi */}
      <Outlet />
    </main>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* ============================================================ */}
      {/* 🌍 PUBLIC ROUTES                                             */}
      {/* ============================================================ */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/about" element={<About />} />
      <Route path="/batafsil" element={<About />} />
      
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/forgot-password" element={<Placeholder name="Forgot Password" />} />
      <Route path="/verify-email" element={<Placeholder name="Verify Email" />} />
      
      {/* Public business/offers pages */}
      <Route path="/businesses" element={<Placeholder name="Businesses List" />} />
      <Route path="/businesses/:slug" element={<Placeholder name="Business Details" />} />
      <Route path="/offers" element={<Placeholder name="Offers List" />} />
      <Route path="/offers/:id" element={<Placeholder name="Offer Details" />} />

      {/* ============================================================ */}
      {/*  PRIVATE ROUTES (/app prefix ostida)                       */}
      {/* ============================================================ */}
      
      {/* 1-qadam: Himoya qatlami (Token borligini tekshiradi) */}
      <Route element={<ProtectedRoute />}> 
        
        {/* 2-qadam: Layout qatlami (Sidebar ko'rsatadi) */}
        <Route path="/app" element={<AppLayout />}>
          
          {/* /app ga kirganda avtomatik dashboardga otish */}
          <Route index element={<Navigate to="dashboard" replace />} />

          {/* ---------- 👤 CUSTOMER ---------- */}
          {/* children props olib tashlandi, faqat element va ichki route qoldi */}
          <Route element={<RoleGuard allowedRoles={[UserRole.CUSTOMER]} />}>
            <Route path="dashboard" element={<Placeholder name="Customer Dashboard" />} />
            <Route path="orders" element={<Placeholder name="My Orders" />} />
            <Route path="favorites" element={<Placeholder name="My Favorites" />} />
            <Route path="alerts" element={<Placeholder name="Deal Alerts" />} />
            <Route path="profile" element={<Placeholder name="Profile Settings" />} />
          </Route>

          {/* ---------- 🏢 BUSINESS ---------- */}
          <Route element={<RoleGuard allowedRoles={[UserRole.BUSINESS_OWNER, UserRole.BUSINESS_STAFF]} />}>
            <Route path="business/dashboard" element={<Placeholder name="Business Analytics" />} />
            <Route path="business/branches" element={<Placeholder name="Branches" />} />
            <Route path="business/products" element={<Placeholder name="Products" />} />
            <Route path="business/offers" element={<Placeholder name="Offers Management" />} />
            <Route path="business/orders" element={<Placeholder name="Incoming Orders" />} />
            <Route path="business/team" element={<Placeholder name="Team Members" />} />
            <Route path="business/reviews" element={<Placeholder name="Reviews" />} />
          </Route>

          {/* ---------- 🛡️ ADMIN ---------- */}
          <Route element={<RoleGuard allowedRoles={[UserRole.MODERATOR, UserRole.ADMIN, UserRole.SUPER_ADMIN]} />}>
            <Route path="admin/dashboard" element={<Placeholder name="Admin Overview" />} />
            <Route path="admin/users" element={<Placeholder name="Users Management" />} />
            <Route path="admin/businesses" element={<Placeholder name="Business Moderation" />} />
            <Route path="admin/categories" element={<Placeholder name="Categories" />} />
            <Route path="admin/reports" element={<Placeholder name="Reports" />} />
            <Route path="admin/anomalies" element={<Placeholder name="Price Anomalies" />} />
            <Route path="admin/audit-logs" element={<Placeholder name="Audit Logs" />} />
          </Route>

          {/* Private ichidagi noto'g'ri manzillar uchun */}
          <Route path="*" element={<Navigate to="dashboard" replace />} />

        </Route>
      </Route>

      {/* ============================================================ */}
      {/* ❌ MAXSUS SAHIFALAR                                          */}
      {/* ============================================================ */}
      <Route path="/unauthorized" element={
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
          <h1 className="text-6xl font-bold text-red-500">403</h1>
          <p className="mt-4 text-xl text-gray-700">Kirish huquqi yo'q</p>
          <button onClick={() => window.history.back()} className="mt-6 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900">
            Orqaga qaytish
          </button>
        </div>
      } />

      <Route path="*" element={
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
          <h1 className="text-6xl font-bold text-gray-300">404</h1>
          <p className="mt-4 text-xl text-gray-500">Sahifa topilmadi</p>
          <button onClick={() => window.history.back()} className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Orqaga qaytish
          </button>
        </div>
      } />

    </Routes>
  );
};

export default AppRoutes;