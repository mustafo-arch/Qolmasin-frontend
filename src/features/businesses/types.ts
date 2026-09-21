export type BusinessStatus = 
  | 'DRAFT' 
  | 'PENDING_REVIEW' 
  | 'VERIFIED' 
  | 'REJECTED' 
  | 'SUSPENDED';

export type BusinessType = 
  | 'RESTAURANT' 
  | 'CAFE' 
  | 'BAKERY' 
  | 'CONFECTIONERY' 
  | 'SUPERMARKET' 
  | 'MINIMARKET' 
  | 'MARKET_VENDOR' 
  | 'MARKET_SELLER' 
  | 'FARMER' 
  | 'CATERING' 
  | 'HOTEL' 
  | 'MANUFACTURER' 
  | 'OTHER' 
  | 'OTHER_FOOD';

export interface BusinessOwner {
  id: string;
  fullName: string;
  email: string | null;
}

export interface Business {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  type: BusinessType;
  status: BusinessStatus;
  statusReason: string | null;
  verifiedAt: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
  owner: BusinessOwner;
  counts: {
    branches: number;
    products: number;
  };
}

export interface PaginationResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ReviewBusinessDto {
  status: 'VERIFIED' | 'REJECTED' | 'SUSPENDED';
  reason?: string;
}