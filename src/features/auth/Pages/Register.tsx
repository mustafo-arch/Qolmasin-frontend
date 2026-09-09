// src/components/auth/RegisterForm.tsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store';
import type { RegisterDto } from '../types';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuthStore();

  const [formData, setFormData] = useState<RegisterDto>({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    deviceName: navigator.userAgent?.slice(0, 120),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      await register(formData);
      navigate('/', { replace: true });
    } catch {
      // Xato store da
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Yangi akkaunt yaratish
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Yoki{' '}
            <Link to="/login" className="font-medium text-red-600 hover:text-red-500">
              tizimga kiring
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <input name="fullName" type="text" required minLength={2} maxLength={120} value={formData.fullName} onChange={handleChange} placeholder="To'liq ism" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm" />
            <input name="phone" type="tel" required pattern="^\+[1-9]\d{7,14}$" value={formData.phone} onChange={handleChange} placeholder="+998901234567" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm" />
            <input name="email" type="email" required maxLength={254} value={formData.email} onChange={handleChange} placeholder="Email manzil" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm" />
            <input name="password" type="password" required minLength={10} maxLength={128} value={formData.password} onChange={handleChange} placeholder="Parol (kamida 10 belgi)" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm" />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
          >
            {isLoading ? 'Yaratilmoqda...' : "Ro'yxatdan o'tish"}
          </button>
        </form>
      </div>
    </div>
  );
};