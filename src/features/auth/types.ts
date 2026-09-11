// src/types/auth.ts

export const UserRole = {
  CUSTOMER: 'CUSTOMER',
  BUSINESS_OWNER: 'BUSINESS_OWNER',
  BUSINESS_STAFF: 'BUSINESS_STAFF',
  MODERATOR: 'MODERATOR',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

export const UserStatus = {
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  DEACTIVATED: 'DEACTIVATED',
} as const

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]

export interface PublicUser {
  id: string;
  phone: string;
  email: string | null;
  emailVerified: boolean;
  fullName: string;
  role: UserRole;
}

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  refreshExpiresAt: string;
  user: PublicUser;
}

export interface LoginDto {
  identifier: string; // phone or email
  password: string;
  deviceName?: string;
}

export interface RegisterDto {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  deviceName?: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResendVerificationDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
}

export interface VerifyEmailDto {
  token: string;
}

export interface AuthState {
  user: PublicUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}