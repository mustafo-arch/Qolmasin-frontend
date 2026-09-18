import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { membersApi } from './api';
import type { BusinessMember, AddMemberDto } from './types';
import { MembersTable } from './components/MembersTable';
import { AddMemberModal } from './components/AddMemberModal';

export default function MembersPage() {
  const { businessId } = useParams<{ businessId: string }>();
  const [members, setMembers] = useState<BusinessMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<BusinessMember | null>(null);

  // Ma'lumotlarni yuklash
  const loadMembers = async () => {
    if (!businessId) {
      setError("Biznes ID topilmadi");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await membersApi.getAll(businessId);
      setMembers(data.items);
    } catch (err) {
      setError("Xodimlarni yuklashda xatolik yuz berdi");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, [businessId]);

  // Yangi a'zo qo'shish
  const handleAddMember = async (data: AddMemberDto) => {
    if (!businessId) return;
    await membersApi.add(businessId, data);
    loadMembers();
  };

  // Tahrirlash
  const handleEdit = (member: BusinessMember) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  // Modal yopilganda
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Sarlavha va tugma */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Biznes Xodimlari</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition shadow-sm flex items-center gap-2"
        >
          <span>+</span> Yangi xodim
        </button>
      </div>

      {/* Jadval */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <MembersTable members={members} onEdit={handleEdit} />
      </div>

      {/* Modal */}
      <AddMemberModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddMember}
        editingMember={editingMember}
      />
    </div>
  );
}