import type { MemberRole, MemberStatus } from '../types';

interface BadgeProps {
  type: 'role' | 'status';
  value: MemberRole | MemberStatus;
}

export const MemberBadge: React.FC<BadgeProps> = ({ type, value }) => {
  const styles = {
    role: {
      MANAGER: 'bg-purple-100 text-purple-700',
      STAFF: 'bg-blue-100 text-blue-700',
    },
    status: {
      ACTIVE: 'bg-green-100 text-green-700',
      SUSPENDED: 'bg-red-100 text-red-700',
    },
  };

  const labels = {
    MANAGER: 'Manager',
    STAFF: 'Xodim',
    ACTIVE: 'Faol',
    SUSPENDED: 'Bloklangan',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[type][value]}`}>
      {labels[value]}
    </span>
  );
};