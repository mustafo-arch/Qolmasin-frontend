import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authEndpoints } from '../api';

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      setError('Email manzilini kiriting');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('To\'g\'ri email manzil kiriting');
      return;
    }

    setIsLoading(true);

    try {
      await authEndpoints.forgotPassword({ email: email.trim().toLowerCase() });
      setSuccessMessage(
        'Agar ushbu email bilan hisob mavjud bo\'lsa, parolni tiklash havolasi yuborildi.'
      );
    } catch (err: any) {
      // Backend har doim 202 qaytaradi (user enumeration protection), 
      // lekin network xatolar uchun fallback
      if (err.response?.status === 429) {
        setError('Juda ko\'p so\'rov yubordiz. Iltimos, birozdan so\'ng qayta urinib ko\'ring.');
      } else {
        setError('Xatolik yuz berdi. Internet ulanishingizni tekshiring va qayta urinib ko\'ring.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Tepa chap burchakdagi orqaga qaytish tugmasi */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 flex items-center justify-center w-11 h-11 bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 rounded-full shadow-md shadow-emerald-900/5 border border-emerald-100 transition-all duration-200"
        title="Bosh sahifaga qaytish"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </Link>

      {/* Dekorativ fon elementlari */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 relative z-10">
        {/* Sarlavha */}
        <div className="text-center">
          <Link to="/" className="inline-block mb-2">
            <span className="text-2xl font-black text-emerald-900 tracking-tight">
              Qol<span className="text-amber-500">masin</span>
            </span>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-2">
            Parolni tiklash
          </h2>
          {!successMessage && (
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              Ro\'yxatdan o\'tgan email manzilingizni kiriting. Biz sizga parolni tiklash havolasini yuboramiz.
            </p>
          )}
        </div>

        {/* Muvaffaqiyat xabari */}
        {successMessage ? (
          <div className="space-y-6">
            <div className="rounded-2xl bg-emerald-50 p-6 border border-emerald-100 text-center">
              <div className="mx-auto w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-emerald-800 mb-2">Xabar yuborildi!</h3>
              <p className="text-sm text-emerald-700 leading-relaxed">{successMessage}</p>
              <p className="text-xs text-emerald-600 mt-3">
                Email qutingizni (spam papkasini ham) tekshiring. Havola 30 daqiqa ichida amal qiladi.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setSuccessMessage(null);
                setEmail('');
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-emerald-200 rounded-xl text-sm font-semibold text-emerald-700 bg-white hover:bg-emerald-50 transition-all duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Boshqa email bilan urinish
            </button>

            <div className="text-center">
              <Link
                to="/login"
                className="text-sm font-semibold text-emerald-700 hover:text-emerald-600 transition-colors"
              >
                ← Tizimga kirish sahifasiga qaytish
              </Link>
            </div>
          </div>
        ) : (
          /* Forma */
          <>
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-2xl bg-red-50 p-4 border border-red-100">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm text-red-700 font-medium">{error}</div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 ml-1">
                  Email manzil
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hisob@email.com"
                    autoComplete="email"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent focus:bg-white transition-all duration-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-emerald-800 hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-emerald-900/10 cursor-pointer"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Yuborilmoqda...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Tiklash havolasini yuborish
                  </span>
                )}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-gray-400 font-medium">Yoki</span>
              </div>
            </div>

            <div className="text-center space-y-3">
              <p className="text-sm text-gray-600">
                Parolingizni eslaysizmi?{' '}
                <Link to="/login" className="font-semibold text-emerald-700 hover:text-emerald-600 transition-colors">
                  Tizimga kiring
                </Link>
              </p>
              <p className="text-sm text-gray-600">
                Hisobingiz yo\'qmi?{' '}
                <Link to="/register" className="font-semibold text-emerald-700 hover:text-emerald-600 transition-colors">
                  Ro\'yxatdan o\'ting
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;