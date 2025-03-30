import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import PrimaryButton from "../../components/PrimaryButton";
import AddStaffModal from "./AddStaffModal";
import StaffTable from "./StaffTable";

function StaffManagement() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [staffToEdit, setStaffToEdit] = useState(null);
  
  // Get admin role from session storage
  const [adminRole, setAdminRole] = useState(() => {
    const adminData = sessionStorage.getItem("adminData");
    if (adminData) {
      try {
        const parsedData = JSON.parse(adminData);
        return parsedData.admin.role;
      } catch (error) {
        console.error("Error parsing adminData:", error);
        return null;
      }
    } else {
      console.log("No admin role found, redirecting to login...");
      return null;
    }
  });

  // Initialize staff list based on admin role
  const [staffList, setStaffList] = useState(() => {
    if (adminRole === 'sar') {
      return [
        {
          id: "SAR-001",
          name: "RAJ KUMAR",
          email: "RAJKUMAR@GMAIL.COM",
          lastUpdated: "2025-03-28",
          role: "sar"
        },
        {
          id: "SAR-002",
          name: "MALEESHA",
          email: "MALEESHA@GMAIL.COM",
          lastUpdated: "2025-02-27",
          role: "sar"
        }
      ];
    } else if (adminRole === 'far') {
      return [
        {
          id: "FAR-001",
          name: "PRIYA SINGH",
          email: "PRIYA.SINGH@GMAIL.COM",
          lastUpdated: "2025-03-20",
          role: "far"
        },
        {
          id: "FAR-002",
          name: "RAHUL PATEL",
          email: "RAHUL.PATEL@GMAIL.COM",
          lastUpdated: "2025-03-15",
          role: "far"
        }
      ];
    } else if (adminRole === 'dr') {
      return [
        {
          id: "DR-001",
          name: "ANANYA GUPTA",
          email: "ANANYA.GUPTA@GMAIL.COM",
          lastUpdated: "2025-03-22",
          role: "dr"
        },
        {
          id: "DR-002",
          name: "VIKRAM SHARMA",
          email: "VIKRAM.SHARMA@GMAIL.COM",
          lastUpdated: "2025-03-10",
          role: "dr"
        }
      ];
    } else {
      return [];
    }
  });

  // Role options for dropdown - only include roles that the current admin can manage
  const roleOptions = [
    // Admin can only change to their own role type
    { value: adminRole, label: getRoleDisplayName(adminRole) }
  ];

  // Redirect if not logged in
  useEffect(() => {
    if (!adminRole) {
      navigate("/");
    }
  }, [adminRole, navigate]);

  const handleAddStaff = (newStaff) => {
    if (staffToEdit) {
      // If editing existing staff
      handleUpdateStaff({
        ...staffToEdit,
        ...newStaff
      });
      setStaffToEdit(null);
    } else {
      // Adding new staff
      // Generate a new ID based on the admin role
      const rolePrefix = adminRole.toUpperCase();
      const roleStaffCount = staffList.length;
      const newId = `${rolePrefix}-${String(roleStaffCount + 1).padStart(3, '0')}`;
      const today = new Date().toISOString().split('T')[0];
      
      setStaffList([
        ...staffList,
        {
          ...newStaff,
          id: newId,
          lastUpdated: today,
          role: adminRole
        }
      ]);
    }
    setShowAddModal(false);
  };

  const handleUpdateStaff = (updatedStaff) => {
    // Ensure the role stays consistent with the admin's role
    const staffWithCorrectRole = {
      ...updatedStaff,
      role: adminRole,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    // Make sure ID prefix matches the admin role
    if (!staffWithCorrectRole.id.startsWith(adminRole.toUpperCase())) {
      const idNumber = staffWithCorrectRole.id.split('-')[1];
      staffWithCorrectRole.id = `${adminRole.toUpperCase()}-${idNumber}`;
    }
    
    setStaffList(prevList => 
      prevList.map(staff => 
        staff.id === updatedStaff.id ? staffWithCorrectRole : staff
      )
    );
  };

  const handleEditStaff = (staff) => {
    setStaffToEdit(staff);
    setShowAddModal(true);
  };

  const logoutAdmin = () => {
    sessionStorage.removeItem("adminData");
    sessionStorage.removeItem("adminToken");
    navigate("/");
  };

  // Helper function to get display name for role
  function getRoleDisplayName(roleCode) {
    switch(roleCode) {
      case 'sar':
        return 'Senior Assistant Registrar (SAR)';
      case 'dr':
        return 'Deputy Registrar (DR)';
      case 'far':
        return 'Faculty Assistant Registrar (FAR)';
      default:
        return roleCode.toUpperCase();
    }
  }

  // Get role-specific title
  const getRoleTitle = () => {
    return getRoleDisplayName(adminRole).toUpperCase();
  };

  // Filter staff based on search query
  const filteredStaff = staffList.filter(staff => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      staff.name.toLowerCase().includes(query) ||
      staff.email.toLowerCase().includes(query) ||
      staff.id.toLowerCase().includes(query)
    );
  });

  const handleCloseModal = () => {
    setShowAddModal(false);
    setStaffToEdit(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header title="STAFF MANAGEMENT" logOutFunc={logoutAdmin} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between mb-6">
          <Link to="/dashboard">
            <PrimaryButton text="GO TO DASHBOARD" />
          </Link>
          <PrimaryButton 
            text="+ ADD STAFF MEMBER" 
            onClick={() => {
              setStaffToEdit(null); // Reset staffToEdit when adding new staff
              setShowAddModal(true);
            }} 
          />
        </div>
        
        {/* Staff management section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">{getRoleTitle()}</h2>
          
          {/* Search bar */}
          <div className="mb-6 relative">
            <input 
              type="text" 
              placeholder="Search by name, email or ID" 
              className="w-64 pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg 
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          
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
              {filteredStaff.map((staff) => (
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
                      onClick={() => handleEditStaff(staff)}
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
        </div>
      </div>
      
      {/* Modal for both adding and updating staff */}
      {showAddModal && (
        <AddStaffModal 
          onClose={handleCloseModal}
          onSave={handleAddStaff}
          roleType={adminRole}
          existingStaff={staffToEdit}
        />
      )}
    </div>
  );
}

export default StaffManagement;