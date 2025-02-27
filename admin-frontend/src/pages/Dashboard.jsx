import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import TextCard from "../components/TextCard";
import PrimaryButton from "../components/PrimaryButton";
import { Link } from "react-router-dom";

function Dashboard() {
  const [adminRole, setAdminRole] = useState("");
  useEffect(() => {
    const role = localStorage.getItem("adminRole");
    if (role) {
      setAdminRole(role);
    } else {
      console.log("No admin role found, user should be redirected to login");
    }
    
  }, []);
  return (
    <div>
      <Header title="Admin Dashboard" />
      <div className="flex flex-col items-center gap-5 sm:gap-8 mt-8 sm:mt-12">
        {/* SAR Role Options */}
        {adminRole === "SAR" && (
          <>
            <Link to="/new-registration">
              <TextCard text="New Registration" />
            </Link>
            <Link to="/registered-students">
              <TextCard text="Registered Students" />
            </Link>
            <Link to="/system-settings">
              <TextCard text="System Settings" />
            </Link>
          </>
        )}

        {/* DR Role Options */}
        {adminRole === "DR" && (
          <>
            <Link to="/new-registration">
              <TextCard text="New Registration" />
            </Link>
            <Link to="/registered-students">
              <TextCard text="Registered Students" />
            </Link>
            <Link to="/system-settings">
              <TextCard text="System Settings" />
            </Link>
          </>
        )}

        {/* FAR Role Options */}
        {adminRole === "FAR" && (
          <>
            <Link to="/renewal-submission">
              <TextCard text="Renewal Submissions" />
            </Link>
            <Link to="/system-settings">
              <TextCard text="System Settings" />
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