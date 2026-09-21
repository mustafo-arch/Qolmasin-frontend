import { api } from '@/lib/api'; // Yuqoridagi umumiy api ni chaqiryapmiz
import type { Business, PaginationResponse, ReviewBusinessDto } from './types';

// Mana shu yerda businessesApi va uning funksiyalari bor!
export const businessesApi = {
  
  // 1. Moderatsiya uchun ro'yxatni olish funksiyasi
  listForModeration: (status: string = 'PENDING_REVIEW', page = 1, limit = 10) =>
    api.get<PaginationResponse<Business>>(
      `/admin/businesses?status=${status}&page=${page}&limit=${limit}`
    ),

  // 2. Biznesni ko'rib chiqish (tasdiqlash/rad etish) funksiyasi
  review: (businessId: string, data: ReviewBusinessDto) =>
    api.post<Business>(`/admin/businesses/${businessId}/review`, data),
};