import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import TextCard from "../components/TextCard";
import PrimaryButton from "../components/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
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

  useEffect(() => {
    if (!adminRole) {
      navigate("/");
    }
  }, []);

  const logoutAdmin = () => {
    sessionStorage.removeItem("adminData");
    sessionStorage.removeItem("adminToken");
    navigate("/");
  };
  return (
    <div>
      <Header title="Admin Dashboard" logOutFunc={logoutAdmin} />
      <div className="flex flex-col items-center gap-5 sm:gap-8 mt-8 sm:mt-12">
        {/* SAR Role Options */}
        {adminRole === "sar" && (
          <>
            <Link to="/new-registrations">
              <TextCard text="New Registration" />
            </Link>
            <Link to="/registered-students">
              <TextCard text="Registered Students" />
            </Link>
            <Link to="/staff-management">
              <TextCard text="Staff Managemnt" />
            </Link>
            <Link to="/system-settings">
              <TextCard text="Admin Updates" />
            </Link>
          </>
        )}

        {/* DR Role Options */}
        {adminRole === "dr" && (
          <>
            <Link to="/new-registrations">
              <TextCard text="New Registration" />
            </Link>
            <Link to="/registered-students">
              <TextCard text="Registered Students" />
            </Link>
            <Link to="/staff-management">
              <TextCard text="Staff Managemnt" />
            </Link>
            <Link to="/system-settings">
              <TextCard text="Admin Updates" />
            </Link>
          </>
        )}

        {/* FAR Role Options */}
        {adminRole === "far" && (
          <>
            <Link to="/renewal-dashboard">
              <TextCard text="Renewal Submissions" />
            </Link>
            <Link to="/staff-management">
              <TextCard text="Staff Managemnt" />
            </Link>
            <Link to="/system-settings">
              <TextCard text="Admin Updates" />
            </Link>
          </>
        )}

        {/* Common option for all roles */}
        <Link to="/change-password">
          <PrimaryButton text="Change Password" />
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
