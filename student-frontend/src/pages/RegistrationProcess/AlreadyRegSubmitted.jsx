import React, { useEffect } from "react";
import SecondaryButton from "../../components/SecondaryButton";
import { Link, useNavigate } from "react-router-dom";

function AlreadyRegSubmitted() {
  const availableToken = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!availableToken) {
      navigate("/login");
    }
  }, [availableToken]);
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col gap-2 sm:gap-5 bg-white rounded-2xl w-fit h-fit p-5 sm:p-12 shadow-xl items-center">
        <h2 className="text-[0.7rem] sm:text-[1.25rem] font-bold text-center">
          You have Already Submitted the Registration.
        </h2>
        <p className="text-red-600 font-medium text-[0.5rem] sm:text-[0.65rem] text-center">
          You will be get notified through email when your
          <br />
          registration got approved.
        </p>
        <Link to="/use-dashboard">
          <SecondaryButton
            text="ok"
            color="bg-green-700"
            hoverColor="hover:bg-green-800"
          />
        </Link>
      </div>
    </div>
  );
}

export default AlreadyRegSubmitted;
