import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authEndpoints } from '../api';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await authEndpoints.forgotPassword({ email });
      setSent(true);
    } catch {
      // Backend always returns 202 even if email doesn't exist (security)
      // So any real network/server error case:
      setError('So\'rov yuborishda xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Tepa chap burchakdagi orqaga qaytish tugmasi */}
      <Link
        to="/login"
        className="absolute top-6 left-6 z-20 flex items-center justify-center w-11 h-11 bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 rounded-full shadow-md shadow-emerald-900/5 border border-emerald-100 transition-all duration-200"
        title="Loginga qaytish"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </Link>

      {/* Dekorativ fon */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-50 relative z-10">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="inline-block mb-2">
            <span className="text-2xl font-black text-emerald-900 tracking-tight">
              Qol<span className="text-amber-500">masin</span>
            </span>
          </Link>

          {sent ? (
            <>
              {/* Muvaffaqiyat holati */}
              <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mx-auto mt-4 mb-3">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Email yuborildi!
              </h2>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                <span className="font-semibold text-emerald-700">{email}</span> manziliga
                parolni tiklash ko'rsatmalari yuborildi.
                <br />
                <span className="text-gray-500">Spam papkasini ham tekshiring.</span>
              </p>
              <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-2xl text-left">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs text-amber-700">
                    Emaildagi havolani bosing va yangi parolingizni o'rnating.
                    Havola <strong>1 soat</strong> davomida amal qiladi.
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={() => { setSent(false); setEmail(''); }}
                  className="w-full py-3 px-4 border border-emerald-200 rounded-xl text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition-all duration-200"
                >
                  Boshqa email bilan urinish
                </button>
                <Link
                  to="/login"
                  className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-emerald-800 hover:bg-emerald-900 transition-all duration-200 shadow-lg shadow-emerald-900/10"
                >
                  Loginga qaytish
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Parolni tiklash
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Email manzilingizni kiriting — parolni tiklash havolasini yuboramiz.
              </p>
            </>
          )}
        </div>

        {!sent && (
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-2xl bg-red-50 p-4 border border-red-100">
                <div className="text-sm text-red-700 font-medium text-center">{error}</div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 ml-1">
                Email manzil
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="misol@email.com"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-emerald-800 hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 disabled:opacity-50 transition-all duration-200 shadow-lg shadow-emerald-900/10 cursor-pointer"
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
                'Tiklash havolasini yuborish'
              )}
            </button>

            <div className="text-center">
              <Link to="/login" className="text-sm font-semibold text-emerald-700 hover:text-emerald-600 transition-colors">
                ← Loginga qaytish
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

