import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { authEndpoints } from '../api';

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(5);

  // Token borligini tekshirish
  const hasValidToken = useMemo(() => {
    return token && /^[A-Za-z0-9_-]{64}$/.test(token);
  }, [token]);

  // Muvaffaqiyatdan keyin countdown
  useEffect(() => {
    if (successMessage && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (successMessage && countdown === 0) {
      navigate('/login', { replace: true });
    }
  }, [successMessage, countdown, navigate]);

  // Parol kuchini hisoblash
  const passwordStrength = useMemo(() => {
    const pwd = formData.password;
    if (!pwd) return { level: 0, label: '', color: '' };

    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { level: 1, label: 'Juda zaif', color: 'bg-red-500' };
    if (score === 2) return { level: 2, label: 'Zaif', color: 'bg-orange-500' };
    if (score === 3) return { level: 3, label: "O'rta", color: 'bg-yellow-500' };
    if (score === 4) return { level: 4, label: 'Kuchli', color: 'bg-emerald-500' };
    return { level: 5, label: 'Juda kuchli', color: 'bg-emerald-600' };
  }, [formData.password]);

  const validateForm = (): string | null => {
    if (!formData.password) return 'Yangi parolni kiriting';
    if (formData.password.length < 8) return 'Parol kamida 8 ta belgidan iborat bo\'lishi kerak';
    if (!/[A-Z]/.test(formData.password)) return 'Parolda kamida bitta katta harf bo\'lishi kerak';
    if (!/[a-z]/.test(formData.password)) return 'Parolda kamida bitta kichik harf bo\'lishi kerak';
    if (!/\d/.test(formData.password)) return 'Parolda kamida bitta raqam bo\'lishi kerak';
    if (!formData.confirmPassword) return 'Parolni tasdiqlang';
    if (formData.password !== formData.confirmPassword) return 'Parollar mos kelmaydi';
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!hasValidToken) {
      setError('Token noto\'g\'ri yoki mavjud emas');
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      await authEndpoints.resetPassword({
        token: token!,
        password: formData.password,
      });
      setSuccessMessage('Parolingiz muvaffaqiyatli yangilandi!');
    } catch (err: any) {
      const status = err.response?.status;
      const code = err.response?.data?.code;

      if (status === 400 || code === 'AUTH_INVALID_PASSWORD_RESET_TOKEN') {
        setError('Havola noto\'g\'ri yoki muddati tugagan. Iltimos, qaytadan parolni tiklash so\'rovini yuboring.');
      } else if (status === 429) {
        setError('Juda ko\'p urinish. Iltimos, birozdan so\'ng qayta urinib ko\'ring.');
      } else {
        setError(err.response?.data?.message || 'Xatolik yuz berdi. Qayta urinib ko\'ring.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Token bo'lmasa — xato holati
  if (!hasValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-red-50 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-red-900/5 border border-red-50 relative z-10 text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Havola yaroqsiz</h2>
          <p className="text-sm text-gray-600 mb-8 leading-relaxed">
            Siz foydalangan havola noto'g'ri, eskirgan yoki allaqachon ishlatilgan.
            Iltimos, qaytadan parolni tiklash so'rovini yuboring.
          </p>
          <Link
            to="/forgot-password"
            className="w-full inline-flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-emerald-800 hover:bg-emerald-900 transition-all duration-200 shadow-lg shadow-emerald-900/10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Qaytadan so'rov yuborish
          </Link>
          <div className="mt-4">
            <Link to="/login" className="text-sm font-semibold text-emerald-700 hover:text-emerald-600 transition-colors">
              ← Tizimga kirish
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Orqaga qaytish */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 flex items-center justify-center w-11 h-11 bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 rounded-full shadow-md shadow-emerald-900/5 border border-emerald-100 transition-all duration-200"
        title="Bosh sahifaga qaytish"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </Link>

      {/* Dekorativ fon */}
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
          {!successMessage ? (
            <>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-2">
                Yangi parol o'rnatish
              </h2>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                Hisobingiz uchun yangi parol kiriting. Kuchli parol tanlang.
              </p>
            </>
          ) : (
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-2">
              Tayyor! 🎉
            </h2>
          )}
        </div>

        {/* Muvaffaqiyat holati */}
        {successMessage ? (
          <div className="space-y-6">
            <div className="rounded-2xl bg-emerald-50 p-6 border border-emerald-100 text-center">
              <div className="mx-auto w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-emerald-800 mb-2">{successMessage}</h3>
              <p className="text-sm text-emerald-700 leading-relaxed">
                Barcha eski sessiyalaringiz bekor qilindi. Yangi parolingiz bilan tizimga kiring.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/login', { replace: true })}
              className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-emerald-800 hover:bg-emerald-900 transition-all duration-200 shadow-lg shadow-emerald-900/10 cursor-pointer"
            >
              Tizimga kirish ({countdown}s)
            </button>
          </div>
        ) : (
          /* Forma */
          <>
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-2xl bg-red-50 p-4 border border-red-100 animate-shake">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm text-red-700 font-medium">{error}</div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {/* Yangi parol */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 ml-1">
                    Yangi parol
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={8}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Kamida 8 ta belgi"
                      autoComplete="new-password"
                      className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent focus:bg-white transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Parol kuchi indikator */}
                  {formData.password && (
                    <div className="mt-2 ml-1">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                              level <= passwordStrength.level
                                ? passwordStrength.color
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">
                        Parol kuchi:{' '}
                        <span
                          className={`font-semibold ${
                            passwordStrength.level >= 4
                              ? 'text-emerald-600'
                              : passwordStrength.level >= 3
                              ? 'text-yellow-600'
                              : 'text-red-500'
                          }`}
                        >
                          {passwordStrength.label}
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Parolni tasdiqlash */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 ml-1">
                    Parolni tasdiqlang
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Parolni qayta kiriting"
                      autoComplete="new-password"
                      className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent focus:bg-white transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Moslik indikatori */}
                  {formData.confirmPassword && (
                    <p
                      className={`text-xs mt-1.5 ml-1 font-medium ${
                        formData.password === formData.confirmPassword
                          ? 'text-emerald-600'
                          : 'text-red-500'
                      }`}
                    >
                      {formData.password === formData.confirmPassword
                        ? '✓ Parollar mos keladi'
                        : '✗ Parollar mos kelmaydi'}
                    </p>
                  )}
                </div>
              </div>

              {/* Talablar ro'yxati */}
              <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Parol talablari:
                </p>
                <ul className="space-y-1.5">
                  <PasswordRequirement met={formData.password.length >= 8} text="Kamida 8 ta belgi" />
                  <PasswordRequirement met={/[A-Z]/.test(formData.password)} text="Kamida bitta katta harf (A-Z)" />
                  <PasswordRequirement met={/[a-z]/.test(formData.password)} text="Kamida bitta kichik harf (a-z)" />
                  <PasswordRequirement met={/\d/.test(formData.password)} text="Kamida bitta raqam (0-9)" />
                </ul>
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
                    Saqlanmoqda...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Parolni yangilash
                  </span>
                )}
              </button>
            </form>

            <div className="text-center">
              <Link
                to="/login"
                className="text-sm font-semibold text-emerald-700 hover:text-emerald-600 transition-colors"
              >
                ← Parolimni esladim, tizimga kirish
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Kichik komponent: parol talabi
const PasswordRequirement: React.FC<{ met: boolean; text: string }> = ({ met, text }) => (
  <li className="flex items-center gap-2 text-xs">
    {met ? (
      <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-gray-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    )}
    <span className={met ? 'text-emerald-700 font-medium' : 'text-gray-500'}>{text}</span>
  </li>
);

export default ResetPasswordPage;