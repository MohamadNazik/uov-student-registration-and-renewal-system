import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../../components/Banner";
import SecondaryButton from "../../components/SecondaryButton";

function ConfirmSelection() {
  const navigate = useNavigate();
  const studentDet = JSON.parse(localStorage.getItem("student"));
  useEffect(() => {
    if (!studentDet) {
      navigate("/check-selection");
    }
    const checkSession = () => {
      const savedData = sessionStorage.getItem("formData");
      if (savedData) {
        navigate("/a1-form-part-1");
      }
    };
    checkSession();
  }, [studentDet, navigate]);

  const handleBack = () => {
    localStorage.removeItem("student");
    navigate("/check-selection");
  };

  return (
    <div className="h-screen flex flex-col gap-3 sm:gap-5 justify-center items-center">
      <Banner />
      <div className="bg-white p-8 sm:p-8 rounded-3xl flex flex-col items-center gap-5 sm:gap-8 shadow-2xl">
        <h2 className="text-sm sm:text-lg font-medium text-center text-green-700">
          You have selected for:
        </h2>

        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-md sm:text-3xl uppercase text-center">
            {studentDet ? studentDet.course : "N/A"}
          </h1>

          <h2 className="text-[0.6rem] sm:text-[1rem] font-medium text-center uppercase">
            {studentDet ? studentDet.department : "N/A"}
          </h2>
          <h2 className="text-[0.6rem] sm:text-[1rem] font-medium text-center uppercase">
            Faculty of Applied Science
          </h2>
          <h2 className="text-[0.6rem] sm:text-[1rem] font-medium text-center uppercase">
            University of Vavuniya
          </h2>
        </div>

        <div className="flex gap-5">
          <SecondaryButton
            text="Go Back"
            color="bg-red-700"
            hoverColor="hover:bg-red-800"
            onClick={handleBack}
          />
          <Link to="/instructions">
            <SecondaryButton
              text="continue"
              color="bg-green-700"
              hoverColor="hover:bg-green-800"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ConfirmSelection;
