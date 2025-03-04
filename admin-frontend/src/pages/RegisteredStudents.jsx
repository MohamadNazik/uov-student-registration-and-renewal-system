import React from "react";
import Header from "../components/Header";
import TextCard from "../components/TextCard";
import PrimaryButton from "../components/PrimaryButton";
import { Link } from "react-router-dom";

function UserDashboard() {
  return (
    <div>
      <Header title="Registered Students Dashboard" />
      <div className="flex flex-col items-center gap-5 sm:gap-8 mt-8 sm:mt-12">
        <Link to="/first-year">
          <TextCard text="For First Year" />
        </Link>
        <Link to="/second-year">
          <TextCard text="For Second Year" />
        </Link>
        <Link to="/third-year">
          <TextCard text="For Third Year" />
        </Link>
        <Link to="/fourth-year">
          <PrimaryButton text="For Fourh Year" />
        </Link>
      </div>
    </div>
  );
}