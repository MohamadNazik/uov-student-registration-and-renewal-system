import React, { useState } from "react";
import uov_logo from "../../assets/uov_logo.png";
import upload_area from "../../assets/upload_image.jpg";
import { Link } from "react-router-dom";
import SecondaryButton from "../../components/SecondaryButton";
import { useFormContext } from "../../utils/FormContext";

function A1Form_Part01() {
  const { formData, updateFormData, updateFile, updateNestedFormData } =
    useFormContext();
  const [stImage, setStImage] = useState(false);

  const provinces = [
    "Central Province",
    "Eastern Province",
    "North Central Province",
    "Northern Province",
    "North Western Province",
    "Sabaragamuwa Province",
    "Southern Province",
    "Uva Province",
    "Western Province",
  ];
  const districts = [
    "Ampara",
    "Anuradhapura",
    "Badulla",
    "Batticaloa",
    "Colombo",
    "Galle",
    "Gampaha",
    "Hambantota",
    "Jaffna",
    "Kalutara",
    "Kandy",
    "Kegalle",
    "Kilinochchi",
    "Kurunegala",
    "Mannar",
    "Matale",
    "Matara",
    "Monaragala",
    "Mullaitivu",
    "Nuwara Eliya",
    "Polonnaruwa",
    "Puttalam",
    "Ratnapura",
    "Trincomalee",
    "Vavuniya",
  ];

  const profilePhotoHandle = (e) => {
    setStImage(e.target.files[0]);
    updateFile("profile_photo", e.target.files[0]);
  };

  return (
    <>
      <div className="bg-white md:block sm:flex m-2 sm:m-5 xl:ml-8 p-2 sm:p-7 xl:p-10 shadow-md rounded-lg  justify-center">
        <div className=" flex text-left items-center  h-screenitems-center text-sm md:text-lg border border-black rounded-sm focus:outline-1 xl:ml-20 focus:outline-black  px-2 py-1 w-[200px] h-[25px] md:w-[300px] mb-4 sm:mb-6 justify-center font-bold">
          A<sub>1</sub> &nbsp;- Enrollment Form
        </div>
        <header className="mb-4 sm:flex block justify-between sm:mb-10">
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
          {/* <img
            src={Y_Image}
            alt="your Image"
            className="w-[50px] sm:w-[120px] md:h-[130px] mx-auto mb-2 mt-2 md:mt-0 border border-black rounded-lg"
          /> */}
          <label className="w-[100px] sm:w-[120px] md:h-[130px] mx-auto mb-2 mt-2 flex flex-col items-center">
            <span>Your Image</span>
            <label htmlFor="image-input">
              <img
                src={stImage ? URL.createObjectURL(stImage) : upload_area}
                alt="your Image"
                className={`w-[50px] sm:w-[120px] md:h-[130px] mx-auto mb-2 mt-2 md:mt-0 border border-black rounded-lg ${
                  stImage ? "object-contain" : ""
                }`}
              />
            </label>
            <input
              onChange={(e) => profilePhotoHandle(e)}
              type="file"
              id="image-input"
              hidden
            />
          </label>
        </header>

        <form className="flex flex-col items-center gap-5">
          {/* Enrollment Number */}
          <div className="flex flex-wrap gap-2 justify-between items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
            <label className="text-lg sm:text-xl xl:text-2xl font-bold uppercase">
              1. Enrollment No :-
            </label>
            <input
              type="text"
              name="Enrollment_Number"
              value={formData.Enrollment_Number}
              onChange={(e) =>
                updateFormData(
                  "Enrollment_Number",
                  e.target.value.toUpperCase()
                )
              }
              className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[825px] text-sm sm:text-lg xl:text-2xl py-1 uppercase"
            />
          </div>

          {/* Name */}

          <div className="flex flex-wrap gap-2 justify-between items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
            <label className="text-lg sm:text-xl xl:text-2xl font-bold uppercase">
              2. Name :-
            </label>
          </div>

          <div className="flex flex-col gap-2 sm:gap-4 ml-8">
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-xl font-medium ml-12">
                (i). Title :-
              </label>
              <div className="flex gap-2 sm:gap-7 ml-9">
                {["Rev", "Mr", "Mrs", "Miss", "Other"].map((title) => (
                  <label
                    key={title}
                    className="flex items-center space-x-1 sm:space-x-2 xl:space-x-4"
                  >
                    <input
                      type="radio"
                      name="Title"
                      value={title}
                      checked={formData.Title === title}
                      onChange={(e) => {
                        updateFormData("Title", e.target.value);
                        updateFormData("OtherTitle", "");
                      }}
                      className="w-3 h-3 sm:w-[14px] sm:h-[14px] xl:w-[16px] xl:h-[16px] rounded-full accent-[#391031]"
                    />
                    <span className="text-sm sm:text-base xl:text-lg font-medium">
                      {title}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[288px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-xl font-medium ml-12">
                (Other Please specify)
              </label>
              <input
                type="text"
                name="OtherTitle"
                value={formData.Title === "Other" ? formData.OtherTitle : ""}
                onChange={(e) => updateFormData("OtherTitle", e.target.value)}
                disabled={formData.Title !== "Other"}
                className={`border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1 uppercase ${
                  formData.Title !== "Other"
                    ? "cursor-not-allowed border-gray-400"
                    : ""
                }`}
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[288px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-xl font-medium ml-12">
                (ii). Name with Initials :-
              </label>
              <input
                type="text"
                name="Name_with_Initials"
                value={formData.Name_with_Initials}
                onChange={(e) =>
                  updateFormData(
                    "Name_with_Initials",
                    e.target.value.toUpperCase()
                  )
                }
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[825px] text-sm sm:text-lg xl:text-2xl py-1 uppercase"
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-xl font-medium ml-12">
                (iii). Name denoted by Initials :-
              </label>
              <input
                type="text"
                name="Name_denoted_by_Initials"
                value={formData.Name_denoted_by_Initials}
                onChange={(e) =>
                  updateFormData(
                    "Name_denoted_by_Initials",
                    e.target.value.toUpperCase()
                  )
                }
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1 uppercase"
              />
            </div>
          </div>
          {/* Address */}
          <div className="flex flex-wrap gap-2 justify-between items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
            <label className="text-lg sm:text-xl xl:text-2xl font-bold uppercase">
              3. Address :-
            </label>
          </div>

          <div className="flex flex-col gap-2 sm:gap-4 ml-8">
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[288px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-xl font-medium ml-12">
                (i). Permanent Address :-
              </label>
              <textarea
                type="text"
                name="Permenant_Address"
                value={formData.Address.Permenant_Address}
                rows={3}
                onChange={(e) =>
                  updateNestedFormData(
                    "Address",
                    "Permenant_Address",
                    e.target.value.toUpperCase()
                  )
                }
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[825px] text-sm sm:text-lg xl:text-2xl py-1 uppercase"
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-xl font-medium ml-12">
                (ii). Province :-
              </label>
              {/* <input
                type="text"
                name="province"
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
              /> */}
              <select
                name="Province"
                value={formData.Address.Province}
                onChange={(e) =>
                  updateNestedFormData(
                    "Address",
                    "Province",
                    e.target.value.toUpperCase()
                  )
                }
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[220px] xl:w-[350px] text-sm sm:text-md xl:text-xl py-1 uppercase"
              >
                <option value="">Select a province</option>
                {provinces.map((province, index) => (
                  <option key={index} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-xl font-medium ml-12">
                (ii). District :-
              </label>
              {/* <input
                type="text"
                name="district"
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
              /> */}
              <select
                name="District"
                value={formData.Address.District}
                onChange={(e) =>
                  updateNestedFormData(
                    "Address",
                    "District",
                    e.target.value.toUpperCase()
                  )
                }
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[220px] xl:w-[350px] text-sm sm:text-md xl:text-xl py-1 uppercase"
              >
                <option value="">Select a district</option>
                {districts.map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-xl font-medium ml-12">
                (iii). Divisional Secretariat :-
              </label>
              <input
                type="text"
                name="Divional_Secretarial"
                value={formData.Address.Divional_Secretarial}
                onChange={(e) =>
                  updateNestedFormData(
                    "Address",
                    "Divional_Secretarial",
                    e.target.value.toUpperCase()
                  )
                }
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1 uppercase"
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-xl font-medium ml-12">
                (iv). National Identity Card No :-
              </label>
              <input
                type="text"
                name="NIC"
                value={formData.Address.NIC}
                onChange={(e) =>
                  updateNestedFormData(
                    "Address",
                    "NIC",
                    e.target.value.toUpperCase()
                  )
                }
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1 uppercase"
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-xl font-medium ml-12">
                (v). Mobile No :-
              </label>
              <input
                type="number"
                name="Phone_Number"
                value={formData.Address.Phone_Number}
                onChange={(e) =>
                  updateNestedFormData(
                    "Address",
                    "Phone_Number",
                    e.target.value
                  )
                }
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-xl font-medium ml-12">
                (vi). Email Address :-
              </label>
              <input
                type="text"
                name="Email"
                value={formData.Address.Email}
                onChange={(e) =>
                  updateNestedFormData(
                    "Address",
                    "Email",
                    e.target.value.toLowerCase()
                  )
                }
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1 lowercase"
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
