import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { businessesApi } from './api';
import type { Business, ReviewBusinessDto } from './types';
import { BusinessTable } from './components/BusinessTable';
import { ReviewDialog } from './components/ReviewDialog';
import { FilterTabs } from './components/FilterTabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ModerationPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('PENDING_REVIEW');
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [selectedAction, setSelectedAction] = useState<'VERIFIED' | 'REJECTED' | 'SUSPENDED' | null>(null);

  const loadBusinesses = async () => {
    setLoading(true);
    try {
      const status = filter === 'ALL' ? undefined : filter;
      const response = await businessesApi.listForModeration(status);
      setBusinesses(response.data.items);
    } catch (error) {
      toast.error('Bizneslarni yuklashda xatolik yuz berdi');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBusinesses();
  }, [filter]);

  const handleReview = (business: Business, action: 'VERIFIED' | 'REJECTED' | 'SUSPENDED') => {
    setSelectedBusiness(business);
    setSelectedAction(action);
    setDialogOpen(true);
  };

  const handleSubmitReview = async (data: ReviewBusinessDto) => {
    if (!selectedBusiness) return;

    try {
      await businessesApi.review(selectedBusiness.id, data);
      
      const messages = {
        VERIFIED: `"${selectedBusiness.name}" muvaffaqiyatli tasdiqlandi`,
        REJECTED: `"${selectedBusiness.name}" rad etildi`,
        SUSPENDED: `"${selectedBusiness.name}" bloklandi`,
      };
      toast.success(messages[data.status]);
      
      await loadBusinesses();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Xatolik yuz berdi');
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Biznes Moderatsiyasi</h1>
          <p className="text-sm text-gray-500 mt-1">
            Bizneslarni ko'rib chiqish, tasdiqlash yoki rad etish
          </p>
        </div>
        <Button variant="outline" onClick={loadBusinesses} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Yangilash
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtr</CardTitle>
        </CardHeader>
        <CardContent>
          <FilterTabs value={filter} onValueChange={setFilter} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Bizneslar ro'yxati 
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({businesses.length} ta)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BusinessTable businesses={businesses} onReview={handleReview} />
        </CardContent>
      </Card>

      <ReviewDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        business={selectedBusiness}
        action={selectedAction}
        onSubmit={handleSubmitReview}
      />
    </div>
  );
}