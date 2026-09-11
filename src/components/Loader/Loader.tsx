// src/components/ui/FullscreenLoader.tsx

import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FDFBF7] dark:bg-gray-900 transition-colors">
      <div className="relative flex items-center justify-center">
        {/* Tashqi aylanuvchi uzuk */}
        <div className="w-16 h-16 border-4 border-emerald-200 dark:border-emerald-950 border-t-emerald-800 dark:border-t-emerald-500 rounded-full animate-spin" />
        
        {/* Markazdagi pulsing doira */}
        <div className="absolute w-6 h-6 bg-amber-500 rounded-full animate-pulse" />
      </div>

      <div className="mt-4 text-center">
        <span className="text-xl font-black text-emerald-900 dark:text-emerald-400 tracking-tight">
          Qol<span className="text-amber-500">masin</span>
        </span>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium animate-pulse">
          Yuklanmoqda...
        </p>
      </div>
    </div>
  );
};