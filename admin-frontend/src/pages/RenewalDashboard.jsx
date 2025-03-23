import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function RenewalDashboard() {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("/admin-dashboard");
  };

  const navigateToRenewalSubmission = () => {
    navigate("/renewal-submission");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header title="RENEWAL SUBMISSIONS DASHBOARD" />
      
      <div className="max-w-md mx-auto py-8 px-4">
        <div className="flex flex-col items-center gap-4">
          {/* Card buttons for different year submissions */}
          <div className="w-full bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <button className="w-full text-center py-3">
              For Second Year Renewal Submissions
            </button>
          </div>
          
          <div className="w-full bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <button className="w-full text-center py-3">
              For Third Year Renewal Submissions
            </button>
          </div>
          
          <div className="w-full bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <button className="w-full text-center py-3">
              For Fourth Year Renewal Submissions
            </button>
          </div>
          
          {/* Dashboard button */}
          <div className="mt-6">
            <button 
              onClick={goToDashboard}
              className="bg-purple-900 text-white px-6 py-2 rounded-md text-sm uppercase font-medium hover:bg-purple-800 transition-colors"
            >
              GO TO DASHBOARD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RenewalDashboard;