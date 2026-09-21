import axios from 'axios';
import type {
  AddMemberDto,
  BusinessMember,
  PaginationResponse,
  UpdateMemberDto,
} from './types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

// Auth api bilan bir xil instancedan foydalanamiz (token avtomatik qo'shiladi)
import { authApi } from '../auth/api';

export const membersApi = {
  // 1. Barcha a'zolarni olish (GET)
  async getAll(businessId: string, page = 1, limit = 10): Promise<PaginationResponse<BusinessMember>> {
    const response = await authApi.get(`/businesses/${businessId}/members`, {
      params: { page, limit },
    });
    return response.data;
  },

  // 2. Yangi a'zo qo'shish (POST)
  async add(businessId: string, data: AddMemberDto): Promise<BusinessMember> {
    const response = await authApi.post(`/businesses/${businessId}/members`, data);
    return response.data;
  },

  // 3. A'zoni yangilash (PATCH)
  async update(businessId: string, memberId: string, data: UpdateMemberDto): Promise<BusinessMember> {
    const response = await authApi.patch(`/businesses/${businessId}/members/${memberId}`, data);
    return response.data;
  },

  // 4. A'zoni o'chirish (DELETE) - agar backendda bo'lsa
  async remove(businessId: string, memberId: string): Promise<void> {
    await authApi.delete(`/businesses/${businessId}/members/${memberId}`);
  },
};