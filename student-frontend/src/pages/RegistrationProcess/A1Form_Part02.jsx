{
  /* A1 form part b*/
}
import React from "react";
import SecondaryButton from "../../components/SecondaryButton";
import { Link } from "react-router-dom";

function A1Form_Part02() {
  return (
    <div className="bg-white m-2 sm:m-5 xl:m-8 p-4 sm:p-7 xl:p-10 rounded-lg flex flex-col gap-5">
      {/* Education Qualification */}
      <div className="flex flex-col gap-4">
        <h4 className="text-lg sm:text-xl xl:text-2xl font-bold">
          4. EDUCATION QUALIFICATION
        </h4>

        {/* Year of GCE (A/L) Examination */}
        <div className="flex gap-2 items-center">
          <label className="text-sm sm:text-lg xl:text-xl font-medium ml-12">
            i. Year of the GCE (A/L) Examination :-
          </label>
          <input
            type="text"
            name="yearOfALExamination"
            className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
          />
        </div>

        {/* Index No of GCE (A/L) Examination */}
        <div className="flex gap-2 items-center">
          <label className="text-sm sm:text-lg xl:text-xl font-medium ml-12">
            ii. Index No of the GCE (A/L) Examination :-
          </label>
          <input
            type="text"
            name="indexOfALExamination"
            className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
          />
        </div>

        {/* Average Z Score */}
        <div className="flex gap-2 items-center">
          <label className="text-sm sm:text-lg xl:text-xl font-medium ml-12">
            iii. Average Z Score :-
          </label>
          <input
            type="text"
            name="avgZscore"
            className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
          />
        </div>

        {/* GCE (A/L) Examination */}
        <div className="flex flex-col gap-4">
          <h5 className="text-sm sm:text-lg xl:text-xl font-medium ml-12">
            iv. GCE (A/L) Examination :-
          </h5>

          {/* Subject & Result Fields */}
          <div className="flex gap-2 items-center ml-16">
            <label className="text-sm sm:text-lg xl:text-xl font-medium ml-1">
              Subject :-
            </label>
            <input
              type="text"
              name="subject1"
              className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
            />
            <label className="text-sm sm:text-lg xl:text-xl font-medium ml-5">
              Result :-
            </label>
            <select
              name="result1"
              className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 text-sm sm:text-lg xl:text-2xl py-1"
            >
              <option value=""></option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="S">S</option>
              <option value="F">F</option>
            </select>
          </div>

          <div className="flex gap-2 items-center ml-16">
            <label className="text-sm sm:text-lg xl:text-xl font-medium ml-1">
              Subject :-
            </label>
            <input
              type="text"
              name="subject2"
              className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
            />
            <label className="text-sm sm:text-lg xl:text-xl font-medium ml-5">
              Result :-
            </label>
            <select
              name="result2"
              className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 text-sm sm:text-lg xl:text-2xl py-1"
            >
              <option value=""></option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="S">S</option>
              <option value="F">F</option>
            </select>
          </div>
          <div className="flex gap-2 items-center ml-16">
            <label className="text-sm sm:text-lg xl:text-xl font-medium ml-1">
              Subject :-
            </label>
            <input
              type="text"
              name="subject3"
              className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
            />
            <label className="text-sm sm:text-lg xl:text-xl font-medium ml-5">
              Result :-
            </label>
            <select
              name="result3"
              className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 text-sm sm:text-lg xl:text-2xl py-1"
            >
              <option value=""></option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="S">S</option>
              <option value="F">F</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h4 className="text-lg sm:text-xl xl:text-2xl font-bold">
          5. DETAILS OF CITIZENSHIP
        </h4>

        {/* race */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <label className="text-sm sm:text-lg xl:text-xl font-medium ml-10">
              i. Race :-
            </label>
            <label className="flex items-center space-x-1 sm:space-x-2 xl:space-x-4">
              <input
                type="radio"
                name="race"
                value="Sinhala"
                className="w-3 h-3 sm:w-[14px] sm:h-[14px] xl:w-[16px] xl:h-[16px] rounded-full accent-[#391031]"
              />
              <span className="text-sm sm:text-base xl:text-lg font-medium">
                Sinhala
              </span>
            </label>
            <label className="flex items-center space-x-1 sm:space-x-2 xl:space-x-4">
              <input
                type="radio"
                name="race"
                value="Tamil"
                className="w-3 h-3 sm:w-[14px] sm:h-[14px] xl:w-[16px] xl:h-[16px] rounded-full accent-[#391031]"
              />
              <span className="text-sm sm:text-base xl:text-lg font-medium">
                Tamil
              </span>
            </label>
            <label className="flex items-center space-x-1 sm:space-x-2 xl:space-x-4">
              <input
                type="radio"
                name="race"
                value="Muslim"
                className="w-3 h-3 sm:w-[14px] sm:h-[14px] xl:w-[16px] xl:h-[16px] rounded-full accent-[#391031]"
              />
              <span className="text-sm sm:text-base xl:text-lg font-medium">
                Muslim
              </span>
            </label>
            <label className="flex items-center space-x-1 sm:space-x-2 xl:space-x-4">
              <input
                type="radio"
                name="race"
                value="Others"
                className="w-3 h-3 sm:w-[14px] sm:h-[14px] xl:w-[16px] xl:h-[16px] rounded-full accent-[#391031]"
              />
              <span className="text-sm sm:text-base xl:text-lg font-medium">
                Others
              </span>
            </label>
          </div>
          {/* if others */}
          <div className="flex gap-2 items-center ml-10">
            <label className="text-xs  ml-1">(PI specify )</label>
            <input
              type="text"
              name="anyother"
              className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
            />
          </div>
        </div>

        {/* Gender */}
        <div className="flex items-center gap-4">
          <label className="text-sm sm:text-lg xl:text-xl font-medium ml-10">
            ii. Gender :-
          </label>
          <label className="flex items-center space-x-1 sm:space-x-2 xl:space-x-4">
            <input
              type="radio"
              name="gender"
              value="Male"
              className="w-3 h-3 sm:w-[14px] sm:h-[14px] xl:w-[16px] xl:h-[16px] rounded-full accent-[#391031]"
            />
            <span className="text-sm sm:text-base xl:text-lg font-medium">
              Male
            </span>
          </label>
          <label className="flex items-center space-x-1 sm:space-x-2 xl:space-x-4">
            <input
              type="radio"
              name="gender"
              value="Female"
              className="w-3 h-3 sm:w-[14px] sm:h-[14px] xl:w-[16px] xl:h-[16px] rounded-full accent-[#391031]"
            />
            <span className="text-sm sm:text-base xl:text-lg font-medium">
              Female
            </span>
          </label>
        </div>

        {/*civil status*/}
        <div className="flex items-center gap-4">
          <label className="text-sm sm:text-lg xl:text-xl font-medium ml-10">
            iii. Civil Status :-
          </label>
          <label className="flex items-center space-x-1 sm:space-x-2 xl:space-x-4">
            <input
              type="radio"
              name="civilStatus"
              value="Single"
              className="w-3 h-3 sm:w-[14px] sm:h-[14px] xl:w-[16px] xl:h-[16px] rounded-full accent-[#391031]"
            />
            <span className="text-sm sm:text-base xl:text-lg font-medium">
              Single
            </span>
          </label>
          <label className="flex items-center space-x-1 sm:space-x-2 xl:space-x-4">
            <input
              type="radio"
              name="civilStatus"
              value="Married"
              className="w-3 h-3 sm:w-[14px] sm:h-[14px] xl:w-[16px] xl:h-[16px] rounded-full accent-[#391031]"
            />
            <span className="text-sm sm:text-base xl:text-lg font-medium">
              Married
            </span>
          </label>
        </div>
        {/*religion */}
        <div className="flex gap-2 items-center">
          <label className="text-sm sm:text-lg xl:text-xl font-medium ml-10">
            iv. Religion:-
          </label>
          <input
            type="text"
            name="religion"
            className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
          />
        </div>

        <div className="flex flex-row items-center gap-2">
          <label
            htmlFor="dob"
            className="text-sm sm:text-lg xl:text-xl font-medium ml-10"
          >
            v. Date of Birth :-
          </label>
          <input
            type="date"
            name="dob"
            className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
          />
        </div>
        <div className="flex gap-2 items-center">
          <label className="text-sm sm:text-lg xl:text-xl font-medium ml-10">
            vi. Age:-
          </label>
          <input
            type="text"
            name="age"
            className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
          />
        </div>
        {/* Citizenship */}
        <div className="flex items-center gap-4">
          <label className="text-sm sm:text-lg xl:text-xl font-medium ml-10">
            vii. Citizenship :-
          </label>
          <label className="flex items-center space-x-1 sm:space-x-2 xl:space-x-4">
            <input
              type="radio"
              name="citizen"
              value="Sri Lankan"
              className="w-3 h-3 sm:w-[14px] sm:h-[14px] xl:w-[16px] xl:h-[16px] rounded-full accent-[#391031]"
            />
            <span className="text-sm sm:text-base xl:text-lg font-medium">
              Sri Lankan
            </span>
          </label>
          <label className="flex items-center space-x-1 sm:space-x-2 xl:space-x-4">
            <input
              type="radio"
              name="citizen"
              value="Foreigner"
              className="w-3 h-3 sm:w-[14px] sm:h-[14px] xl:w-[16px] xl:h-[16px] rounded-full accent-[#391031]"
            />
            <span className="text-sm sm:text-base xl:text-lg font-medium">
              Foreigner
            </span>
          </label>
        </div>
        <div className="flex gap-2 items-center ml-10">
          <label className="text-xs  ml-1">
            (if foreigner please mention the name of the country)
          </label>
          <input
            type="text"
            name="ifforeigner"
            className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
          />
        </div>
        {/* if srilankan */}
        <div className="flex items-center gap-4 ml-10">
          <label className="text-sm sm:text-lg xl:text-xl font-medium ml-100">
            If Sri Lankan:-
          </label>
          <label className="flex items-center space-x-1 sm:space-x-2 xl:space-x-4">
            <input
              type="radio"
              name="srilankan"
              value="By Descent"
              className="w-3 h-3 sm:w-[14px] sm:h-[14px] xl:w-[16px] xl:h-[16px] rounded-full accent-[#391031]"
            />
            <span className="text-sm sm:text-base xl:text-lg font-medium">
              By Descent
            </span>
          </label>
          <label className="flex items-center space-x-1 sm:space-x-2 xl:space-x-4">
            <input
              type="radio"
              name="srilankan"
              value="By Registration"
              className="w-3 h-3 sm:w-[14px] sm:h-[14px] xl:w-[16px] xl:h-[16px] rounded-full accent-[#391031]"
            />
            <span className="text-sm sm:text-base xl:text-lg font-medium">
              By Registration
            </span>
          </label>
        </div>

        <div className="flex gap-8 mt-2 sm:gap-20 sm:mt-8 justify-end">
          <Link to="/a1-from-part-3">
            <SecondaryButton
              text="Next"
              color="bg-green-700"
              hoverColor="hover:bg-green-800"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default A1Form_Part02;
