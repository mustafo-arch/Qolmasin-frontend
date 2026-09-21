import { useState, useEffect } from 'react';
import type { BusinessMember, AddMemberDto, BusinessPermission } from '../types';

const PERMISSIONS: BusinessPermission[] = [
  'branch:write',
  'product:write',
  'offer:write',
  'order:read',
  'order:complete',
  'analytics:view',
];

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddMemberDto) => Promise<void>;
  editingMember?: BusinessMember | null;
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingMember,
}) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'MANAGER' | 'STAFF'>('STAFF');
  const [permissions, setPermissions] = useState<BusinessPermission[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Tahrirlash rejimida mavjud ma'lumotlarni to'ldirish
  useEffect(() => {
    if (editingMember) {
      setEmail(editingMember.email);
      setRole(editingMember.role);
      setPermissions(editingMember.permissions);
    } else {
      setEmail('');
      setRole('STAFF');
      setPermissions([]);
    }
  }, [editingMember, isOpen]);

  const togglePermission = (perm: BusinessPermission) => {
    setPermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit({ email, role, permissions: role === 'STAFF' ? permissions : undefined });
      onClose();
    } catch (error) {
      console.error('Xato:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {editingMember ? 'A\'zoni tahrirlash' : 'Yangi a\'zo qo\'shish'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              disabled={!!editingMember}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
              placeholder="xodim@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Rol */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={role}
              onChange={(e) => setRole(e.target.value as 'MANAGER' | 'STAFF')}
            >
              <option value="STAFF">Xodim (Staff)</option>
              <option value="MANAGER">Manager</option>
            </select>
          </div>

          {/* Huquqlar (Faqat STAFF uchun) */}
          {role === 'STAFF' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maxsus huquqlar (ixtiyoriy)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PERMISSIONS.map((perm) => (
                  <label
                    key={perm}
                    className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={permissions.includes(perm)}
                      onChange={() => togglePermission(perm)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>{perm.replace(':', ' - ')}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Tugmalar */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
            >
              {isLoading ? 'Saqlanmoqda...' : 'Saqlash'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};