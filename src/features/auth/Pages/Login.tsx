// src/components/auth/LoginForm.tsx

import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuthStore } from '../store';
import type { LoginDto } from '../types';


export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [formData, setFormData] = useState<LoginDto>({
    identifier: '',
    password: '',
    deviceName: navigator.userAgent?.slice(0, 120),
  });

  const from = (location.state as any)?.from?.pathname || '/app/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      await login(formData);
      navigate(from, { replace: true });
    } catch {
      // Xato allaqachon store da saqlangan
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
            Tizimga kirish
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Yoki{' '}
            <Link to="/register" className="font-medium text-red-600 hover:text-red-500">
              yangi akkaunt yarating
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
            <input
              name="identifier"
              type="text"
              required
              value={formData.identifier}
              onChange={handleChange}
              placeholder="Telefon raqami yoki email"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            />
            <input
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Parol"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
            />
          </div>

          <div className="flex items-center justify-between">
            <Link to="/forgot-password" className="text-sm font-medium text-red-600 hover:text-red-500">
              Parolni unutdingizmi?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
          >
            {isLoading ? 'Kirilmoqda...' : 'Kirish'}
          </button>
        </form>

        <button
          type="button"
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Google orqali kirish
        </button>
      </div>
    </div>
  );
};