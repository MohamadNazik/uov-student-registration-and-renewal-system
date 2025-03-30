import React, { useState } from "react";

function AddStaffModal({ onClose, onSave, roleType, existingStaff = null }) {
  const [staffData, setStaffData] = useState({
    name: existingStaff?.name || "",
    email: existingStaff?.email || "",
    password: "",
    confirmPassword: ""
  });
  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffData({
      ...staffData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (staffData.password !== staffData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    onSave(staffData);
  };

  // Get role-specific title for modal header
  const getModalTitle = () => {
    const action = existingStaff ? 'UPDATE' : 'ADD NEW';
    switch(roleType) {
      case 'sar':
        return `${action} SAR STAFF MEMBER`;
      case 'dr':
        return `${action} DR STAFF MEMBER`;
      case 'far':
        return `${action} FAR STAFF MEMBER`;
      default:
        return `${action} STAFF MEMBER`;
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setPasswordVisible(!passwordVisible);
    } else {
      setConfirmPasswordVisible(!confirmPasswordVisible);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="bg-[#391031] text-white py-4 px-6 rounded-t-lg">
          <h2 className="text-xl font-bold text-center">{getModalTitle()}</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 "
              value={staffData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
              value={staffData.email}
              onChange={handleChange}
              required
            />
            {existingStaff && (
              <p className="mt-1 text-sm text-gray-500">Current email: {existingStaff.email}</p>
            )}
          </div>
          
          <div className="mb-4 relative">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder={existingStaff ? "New Password" : "Password"}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
              value={staffData.password}
              onChange={handleChange}
              required={!existingStaff}
            />
            <button 
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => togglePasswordVisibility('password')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={passwordVisible ? 
                  "M3 3l18 18M10.94 6.08A6.002 6.002 0 0119.5 12c0 1.61-.59 3.09-1.56 4.23" : 
                  "M15 12a3 3 0 11-6 0 3 3 0 016 0z"} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={passwordVisible ? 
                  "M9.9 4.24A9.12 9.12 0 0112 4c7 0 10 7 10 7a13.528 13.528 0 01-3 3.93" : 
                  "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
              </svg>
            </button>
          </div>
          
          <div className="mb-6 relative">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 "
              value={staffData.confirmPassword}
              onChange={handleChange}
              required={!existingStaff || staffData.password !== ""}
            />
            <button 
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => togglePasswordVisibility('confirm')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={confirmPasswordVisible ? 
                  "M3 3l18 18M10.94 6.08A6.002 6.002 0 0119.5 12c0 1.61-.59 3.09-1.56 4.23" : 
                  "M15 12a3 3 0 11-6 0 3 3 0 016 0z"} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={confirmPasswordVisible ? 
                  "M9.9 4.24A9.12 9.12 0 0112 4c7 0 10 7 10 7a13.528 13.528 0 01-3 3.93" : 
                  "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
              </svg>
            </button>
          </div>
          
          <div className="flex justify-center space-x-4 mt-8">
            <button
              type="button"
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
              onClick={onClose}
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
            >
              {existingStaff ? "UPDATE" : "SAVE"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStaffModal;