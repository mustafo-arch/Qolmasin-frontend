import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { Business, ReviewBusinessDto } from '../types';

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  business: Business | null;
  action: 'VERIFIED' | 'REJECTED' | 'SUSPENDED' | null;
  onSubmit: (data: ReviewBusinessDto) => Promise<void>;
}

const actionConfig = {
  VERIFIED: {
    title: 'Biznesni tasdiqlash',
    description: 'Bu biznesni tasdiqlamoqchimisiz? Tasdiqlangandan so\'ng u mijozlarga ko\'rinadi.',
    requireReason: false,
    buttonLabel: 'Tasdiqlash',
    buttonVariant: 'default' as const,
  },
  REJECTED: {
    title: 'Biznesni rad etish',
    description: 'Rad etish sababini yozing. Bu sabab biznes egasiga ko\'rsatiladi.',
    requireReason: true,
    buttonLabel: 'Rad etish',
    buttonVariant: 'destructive' as const,
  },
  SUSPENDED: {
    title: 'Biznesni bloklash',
    description: 'Bloklash sababini yozing. Bu sabab biznes egasiga ko\'rsatiladi.',
    requireReason: true,
    buttonLabel: 'Bloklash',
    buttonVariant: 'destructive' as const,
  },
};

export const ReviewDialog: React.FC<ReviewDialogProps> = ({
  open,
  onOpenChange,
  business,
  action,
  onSubmit,
}) => {
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!action || !business) return null;

  const config = actionConfig[action];

  const handleSubmit = async () => {
    if (config.requireReason && !reason.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit({
        status: action,
        reason: reason.trim() || undefined,
      });
      onOpenChange(false);
      setReason('');
    } catch (error) {
      console.error('Review error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{config.title}</DialogTitle>
          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="text-sm font-semibold text-gray-900">{business.name}</div>
            <div className="text-xs text-gray-500 mt-1">{business.owner.fullName}</div>
          </div>

          {config.requireReason && (
            <div className="grid gap-2">
              <Label htmlFor="reason">
                Sabab <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="reason"
                placeholder="Sababni yozing..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                className="resize-none"
              />
              {!reason.trim() && (
                <p className="text-xs text-red-500">Sababni yozish majburiy</p>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Bekor qilish
          </Button>
          <Button
            variant={config.buttonVariant}
            onClick={handleSubmit}
            disabled={isLoading || (config.requireReason && !reason.trim())}
          >
            {isLoading ? 'Yuklanmoqda...' : config.buttonLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};