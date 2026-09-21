import { Badge } from '@/components/ui/badge';
import type { BusinessStatus } from '../types';

const statusConfig: Record<BusinessStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  DRAFT: { label: 'Qoralama', variant: 'outline' },
  PENDING_REVIEW: { label: 'Tekshiruvda', variant: 'secondary' },
  VERIFIED: { label: 'Tasdiqlangan', variant: 'default' },
  REJECTED: { label: 'Rad etilgan', variant: 'destructive' },
  SUSPENDED: { label: 'Bloklangan', variant: 'destructive' },
};

interface StatusBadgeProps {
  status: BusinessStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status];
  
  return (
    <Badge variant={config.variant} className="capitalize">
      {config.label}
    </Badge>
  );
};