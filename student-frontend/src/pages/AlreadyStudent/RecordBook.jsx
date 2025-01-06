import React from "react";
import RecordBookComponent from "../../components/RecordBookComponent";
import Header from "../../components/Header";
import PrimaryButton from "../../components/PrimaryButton";
import download_icon from "../../assets/icons/download_icon.png";
import { Link } from "react-router-dom";

function RecordBook() {
  return (
    <>
      <Header title="Record Book" />
      <div className="flex justify-between px-4 sm:px-[100px] mt-5 xl:mt-10">
        <Link to="/user-dashboard">
          <PrimaryButton text="Go Back To Dashboard" />
        </Link>
        <PrimaryButton text="Download" iconSrc={download_icon} />
      </div>
      <div className="flex w-full justify-center py-5 xl:py-16">
        <RecordBookComponent />
      </div>
    </>
  );
}

export default RecordBook;
