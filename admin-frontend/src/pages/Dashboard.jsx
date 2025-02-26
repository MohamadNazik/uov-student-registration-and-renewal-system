import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import TextCard from "../components/TextCard";
import PrimaryButton from "../components/PrimaryButton";
import { Link } from "react-router-dom";


function Dashboard() {


  return (
    <div><Header title="Admin Dashboard" />
      <div className="flex flex-col items-center gap-5 sm:gap-8 mt-8 sm:mt-12">



        <Link to="/change-password">
          <PrimaryButton text="Change Password" />
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
