import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SecondaryButton from "../../components/SecondaryButton";
import { useFormContext } from "../../utils/FormContext";

function A1Form_Part03() {
  const { formData, updateNestedFormData } = useFormContext();
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

  useEffect(() => {
    const handleNextButton = () => {
      if (
        formData.Details_of_Parents_or_Guardians.Name === "" ||
        formData.Details_of_Parents_or_Guardians.Occupation === "" ||
        formData.Details_of_Parents_or_Guardians.Phone_Number === "" ||
        formData.Emergency_Person.Name === "" ||
        formData.Emergency_Person.Relationship === "" ||
        formData.Emergency_Person.Address === "" ||
        formData.Emergency_Person.Phone_Number === ""
      ) {
        setNextButtonDisabled(true);
      } else {
        setNextButtonDisabled(false);
      }
    };
    handleNextButton();
  }, [formData]);
  return (
    <>
      <div className="bg-white m-2 sm:m-5 xl:m-8 p-4 sm:p-7 xl:p-10 rounded-lg flex flex-col gap-5">
        <form className="flex flex-col gap-5">
          {/* Details of the parents/Guardians  */}
          <div className="flex flex-wrap gap-2 justify-between items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
            <label className="text-lg sm:text-xl xl:text-2xl font-bold uppercase">
              6. Details of the Parents/Guardians :-
            </label>
          </div>

          <div className="flex flex-col gap-2 sm:gap-4 ml-8">
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[288px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-xl font-medium ml-10">
                (i). Name :-
              </label>
              <input
                type="text"
                name="Name"
                value={formData.Details_of_Parents_or_Guardians.Name}
                onChange={(e) =>
                  updateNestedFormData(
                    "Details_of_Parents_or_Guardians",
                    "Name",
                    e.target.value.toUpperCase()
                  )
                }
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[825px] text-sm sm:text-lg xl:text-2xl py-1 uppercase"
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-xl font-medium ml-10">
                (ii). Occuption :-
              </label>
              <input
                type="text"
                name="Occuption"
                value={formData.Details_of_Parents_or_Guardians.Occupation}
                onChange={(e) =>
                  updateNestedFormData(
                    "Details_of_Parents_or_Guardians",
                    "Occupation",
                    e.target.value.toUpperCase()
                  )
                }
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1 uppercase"
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-xl font-medium ml-10">
                (iii). Address of the Place Work :-
              </label>
              <input
                type="text"
                name="Work_Place_Address"
                value={
                  formData.Details_of_Parents_or_Guardians.Work_Place_Address
                }
                onChange={(e) =>
                  updateNestedFormData(
                    "Details_of_Parents_or_Guardians",
                    "Work_Place_Address",
                    e.target.value.toUpperCase()
                  )
                }
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1 uppercase"
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-xl font-medium ml-10">
                (iv). Telephone No :-
              </label>
              <input
                type="number"
                name="Phone_Number"
                value={formData.Details_of_Parents_or_Guardians.Phone_Number}
                onChange={(e) =>
                  updateNestedFormData(
                    "Details_of_Parents_or_Guardians",
                    "Phone_Number",
                    e.target.value
                  )
                }
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>
          </div>

          {/* Details of the person To be Informed in case Of emergency   */}
          <div className="flex flex-wrap gap-2 justify-between items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
            <label className="text-lg sm:text-xl xl:text-2xl font-bold uppercase">
              7. Details of the Person To be Informed in Case Of Emergency :-
            </label>
          </div>

          <div className="flex flex-col gap-2 sm:gap-4 ml-8">
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[288px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-xl font-medium ml-10">
                (i). Name :-
              </label>
              <input
                type="text"
                name="Name"
                value={formData.Emergency_Person.Name}
                onChange={(e) =>
                  updateNestedFormData(
                    "Emergency_Person",
                    "Name",
                    e.target.value.toUpperCase()
                  )
                }
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1 uppercase"
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-xl font-medium ml-10">
                (ii). Relationship:-
              </label>
              <input
                type="text"
                name="Relationship"
                value={formData.Emergency_Person.Relationship}
                onChange={(e) =>
                  updateNestedFormData(
                    "Emergency_Person",
                    "Relationship",
                    e.target.value.toUpperCase()
                  )
                }
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1 uppercase"
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-xl font-medium ml-10">
                (iii). Address :-
              </label>
              <input
                type="text"
                name="Address"
                value={formData.Emergency_Person.Address}
                onChange={(e) =>
                  updateNestedFormData(
                    "Emergency_Person",
                    "Address",
                    e.target.value.toUpperCase()
                  )
                }
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1 uppercase"
              />
            </div>
            <div className="flex flex-wrap gap-2 xl:gap-4 items-center w-[255px] sm:w-[673px] xl:w-[1115px]">
              <label className="text-sm sm:text-lg xl:text-xl font-medium ml-10">
                (iv). Contact No :-
              </label>
              <input
                type="number"
                name="Phone_Number"
                value={formData.Emergency_Person.Phone_Number}
                onChange={(e) =>
                  updateNestedFormData(
                    "Emergency_Person",
                    "Phone_Number",
                    e.target.value
                  )
                }
                className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
              />
            </div>
          </div>
        </form>
        {/* Next Button */}
        <div className="flex gap-8 mt-2 sm:gap-20 sm:mt-8 justify-end">
          <Link to="/upload-documents">
            <SecondaryButton
              text="Next"
              color="bg-green-700"
              hoverColor="hover:bg-green-800"
              isDisabled={nextButtonDisabled}
            />
          </Link>
        </div>
      </div>
    </>
  );
}

export default A1Form_Part03;
