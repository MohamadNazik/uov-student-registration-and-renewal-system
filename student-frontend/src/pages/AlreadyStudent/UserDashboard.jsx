import React, { useEffect } from "react";
import Header from "../../components/Header";
import TextCard from "../../components/TextCard";
import PrimaryButton from "../../components/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../utils/SwatAleart";

function UserDashboard() {
  const Enrollment_Number = sessionStorage.getItem("Enrollment_Number");
  const navigate = useNavigate();
  useEffect(() => {
    const availableToken = sessionStorage.getItem("token");
    sessionStorage.removeItem("formData");
    if (!availableToken) {
      navigate("/login");
    }
  }, []);
  const confirmFunc = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("Enrollment_Number");
    navigate("/login");
  };
  return (
    <div>
      <Header
        title={Enrollment_Number ? Enrollment_Number : ""}
        logOutFunc={() => logout(confirmFunc)}
      />
      <div className="flex flex-col items-center gap-5 sm:gap-8 mt-8 sm:mt-12">
        <Link to="/student-id">
          <TextCard text="Your Student ID" />
        </Link>
        <Link to="/record-book">
          <TextCard text="Your Record Book" />
        </Link>
        <Link to="/renewal">
          <TextCard text="Renewal of Registration" />
        </Link>
        <Link to="/change-password">
          <PrimaryButton text="Change Password" />
        </Link>
      </div>
    </div>
  );
}

export default UserDashboard;
