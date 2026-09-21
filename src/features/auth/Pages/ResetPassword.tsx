import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { authEndpoints } from '../api';

type CheckItem = { label: string; ok: boolean };

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [token, setToken] = useState(searchParams.get('token') ?? '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Auto-redirect to login after success
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate('/login', { replace: true }), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const checks: CheckItem[] = [
    { label: 'Kamida 10 ta belgi', ok: password.length >= 10 },
    { label: 'Harf mavjud (A-Z, a-z)', ok: /[A-Za-z]/.test(password) },
    { label: 'Raqam mavjud (0-9)', ok: /\d/.test(password) },
    { label: 'Parollar mos keladi', ok: password.length > 0 && password === confirmPassword },
  ];

  const isValid = checks.every((c) => c.ok) && token.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setError(null);
    setIsLoading(true);

    try {
      await authEndpoints.resetPassword({ token: token.trim(), password });
      setSuccess(true);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      if (msg?.toLowerCase().includes('token')) {
        setError('Token noto\'g\'ri yoki muddati o\'tgan. Iltimos, parolni tiklash so\'rovini qaytadan yuboring.');
      } else {
        setError('Xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] py-12 px-4 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-50 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 relative z-10 text-center">
          <Link to="/" className="inline-block mb-4">
            <span className="text-2xl font-black text-emerald-900 tracking-tight">
              Qol<span className="text-amber-500">masin</span>
            </span>
          </Link>
          <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">Parol muvaffaqiyatli o'zgartirildi!</h2>
          <p className="mt-3 text-sm text-gray-500">
            3 soniyadan so'ng login sahifasiga o'tasiz...
          </p>
          <Link
            to="/login"
            className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-emerald-800 hover:bg-emerald-900 transition-all duration-200 shadow-lg shadow-emerald-900/10"
          >
            Hoziroq kirish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Orqaga qaytish */}
      <Link
        to="/forgot-password"
        className="absolute top-6 left-6 z-20 flex items-center justify-center w-11 h-11 bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 rounded-full shadow-md shadow-emerald-900/5 border border-emerald-100 transition-all duration-200"
        title="Parolni tiklash sahifasiga qaytish"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </Link>

      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 relative z-10">
        <div className="text-center">
          <Link to="/" className="inline-block mb-2">
            <span className="text-2xl font-black text-emerald-900 tracking-tight">
              Qol<span className="text-amber-500">masin</span>
            </span>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Yangi parol o'rnatish
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Emaildan kelgan tokenni va yangi parolni kiriting.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-2xl bg-red-50 p-4 border border-red-100">
              <div className="text-sm text-red-700 font-medium text-center">{error}</div>
            </div>
          )}

          {/* Token maydoni — faqat URL da token bo'lmasa ko'rsatiladi */}
          {!searchParams.get('token') && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 ml-1">
                Tiklash kodi (emaildan)
              </label>
              <input
                type="text"
                required
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Emaildan nusxa ko'chirib yuboring..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all duration-200 font-mono text-xs"
              />
              <p className="mt-1 text-xs text-gray-400 ml-1">
                Emaildagi "Parolni tiklash" havolasidagi token
              </p>
            </div>
          )}

          {/* Yangi parol */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 ml-1">
              Yangi parol
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Parolni tasdiqlash */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 ml-1">
              Parolni tasdiqlash
            </label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
              >
                {showConfirm ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Validatsiya ro'yxati */}
          {password.length > 0 && (
            <ul className="space-y-1.5 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
              {checks.map((c) => (
                <li key={c.label} className="flex items-center gap-2 text-xs">
                  <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${c.ok ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                    {c.ok ? (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    )}
                  </span>
                  <span className={c.ok ? 'text-emerald-700 font-medium' : 'text-gray-500'}>{c.label}</span>
                </li>
              ))}
            </ul>
          )}

          <button
            type="submit"
            disabled={isLoading || !isValid}
            className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-emerald-800 hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 disabled:opacity-50 transition-all duration-200 shadow-lg shadow-emerald-900/10 cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saqlanmoqda...
              </span>
            ) : (
              'Yangi parolni saqlash'
            )}
          </button>

          <div className="text-center">
            <Link to="/login" className="text-sm font-semibold text-emerald-700 hover:text-emerald-600 transition-colors">
              ← Loginga qaytish
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

