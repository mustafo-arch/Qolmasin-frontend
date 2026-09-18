import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { BusinessStatus } from '../types';

interface FilterTabsProps {
  value: string;
  onValueChange: (value: string) => void;
}

const filters: { value: BusinessStatus | 'ALL'; label: string }[] = [
  { value: 'ALL', label: 'Barchasi' },
  { value: 'PENDING_REVIEW', label: 'Tekshiruvda' },
  { value: 'VERIFIED', label: 'Tasdiqlangan' },
  { value: 'REJECTED', label: 'Rad etilgan' },
  { value: 'SUSPENDED', label: 'Bloklangan' },
];

export const FilterTabs: React.FC<FilterTabsProps> = ({ value, onValueChange }) => {
  return (
    <Tabs value={value} onValueChange={onValueChange}>
      <TabsList className="grid w-full grid-cols-5">
        {filters.map((filter) => (
          <TabsTrigger key={filter.value} value={filter.value}>
            {filter.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};