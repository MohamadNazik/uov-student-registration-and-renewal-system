import React from "react";
import Header from "../components/Header";
import TextCard from "../components/TextCard";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";

function RegisteredStudents() {
  return (
    <div>
      <Header title="Registered Students Dashboard" />
      <div className="flex flex-col items-left gap-5 sm:gap-8 mt-8 sm:mt-12 m-10">
        <Link to="/dashboard">
          <PrimaryButton text="Go To Dashboard" />
        </Link>
      </div>
      <div className="flex flex-col items-center gap-5 sm:gap-8">
        <Link to="/first-year">
          <TextCard text="First Year  " />
        </Link>
        <Link to="/second-year">
          <TextCard text="Second Year" />
        </Link>
        <Link to="/third-year">
          <TextCard text="Third Year" />
        </Link>
        <Link to="/fourth-year">
          <TextCard text="Fourth Year" />
        </Link>
      </div>
    </div>
  );
}

export default RegisteredStudents;
