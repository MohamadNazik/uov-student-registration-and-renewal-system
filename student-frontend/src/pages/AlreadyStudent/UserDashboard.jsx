import React from "react";
import Header from "../../components/Header";
import TextCard from "../../components/TextCard";
import PrimaryButton from "../../components/PrimaryButton";
import { Link } from "react-router-dom";

function UserDashboard() {
  return (
    <div>
      <Header title="Dashboard" />
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
