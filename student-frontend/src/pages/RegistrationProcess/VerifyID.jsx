import React from "react";
import { Link } from "react-router-dom";
import SecondaryButton from "../../components/SecondaryButton";
import StudentIDCard from "../../components/StudentIDCard";

function VerifyID() {
  return (
    <>
      <div className="bg-white md:block sm:flex m-2 sm:m-5 xl:ml-8 p-2 sm:p-7 xl:p-10 shadow-md rounded-lg  justify-center">
        {/* Details of the parents/Guardians  */}
        <div className="flex flex-wrap gap-2 justify-between items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
          <label className="text-sm font-bold sm:text-lg xl:text-2xl uppercase">
            9. Student id details verification
          </label>
          <span className="ml-8 text-red-600 font-medium text-md">
            This will be your Student ID card of UNIVERSITY OF VAVUNIYA. Check
            whether your details are correct or not.
          </span>
        </div>
      </div>

      {/* student id */}
      <div className="flex w-full justify-center py-5 xl:py-16">
        <StudentIDCard />
      </div>

      {/* Buttons */}
      <div className="flex gap-8 mt-2 sm:gap-10 sm:mt-8 justify-center">
        <Link to="/a1-from-part-1">
          <SecondaryButton
            text="Not Correct"
            color="bg-red-700"
            hoverColor="hover:bg-green-800"
          />
        </Link>
        <Link to="/reg-success">
          <SecondaryButton
            text="Correct & Submit"
            color="bg-green-700"
            hoverColor="hover:bg-green-800"
          />
        </Link>
      </div>
    </>
  );
}

export default VerifyID;
