import React, { useState, useMemo } from 'react';
import { 
  KeyRound, 
  Lock, 
  Eye, 
  EyeOff, 
  Check, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  ShieldCheck 
} from 'lucide-react';
import { authEndpoints } from '@/features/auth/api';
import { useAuthStore } from '@/features/auth/store';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const logout = useAuthStore((state) => state.logout);

  // Validation rules (matches NestJS backend class-validator: MinLength 10, MaxLength 128, letter, number)
  const rules = useMemo(() => ({
    hasMinLength: newPassword.length >= 10 && newPassword.length <= 128,
    hasLetter: /[A-Za-z]/.test(newPassword),
    hasNumber: /\d/.test(newPassword),
    passwordsMatch: newPassword.length > 0 && newPassword === confirmPassword,
    isDifferentFromCurrent: Boolean(currentPassword && newPassword && currentPassword !== newPassword),
  }), [newPassword, confirmPassword, currentPassword]);

  const isValid = rules.hasMinLength && rules.hasLetter && rules.hasNumber && rules.passwordsMatch && currentPassword.length > 0;

  const handleClose = () => {
    if (isLoading) return;
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrorMessage(null);
    setIsSuccess(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isLoading) return;

    if (currentPassword === newPassword) {
      setErrorMessage('Yangi parol joriy paroldan farq qilishi kerak');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      await authEndpoints.changePassword({
        currentPassword,
        newPassword,
      });

      setIsSuccess(true);

      // 1.5 soniyadan so'ng 0 dan loginga yo'naltirish
      setTimeout(async () => {
        await logout(false);
        window.location.href = '/login';
      }, 1500);

    } catch (err: any) {
      setIsLoading(false);
      const backendMessage = 
        err.response?.data?.message || 
        err.response?.data?.error || 
        'Parolni o‘zgartirishda xatolik yuz berdi. Joriy parolingizni tekshirib qayta urinib ko‘ring.';
      setErrorMessage(Array.isArray(backendMessage) ? backendMessage.join(', ') : backendMessage);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-md overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-2xl transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="change-password-title"
      >
        {/* Dekorativ orqa fon gradiyenti */}
        <div className="h-28 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 relative p-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 text-white shadow-inner">
              <KeyRound className="size-6" />
            </div>
            <div>
              <h2 id="change-password-title" className="text-xl font-bold text-white">
                Parolni o‘zgartirish
              </h2>
              <p className="text-xs text-emerald-100/90 mt-0.5">
                Xavfsizlik sozlamalari
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="rounded-full p-1.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
            aria-label="Yopish"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Muvaffaqiyat holati */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-10 animate-bounce" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Parol muvaffaqiyatli yangilandi!
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Xavfsizlik maqsadida barcha faol sessiyalar yakunlandi. Tizimga yangi parol bilan qayta kiring...
            </p>
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 pt-2">
              <Loader2 className="size-4 animate-spin" />
              <span>Login sahifasiga o‘tilmoqda...</span>
            </div>
          </div>
        ) : (
          /* Asosiy forma */
          <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
            {/* Xatolik xabari */}
            {errorMessage && (
              <div className="flex items-start gap-3 p-3.5 text-sm text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-2xl">
                <AlertCircle className="size-5 shrink-0 mt-0.5" />
                <div className="flex-1 text-xs sm:text-sm">{errorMessage}</div>
              </div>
            )}

            {/* 1. Joriy parol */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                Joriy parol
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="size-4" />
                </div>
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Amaldagi parolingiz"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-900 dark:text-white focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-600/10 transition-all placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showCurrentPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {/* 2. Yangi parol */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                Yangi parol
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <KeyRound className="size-4" />
                </div>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Kamida 10 ta belgi, harf va raqam"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-900 dark:text-white focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-600/10 transition-all placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showNewPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>

              {/* Talablar ro'yxati (Real-time checklist) */}
              <div className="pt-2 grid grid-cols-1 gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <span className={`flex size-4 items-center justify-center rounded-full transition-colors ${
                    rules.hasMinLength ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-gray-100 text-gray-400 dark:bg-gray-800'
                  }`}>
                    {rules.hasMinLength ? <Check className="size-2.5 stroke-[3]" /> : <span className="size-1 rounded-full bg-gray-400" />}
                  </span>
                  <span className={rules.hasMinLength ? 'text-emerald-700 dark:text-emerald-400 font-medium' : ''}>
                    Kamida 10 ta belgi (128 tagacha)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`flex size-4 items-center justify-center rounded-full transition-colors ${
                    rules.hasLetter ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-gray-100 text-gray-400 dark:bg-gray-800'
                  }`}>
                    {rules.hasLetter ? <Check className="size-2.5 stroke-[3]" /> : <span className="size-1 rounded-full bg-gray-400" />}
                  </span>
                  <span className={rules.hasLetter ? 'text-emerald-700 dark:text-emerald-400 font-medium' : ''}>
                    Kamida bitta harf (A-Z yoki a-z)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`flex size-4 items-center justify-center rounded-full transition-colors ${
                    rules.hasNumber ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-gray-100 text-gray-400 dark:bg-gray-800'
                  }`}>
                    {rules.hasNumber ? <Check className="size-2.5 stroke-[3]" /> : <span className="size-1 rounded-full bg-gray-400" />}
                  </span>
                  <span className={rules.hasNumber ? 'text-emerald-700 dark:text-emerald-400 font-medium' : ''}>
                    Kamida bitta raqam (0-9)
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Yangi parolni tasdiqlash */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                Yangi parolni tasdiqlash
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <ShieldCheck className="size-4" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Yangi parolni takrorlang"
                  className={`w-full pl-10 pr-10 py-2.5 text-sm bg-gray-50 dark:bg-gray-800/80 border rounded-xl outline-none text-gray-900 dark:text-white transition-all placeholder:text-gray-400 ${
                    confirmPassword.length > 0
                      ? rules.passwordsMatch
                        ? 'border-emerald-500 focus:ring-4 focus:ring-emerald-600/10'
                        : 'border-red-500 focus:ring-4 focus:ring-red-600/10'
                      : 'border-gray-200 dark:border-gray-700 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {confirmPassword.length > 0 && !rules.passwordsMatch && (
                <p className="text-xs text-red-500 font-medium pt-0.5">
                  Parollar bir xil emas
                </p>
              )}
            </div>

            {/* Tugmalar */}
            <div className="pt-3 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="px-4 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors disabled:opacity-50"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                disabled={!isValid || isLoading}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl shadow-md shadow-emerald-700/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Saqlanmoqda...</span>
                  </>
                ) : (
                  <span>Parolni saqlash</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

