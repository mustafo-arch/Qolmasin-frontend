import type { BusinessMember } from '../types';
import { MemberBadge } from './MemberBadge';

interface MembersTableProps {
  members: BusinessMember[];
  onEdit: (member: BusinessMember) => void;
}

export const MembersTable: React.FC<MembersTableProps> = ({ members, onEdit }) => {
  if (members.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Hozircha xodimlar yo'q. Yangi a'zo qo'shing.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Email</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Rol</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Holat</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Huquqlar</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Amallar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {members.map((member) => (
            <tr key={member.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 font-medium text-gray-900">{member.email}</td>
              <td className="px-6 py-4">
                <MemberBadge type="role" value={member.role} />
              </td>
              <td className="px-6 py-4">
                <MemberBadge type="status" value={member.status} />
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {member.permissions.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {member.permissions.map((perm) => (
                      <span key={perm} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                        {perm}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400 italic">To'liq huquqli</span>
                )}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onEdit(member)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Tahrirlash
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};