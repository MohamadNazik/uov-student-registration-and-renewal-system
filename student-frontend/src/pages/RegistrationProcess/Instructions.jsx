import React, { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import { Link, useNavigate } from "react-router-dom";
import SecondaryButton from "../../components/SecondaryButton";
import PdfContainer from "../../components/PdfContainer";
import A3form from "../../assets/documents/A3form.pdf";
import A4form from "../../assets/documents/A4form.pdf";
import A5form from "../../assets/documents/A5form.pdf";
import A6form from "../../assets/documents/A6form.pdf";
import Attestationform from "../../assets/documents/Attestationform.pdf";

// instruction page

function Instructions() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAlreadyVerify = () => {
      const student = localStorage.getItem("student");
      if (!student) {
        navigate("/");
      }
    };

    checkAlreadyVerify();
  }, [navigate]);
  const [isUnderstood, setIsUnderstood] = useState(false);
  return (
    <div className="h-screen flex flex-col gap-1 sm:gap-2 justify-start items-center mt-3 sm:mt-7">
      <Banner />
      <div className="flex flex-col gap-3">
        <div className="bg-white p-8 sm:p-8 rounded-3xl flex flex-col items-center gap-5 sm:gap-8 shadow-2xl">
          <h2 className="text-xs w-60 sm:w-[34rem] sm:text-[0.85rem] font-medium text-center">
            Please find the instructions pdf below for the registration.
            Carefully read and continue to registration process.
          </h2>

          <div className="flex flex-col gap-4 w-60 sm:w-[32rem] items-center">
            <h2 className="flex flex-col text-md sm:text-lg font-bold text-center text-red-700">
              Note:{" "}
              <span className="text-xs sm:text-md">
                Submit every documents as mentioned in the instructions.
              </span>
            </h2>
            <PdfContainer text="Instructions" />
          </div>
        </div>
        <div className="bg-white p-8 sm:p-8 rounded-3xl flex flex-col items-center gap-5 sm:gap-8 shadow-2xl mb-4 sm:mb-8">
          <h2 className="text-xs w-60 sm:w-[34rem] sm:text-[0.85rem] font-medium text-center">
            Please find the instructions pdf below for the registration.
            Carefully read and continue to registration process.
          </h2>

          <div className="flex flex-col gap-4 w-60 sm:w-[32rem] items-center">
            <h2 className="flex flex-col text-md sm:text-lg font-bold text-center text-blue-900">
              Documents:{" "}
              <span className="text-xs sm:text-md">
                Download the following documents which are must submitted in the
                registration process.
              </span>
            </h2>
            <div className="flex flex-col gap-3 sm:gap-4 items-center">
              <div className="flex gap-1 sm:gap-3">
                <a href={A3form} download>
                  <PdfContainer text="A3 Form" />
                </a>
                <a href={A4form} download>
                  <PdfContainer text="A4 Form" />
                </a>
              </div>
              <div className="flex gap-1 sm:gap-3">
                <a href={A5form} download>
                  <PdfContainer text="A5 Form" />
                </a>
                <a href={A6form} download>
                  <PdfContainer text="A6 Form" />
                </a>
              </div>
              <a href={Attestationform} download>
                <PdfContainer text="Attestation Form" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-4 justify-center items-center">
        <input
          type="checkbox"
          id="checkBoxSelection"
          className="w-4 h-4 accent-[#391031] cursor-pointer"
          checked={isUnderstood}
          onChange={(e) => setIsUnderstood(e.target.checked)}
        />
        <label
          htmlFor="checkBoxSelection"
          className="text-md font-medium cursor-pointer"
        >
          I have read and understood the instructions.
        </label>
      </div>

      <div className="pb-3 sm:pb-8">
        <Link to="/a1-from-part-1">
          <SecondaryButton
            text="continue to registration"
            color="bg-green-700"
            hoverColor="hover:bg-green-800"
            isDisabled={!isUnderstood}
          />
        </Link>
      </div>
    </div>
  );
}

export default Instructions;
