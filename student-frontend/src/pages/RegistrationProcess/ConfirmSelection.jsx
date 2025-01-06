import React from "react";
import { Link } from "react-router-dom";
import Banner from "../../components/Banner";
import SecondaryButton from "../../components/SecondaryButton";

function ConfirmSelection() {
  return (
    <div className="h-screen flex flex-col gap-3 sm:gap-5 justify-center items-center">
      <Banner />
      <div className="bg-white p-8 sm:p-8 rounded-3xl flex flex-col items-center gap-5 sm:gap-8 shadow-2xl">
        <h2 className="text-sm sm:text-lg font-medium text-center text-green-700">
          You have selected for:
        </h2>

        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-md sm:text-3xl uppercase text-center">
            Information Technology
          </h1>

          <h2 className="text-[0.6rem] sm:text-[1rem] font-medium text-center uppercase">
            Department Physical Science
          </h2>
          <h2 className="text-[0.6rem] sm:text-[1rem] font-medium text-center uppercase">
            Faculty of Applied Science
          </h2>
          <h2 className="text-[0.6rem] sm:text-[1rem] font-medium text-center uppercase">
            University of Vavuniya
          </h2>
        </div>

        <Link to="/instructions">
          <SecondaryButton
            text="continue"
            color="bg-green-700"
            hoverColor="hover:bg-green-800"
          />
        </Link>
      </div>
    </div>
  );
}

export default ConfirmSelection;