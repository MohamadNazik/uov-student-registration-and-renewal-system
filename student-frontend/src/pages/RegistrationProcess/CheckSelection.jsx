import React from "react";
import PrimaryButton from "../../components/PrimaryButton";
import { Link } from "react-router-dom";
import Banner from "../../components/Banner";

function CheckSelection() {
  return (
    <div className="h-screen flex flex-col gap-3 sm:gap-5 justify-center items-center">
      <Banner />
      <div className="bg-white p-8 sm:p-8 rounded-3xl flex flex-col items-center gap-5 sm:gap-8 shadow-2xl">
        <h2 className="text-sm w-60 sm:w-96 sm:text-lg font-medium text-center">
          Check whether you have selected for the University.
        </h2>
        <div className="relative">
          <input
            type="text"
            id="nic"
            className="block px-2 pb-2 sm:px-2.5 sm:pb-2.5 pt-4 w-[14rem] sm:w-[20rem] text-xs sm:text-lg font-medium text-gray-900 bg-transparent outline outline-2 outline-gray-300 rounded-md peer focus:outline focus:outline-2 focus:outline-black"
            placeholder=" "
          />
          <label
            htmlFor="nic"
            className="absolute text-xs sm:text-lg text-gray-500 duration-300 transform -translate-y-4 sm:-translate-y-5 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 sm:peer-focus:-translate-y-5 start-1 cursor-text"
          >
            NIC Number
          </label>
        </div>

        <Link to="/confirm-selection">
          <PrimaryButton text="Check" />
        </Link>
      </div>
    </div>
  );
}

export default CheckSelection;
