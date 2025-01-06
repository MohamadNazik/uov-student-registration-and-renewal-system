import React from "react";
import Banner from "../../components/Banner";
import { Link } from "react-router-dom";
import SecondaryButton from "../../components/SecondaryButton";
import PdfContainer from "../../components/PdfContainer";

// instruction page

function Instructions() {
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
                <PdfContainer text="A3 Form" />
                <PdfContainer text="A4 Form" />
              </div>
              <div className="flex gap-1 sm:gap-3">
                <PdfContainer text="A5 Form" />
                <PdfContainer text="A6 Form" />
              </div>
              <PdfContainer text="Attestation Form" />
            </div>
          </div>
        </div>
      </div>

      <div className="pb-3 sm:pb-8">
        <Link to="/a1-from-part-1">
          <SecondaryButton
            text="continue to registration"
            color="bg-green-700"
            hoverColor="hover:bg-green-800"
          />
        </Link>
      </div>
    </div>
  );
}

export default Instructions;

