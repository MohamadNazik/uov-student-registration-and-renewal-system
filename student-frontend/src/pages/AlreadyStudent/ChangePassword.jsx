import React from "react";
import PrimaryButton from "../../components/PrimaryButton";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

function ChangePassword() {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header title="CHANGE PASSWORD" />

      <div className="flex justify-between px-4 sm:px-[100px] mt-5 xl:mt-10">
        <Link to="/user-dashboard">
          <PrimaryButton text="Go Back To Dashboard" />
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center flex-grow">
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-lg w-11/12 max-w-md flex flex-col gap-5 items-center">
          <div className="flex flex-col">
            <label htmlFor="oldPassword" className="text-gray-700 font-medium">
              Old Password
            </label>
            <div className="relative mt-3">
              <input
                type="text"
                id="old-password"
                className="block px-2 pb-2 sm:px-2.5 sm:pb-2.5 pt-4 w-[14rem] sm:w-[22rem] text-xs sm:text-lg font-medium text-gray-900 bg-transparent outline outline-2 outline-gray-300 rounded-md peer focus:outline focus:outline-2 focus:outline-black"
                placeholder=" "
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="newPassword" className="text-gray-700 font-medium">
              New Password
            </label>
            <div className="relative mt-3">
              <input
                type="text"
                id="new-password"
                className="block px-2 pb-2 sm:px-2.5 sm:pb-2.5 pt-4 w-[14rem] sm:w-[22rem] text-xs sm:text-lg font-medium text-gray-900 bg-transparent outline outline-2 outline-gray-300 rounded-md peer focus:outline focus:outline-2 focus:outline-black"
                placeholder=" "
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="text-gray-700 font-medium"
            >
              Confirm New Password
            </label>
            <div className="relative mt-3">
              <input
                type="text"
                id="confirm-password"
                className="block px-2 pb-2 sm:px-2.5 sm:pb-2.5 pt-4 w-[14rem] sm:w-[22rem] text-xs sm:text-lg font-medium text-gray-900 bg-transparent outline outline-2 outline-gray-300 rounded-md peer focus:outline focus:outline-2 focus:outline-black"
                placeholder=" "
              />
            </div>
          </div>

          <PrimaryButton text="CHANGE" />
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
