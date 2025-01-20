import React from "react";
import PrimaryButton from "../../components/PrimaryButton";
import Header from "../../components/Header"; 
import { Link } from "react-router-dom";

function ChangePassword() {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
  
      <Header />

      <div className="flex flex-col justify-center items-center flex-grow">
        <h1 className="text-2xl sm:text-3xl font-bold text-white bg-purple-900 py-4 px-6 rounded-md shadow-md mb-8">
          CHANGE PASSWORD
        </h1>

        
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-lg w-11/12 max-w-md flex flex-col gap-5">
          
            <div className="flex flex-col">
              <label htmlFor="oldPassword" className="text-gray-700 font-medium">
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                placeholder="Enter old password"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* New Password */}
            <div className="flex flex-col">
              <label htmlFor="newPassword" className="text-gray-700 font-medium">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                placeholder="Enter new password"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

  
            <div className="flex flex-col">
              <label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm new password"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

          
            <PrimaryButton text="CHANGE" />

          
          <div className="mt-4 text-center">
            <Link to="/dashboard" className="text-purple-700 hover:underline">
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
