import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './StatusBadge';
import type { Business } from '../types';
import { CheckCircle, XCircle, Ban } from 'lucide-react';

interface BusinessTableProps {
  businesses: Business[];
  onReview: (business: Business, action: 'VERIFIED' | 'REJECTED' | 'SUSPENDED') => void;
}

export const BusinessTable: React.FC<BusinessTableProps> = ({ businesses, onReview }) => {
  if (businesses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-lg font-semibold text-gray-900">Bizneslar topilmadi</h3>
        <p className="text-sm text-gray-500 mt-1">
          Tanlangan filtr bo'yicha bizneslar yo'q
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Biznes nomi</TableHead>
            <TableHead>Turi</TableHead>
            <TableHead>Egasi</TableHead>
            <TableHead>Filiallar</TableHead>
            <TableHead>Mahsulotlar</TableHead>
            <TableHead>Holat</TableHead>
            <TableHead className="text-right">Amallar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {businesses.map((business) => (
            <TableRow key={business.id}>
              <TableCell className="font-medium">
                <div>
                  <div className="font-semibold">{business.name}</div>
                  <div className="text-xs text-gray-500">{business.slug}</div>
                </div>
              </TableCell>
              <TableCell className="capitalize">
                {business.type.toLowerCase().replace('_', ' ')}
              </TableCell>
              <TableCell>
                <div>
                  <div className="text-sm font-medium">{business.owner.fullName}</div>
                  <div className="text-xs text-gray-500">{business.owner.email}</div>
                </div>
              </TableCell>
              <TableCell>{business.counts.branches}</TableCell>
              <TableCell>{business.counts.products}</TableCell>
              <TableCell>
                <StatusBadge status={business.status} />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {business.status === 'PENDING_REVIEW' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onReview(business, 'VERIFIED')}
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Tasdiqlash
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onReview(business, 'REJECTED')}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Rad etish
                      </Button>
                    </>
                  )}
                  {business.status === 'VERIFIED' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onReview(business, 'SUSPENDED')}
                      className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                    >
                      <Ban className="w-4 h-4 mr-1" />
                      Bloklash
                    </Button>
                  )}
                  {business.status === 'SUSPENDED' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onReview(business, 'VERIFIED')}
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Qayta tasdiqlash
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};