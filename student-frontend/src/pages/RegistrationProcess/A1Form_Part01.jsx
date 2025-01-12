import React from "react";
import uov_logo from "../../assets/uov_logo.png";
import Y_Image from "../../assets/DP.jpg";
import { Link } from "react-router-dom";
import SecondaryButton from "../../components/SecondaryButton";

function A1Form_Part01() {
  return (
    <>
      <div className="bg-white md:block sm:flex m-2 sm:m-5 xl:ml-8 p-2 sm:p-7 xl:p-10 shadow-md rounded-lg  justify-center">
        <div className=" flex text-left items-center  h-screenitems-center text-sm md:text-lg border border-black rounded-sm focus:outline-1 xl:ml-20 focus:outline-black  px-2 py-1 w-[200px] h-[25px] md:w-[300px] mb-4 sm:mb-6 justify-center">
          A1 - Enrollment Form
        </div>
        <header className="mb-4 sm:flex block justify-between sm:mb-5">
          <img
            src={uov_logo}
            alt="University Logo"
            className="w-[60px] sm:w-[130px] sm:h-[130px] mx-auto mb-2"
          />
          <div className="block justify-center text-center mt-0 md:mt-4">
            <h1 className="text-xl sm:text-lg md:text-2xl xl:text-2xl font-semibold">
              UNIVERSITY OF VAVUNIYA
            </h1>
            <p className="text-sm sm:text-lg xl:text-2xl text-gray-600">
              Personal Data of Students
            </p>
            <p className="text-sm sm:text-lg xl:text-2xl text-gray-600">
              Student Admission for the Academic Year 2022/23
            </p>
          </div>
          <img
            src={Y_Image}
            alt="your Image"
            className="w-[50px] sm:w-[120px] md:h-[130px] mx-auto mb-2 mt-2 md:mt-0 border border-black rounded-lg"
          />
        </header>

        <form className="flex flex-col items-center gap-5">
          {/* Enrollment Number */}
          <div className="flex flex-wrap gap-2 justify-between items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
            <label className="text-sm sm:text-lg xl:text-2xl font-medium uppercase">
              1. Enrollment No :-
            </label>
            <input
              type="text"
              name="enrollment_no"
              className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[825px] text-sm sm:text-lg xl:text-2xl py-1"
            />
          </div>

          {/* Name */}

          <div className="flex flex-wrap gap-2 justify-between items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
            <label className="text-sm sm:text-lg xl:text-2xl font-medium uppercase">
              2. Name :-
            </label>
          </div>

          <div className="flex flex-col gap-2 sm:gap-4 ml-8">
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                (i). Title :-
              </label>
              <div className="flex gap-2 sm:gap-7 ml-9">
                <label className="flex items-center space-x-1 sm:space-x-2 xl:space-x-4">
                  <input
                    type="radio"
                    name="state"
                    value="Rev"
                    className="w-3 h-3 sm:w-[14px] sm:h-[14px] xl:w-[16px] xl:h-[16px] rounded-full accent-[#391031]"
                  />
                  <span className="text-sm sm:text-lg xl:text-2xl font-semibold">
                    Rev.
                  </span>
                </label>
                <label className="flex items-center space-x-1 sm:space-x-2 xl:space-x-4">
                  <input
                    type="radio"
                    name="state"
                    value="Mr"
                    className="w-3 h-3 sm:w-[14px] sm:h-[14px] xl:w-[16px] xl:h-[16px] rounded-full accent-[#391031]"
                  />
                  <span className="text-sm sm:text-lg xl:text-2xl font-semibold">
                    Mr.
                  </span>
                </label>
                <label className="flex items-center space-x-1 sm:space-x-2 xl:space-x-4">
                  <input
                    type="radio"
                    name="state"
                    value="Mrs"
                    className="w-3 h-3 sm:w-[14px] sm:h-[14px] xl:w-[16px] xl:h-[16px] rounded-full accent-[#391031]"
                  />
                  <span className="text-sm sm:text-lg xl:text-2xl font-semibold">
                    Mrs.
                  </span>
                </label>
                <label className="flex items-center space-x-1 sm:space-x-2 xl:space-x-4">
                  <input
                    type="radio"
                    name="state"
                    value="Miss"
                    className="w-3 h-3 sm:w-[14px] sm:h-[14px] xl:w-[16px] xl:h-[16px] rounded-full accent-[#391031]"
                  />
                  <span className="text-sm sm:text-lg xl:text-2xl font-semibold">
                    Miss.
                  </span>
                </label>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[288px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-sm xl:text-lg font-medium">
                (other Please specify)
              </label>
              <input
                type="text"
                name="title"
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[825px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[288px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                (ii). Name with Initials :-
              </label>
              <input
                type="text"
                name="name_with_initials"
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[825px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                (iii). Name denoted by Initials :-
              </label>
              <input
                type="text"
                name="name_denoted_by_initials"
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>
          </div>
          {/* Address */}
          <div className="flex flex-wrap gap-2 justify-between items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
            <label className="text-sm sm:text-lg xl:text-2xl font-medium uppercase">
              2. Address :-
            </label>
          </div>

          <div className="flex flex-col gap-2 sm:gap-4 ml-8">
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[288px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                (i). Permanent Address :-
              </label>
              <textarea
                type="text"
                name="permanent_address"
                rows={3}
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[825px] text-sm sm:text-lg xl:text-2xl py-1 "
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                (ii). province :-
              </label>
              <input
                type="text"
                name="province"
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                (ii). District :-
              </label>
              <input
                type="text"
                name="district"
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                (iii). Divisional Secretariat :-
              </label>
              <input
                type="text"
                name="divisional_secretariat"
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                (iv). National Identity Card No :-
              </label>
              <input
                type="text"
                name="divisional_secretariat"
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                (v). Mobile No :-
              </label>
              <input
                type="text"
                name="mobile_no"
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                (vi). Email Address :-
              </label>
              <input
                type="text"
                name="adddress"
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>
          </div>
        </form>
        {/* Next Button */}
        <div className="flex gap-8 mt-2 sm:gap-20 sm:mt-8 justify-end">
          <Link to="/a1-from-part-2">
            <SecondaryButton
              text="Next"
              color="bg-green-700"
              hoverColor="hover:bg-green-800"
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default A1Form_Part01;
