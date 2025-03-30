import React, { useState } from "react";
import AddStaffModal from "./AddStaffModal";

function StaffTable({ staffList, onUpdateStaff, roleOptions, adminRole }) {
  const [editingStaff, setEditingStaff] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditClick = (staff) => {
    setEditingStaff(staff);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingStaff(null);
  };

  const handleSaveEdit = (updatedStaffData) => {
    onUpdateStaff({ 
      ...editingStaff, 
      ...updatedStaffData,
      // Ensure the role stays as the admin's role
      role: adminRole
    });
    setShowEditModal(false);
    setEditingStaff(null);
  };

  const getRoleDisplayName = (roleCode) => {
    switch(roleCode.toLowerCase()) {
      case 'sar':
        return 'Senior Assistant Registrar';
      case 'dr':
        return 'Deputy Registrar';
      case 'far':
        return 'Faculty Assistant Registrar';
      default:
        return roleCode.toUpperCase();
    }
  };

  return (
    <>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 text-left">STAFF NAME</th>
            <th className="py-3 px-4 text-left">EMAIL</th>
            <th className="py-3 px-4 text-left">LAST UPDATES</th>
            <th className="py-3 px-4 text-center">ACTION</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {staffList.map((staff) => (
            <tr key={staff.id} className="hover:bg-gray-50">
              <td className="py-3 px-4">
                {staff.name}
                <br />
                <span className="text-sm text-gray-500">ID: {staff.id}</span>
              </td>
              <td className="py-3 px-4">{staff.email}</td>
              <td className="py-3 px-4">{staff.lastUpdated}</td>
              <td className="py-3 px-4 flex justify-center space-x-2">
                <button 
                  className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors"
                  onClick={() => handleEditClick(staff)}
                  title="Edit Staff"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {showEditModal && editingStaff && (
        <AddStaffModal
          onClose={handleCloseModal}
          onSave={handleSaveEdit}
          roleType={adminRole}
          existingStaff={{
            id: editingStaff.id,
            name: editingStaff.name,
            email: editingStaff.email
          }}
        />
      )}
    </>
  );
}

export default StaffTable;