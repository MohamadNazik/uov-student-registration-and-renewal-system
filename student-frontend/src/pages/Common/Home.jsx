import React from "react";

import PrimaryButton from "../../components/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../../components/Banner";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const handleRegistration = async () => {
    try {
      await axios
        .get("http://localhost:8080/api/common/registration-available")
        .then((res) => {
          if (!res.data.success) {
            navigate("/reg-not-open");
          } else {
            navigate("/check-selection");
          }
        });
    } catch (error) {}
  };
  return (
    <div className="h-screen flex flex-col gap-3 sm:gap-5 justify-center items-center">
      <Banner />
      <div className="bg-white p-8 sm:p-14 rounded-3xl flex flex-col items-center gap-5 sm:gap-8 shadow-2xl">
        {/* <Link to="check-selection"> */}
        <PrimaryButton
          text="PROCEED TO REGISTRATION"
          onClick={handleRegistration}
        />
        {/* </Link> */}
        <Link to="/login">
          <PrimaryButton text="LOGIN TO YOUR ACCOUNT" />
        </Link>
      </div>
    </div>
  );
}

export default Home;
