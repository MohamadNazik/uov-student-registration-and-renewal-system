import React from "react";
import StudentIDCard from "../../components/StudentIDCard";
import Header from "../../components/Header";
import PrimaryButton from "../../components/PrimaryButton";
import download_icon from "../../assets/icons/download_icon.png";
import { Link } from "react-router-dom";

function StudentID() {
  return (
    <>
      <Header title="Student ID" />
      <div className="flex justify-between px-4 sm:px-[100px] mt-5 xl:mt-10">
        <Link to="/user-dashboard">
          <PrimaryButton text="Go Back To Dashboard" />
        </Link>
        <PrimaryButton text="Download" iconSrc={download_icon} />
      </div>
      <div className="flex w-full justify-center py-5 xl:py-16">
        <StudentIDCard />
      </div>
    </>
  );
}

export default StudentID;
