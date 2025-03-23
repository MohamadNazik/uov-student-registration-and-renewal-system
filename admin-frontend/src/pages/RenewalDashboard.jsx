import React from "react";
import Header from "../components/Header";
import TextCard from "../components/TextCard";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";

function RenewalDashboard() {
  return (
    <div>
      <Header title="RENEWAL SUBMISSIONS DASHBOARD" />
      <div className="flex flex-col items-center gap-5 sm:gap-8 mt-14">
        <Link to="/second-year-renewal">
          <TextCard text="Second Year Renewal Submissions" />
        </Link>
        <Link to="/third-year-renewal">
          <TextCard text="Third Year Renewal Submissions" />
        </Link>
        <Link to="/fourth-year-renewal">
          <TextCard text="Fourth Year Renewal Submissions" />
        </Link>
        <Link to="/dashboard">
          <PrimaryButton text="GO TO DASHBOARD" />
        </Link>
      </div>
    </div>
  );
}

export default RenewalDashboard;