
import React, { useState } from "react";
import uov_logo from "../../assets/uov_logo.png";
import upload_area from "../../assets/upload_image.jpg";
import { Link } from "react-router-dom";
import SecondaryButton from "../../components/SecondaryButton";
import { useFormContext } from "../../utils/FormContext";

function A1Form_Part03() {
  const { formData, updateFormData } = useFormContext();
  const [stImage, setStImage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  console.log(formData);

  return (
    <>
      <div className="bg-white md:block sm:flex m-2 sm:m-5 xl:ml-8 p-2 sm:p-7 xl:p-10 shadow-md rounded-lg  justify-center">
        <form className="flex flex-col items-center gap-5">
          {/* Details of the parents/Guardians  */}
         <div className="flex flex-wrap gap-2 justify-between items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
            <label className="text-sm sm:text-lg xl:text-2xl font-medium uppercase">
              6. Details of the parents/Guardians :-
            </label>
          </div>

          <div className="flex flex-col gap-2 sm:gap-4 ml-8">
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[288px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                (i). Name :-
              </label>
              <input
                type="text"
                name="name"
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[825px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                (ii). Occuption :-
              </label>
              <input
                type="text"
                name="Occuption"
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                (iii). Address of the Place Work :-
              </label>
              <input
                type="text"
                name="address_of_the_place_work"
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                (iv). Telephone No :-
              </label>
              <input
                type="number"
                name="telephone_no"
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>
          </div>
         
         {/* Details of the person To be Informed in case Of emergency   */}
          <div className="flex flex-wrap gap-2 justify-between items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
            <label className="text-sm sm:text-lg xl:text-2xl font-medium uppercase">
              7. Details of the Person To be Informed in Case Of Emergency :-
            </label>
          </div>

          <div className="flex flex-col gap-2 sm:gap-4 ml-8">
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[288px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                (i). Name :-
              </label>
              <input
                type="text"
                name="r_name"
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                (ii). Relationship:-
              </label>
              <input
                type="text"
                name="relationship"
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                (iii). Address :-
              </label>
              <input
                type="text"
                name="r_address"
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-2xl font-medium">
                (iv). Contact No :-
              </label>
              <input
                type="text"
                name="contact_no"
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>
          </div>
        </form>
        {/* Next Button */}
        <div className="flex gap-8 mt-2 sm:gap-20 sm:mt-8 justify-end">
          <Link to="/alreadyregsubmitted">
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

export default A1Form_Part03;
