// Backenddagi BusinessMemberRole enumiga mos
export type MemberRole = 'MANAGER' | 'STAFF';

// Backenddagi BusinessMemberStatus enumiga mos
export type MemberStatus = 'ACTIVE' | 'SUSPENDED';

// Backenddagi BusinessPermission enumiga mos
export type BusinessPermission =
  | 'branch:write'
  | 'product:write'
  | 'offer:write'
  | 'order:read'
  | 'order:complete'
  | 'analytics:view';

// Backenddan keladigan a'zo ma'lumoti
export interface BusinessMember {
  id: string;
  email: string;
  role: MemberRole;
  status: MemberStatus;
  permissions: BusinessPermission[];
  createdAt: string;
}

// Backendga yuboriladigan yangi a'zo ma'lumoti (AddBusinessMemberDto)
export interface AddMemberDto {
  email: string;
  role: MemberRole;
  permissions?: BusinessPermission[];
}

// Backendga yuboriladigan yangilash ma'lumoti (UpdateBusinessMemberDto)
export interface UpdateMemberDto {
  role?: MemberRole;
  status?: MemberStatus;
  permissions?: BusinessPermission[];
}

// Pagination uchun
export interface PaginationResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}