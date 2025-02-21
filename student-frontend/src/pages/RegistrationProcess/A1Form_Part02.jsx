{
  /* A1 form part 02*/
}
import React from "react";
import SecondaryButton from "../../components/SecondaryButton";
import { Link } from "react-router-dom";
import { useFormContext } from "../../utils/FormContext";

function A1Form_Part02() {
  const {
    formData,
    updateFormData,
    updateNestedFormData,
    updateFile,
    setFormData,
  } = useFormContext();

  const updateALResult = (subjectKey, field, value) => {
    setFormData((prev) => ({
      ...prev,
      Educational_Qualifications: {
        ...prev.Educational_Qualifications,
        AL_result: {
          ...prev.Educational_Qualifications.AL_result,
          [subjectKey]: {
            ...prev.Educational_Qualifications.AL_result[subjectKey],
            [field]: value,
          },
        },
      },
    }));
  };

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
            type="number"
            name="AL_year"
            value={formData.Educational_Qualifications.AL_year}
            onChange={(e) =>
              updateNestedFormData(
                "Educational_Qualifications",
                "AL_year",
                e.target.value
              )
            }
            className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
          />
        </div>

        {/* Index No of GCE (A/L) Examination */}
        <div className="flex gap-2 items-center">
          <label className="text-sm sm:text-lg xl:text-xl font-medium ml-12">
            ii. Index No of the GCE (A/L) Examination :-
          </label>
          <input
            type="number"
            name="Index_AL"
            value={formData.Educational_Qualifications.Index_AL}
            onChange={(e) =>
              updateNestedFormData(
                "Educational_Qualifications",
                "Index_AL",
                e.target.value
              )
            }
            className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
          />
        </div>

        {/* Average Z Score */}
        <div className="flex gap-2 items-center">
          <label className="text-sm sm:text-lg xl:text-xl font-medium ml-12">
            iii. Average Z Score :-
          </label>
          <input
            type="number"
            name="Zscore"
            value={formData.Educational_Qualifications.Zscore}
            onChange={(e) =>
              updateNestedFormData(
                "Educational_Qualifications",
                "Zscore",
                e.target.value
              )
            }
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
              Subject 1 :-
            </label>
            <input
              type="text"
              name="subject1"
              value={
                formData.Educational_Qualifications.AL_result["Subject1"].Name
              }
              onChange={(e) =>
                updateALResult("Subject1", "Name", e.target.value.toUpperCase())
              }
              className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1 uppercase"
            />
            <label className="text-sm sm:text-lg xl:text-xl font-medium ml-5">
              Result :-
            </label>
            <select
              name="result1"
              value={
                formData.Educational_Qualifications.AL_result["Subject1"].Result
              }
              onChange={(e) =>
                updateALResult(
                  "Subject1",
                  "Result",
                  e.target.value.toUpperCase()
                )
              }
              className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 text-sm sm:text-lg xl:text-2xl py-1"
            >
              <option value=""></option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="S">S</option>
            </select>
          </div>

          <div className="flex gap-2 items-center ml-16">
            <label className="text-sm sm:text-lg xl:text-xl font-medium ml-1">
              Subject 2 :-
            </label>
            <input
              type="text"
              name="subject2"
              value={
                formData.Educational_Qualifications.AL_result["Subject2"].Name
              }
              onChange={(e) =>
                updateALResult("Subject2", "Name", e.target.value.toUpperCase())
              }
              className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1 uppercase"
            />
            <label className="text-sm sm:text-lg xl:text-xl font-medium ml-5">
              Result :-
            </label>
            <select
              name="result2"
              value={
                formData.Educational_Qualifications.AL_result["Subject2"].Result
              }
              onChange={(e) =>
                updateALResult(
                  "Subject2",
                  "Result",
                  e.target.value.toUpperCase()
                )
              }
              className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 text-sm sm:text-lg xl:text-2xl py-1"
            >
              <option value=""></option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="S">S</option>
            </select>
          </div>
          <div className="flex gap-2 items-center ml-16">
            <label className="text-sm sm:text-lg xl:text-xl font-medium ml-1">
              Subject 3 :-
            </label>
            <input
              type="text"
              name="subject3"
              value={
                formData.Educational_Qualifications.AL_result["Subject3"].Name
              }
              onChange={(e) =>
                updateALResult("Subject3", "Name", e.target.value.toUpperCase())
              }
              className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1 uppercase"
            />
            <label className="text-sm sm:text-lg xl:text-xl font-medium ml-5">
              Result :-
            </label>
            <select
              name="result3"
              value={
                formData.Educational_Qualifications.AL_result["Subject3"].Result
              }
              onChange={(e) =>
                updateALResult(
                  "Subject3",
                  "Result",
                  e.target.value.toUpperCase()
                )
              }
              className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 text-sm sm:text-lg xl:text-2xl py-1"
            >
              <option value=""></option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="S">S</option>
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
            {["SINHALA", "TAMIL", "MUSLIM", "OTHERS"].map((race) => (
              <label
                key={race}
                className="flex items-center space-x-1 sm:space-x-2 xl:space-x-4"
              >
                <input
                  type="radio"
                  name="race"
                  value={race}
                  checked={formData.Details_of_Citizen.race === race}
                  onChange={(e) => {
                    if (
                      race === "SINHALA" ||
                      race === "TAMIL" ||
                      race === "MUSLIM"
                    ) {
                      updateNestedFormData("Details_of_Citizen", "PI", "N/A");
                    } else {
                      updateNestedFormData("Details_of_Citizen", "PI", "");
                    }
                    updateNestedFormData(
                      "Details_of_Citizen",
                      "race",
                      e.target.value.toUpperCase()
                    );
                  }}
                  className="w-3 h-3 sm:w-[14px] sm:h-[14px] xl:w-[16px] xl:h-[16px] rounded-full accent-[#391031]"
                />
                <span className="text-sm sm:text-base xl:text-lg font-medium">
                  {race}
                </span>
              </label>
            ))}
          </div>
          {/* if others */}
          <div className="flex gap-2 items-center ml-10">
            <label className="text-xs  ml-1">(PI specify )</label>
            <input
              type="text"
              name="anyother"
              value={formData.Details_of_Citizen.PI}
              onChange={(e) =>
                updateNestedFormData(
                  "Details_of_Citizen",
                  "PI",
                  e.target.value.toUpperCase()
                )
              }
              disabled={formData.Details_of_Citizen.race !== "OTHERS"}
              className={`border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1 uppercase ${
                formData.Details_of_Citizen.race !== "OTHERS"
                  ? "cursor-not-allowed border-gray-400"
                  : ""
              }`}
            />
          </div>
        </div>

        {/* Gender */}
        <div className="flex items-center gap-4">
          <label className="text-sm sm:text-lg xl:text-xl font-medium ml-10">
            ii. Gender :-
          </label>
          {["MALE", "FEMALE"].map((gender) => (
            <label
              key={gender}
              className="flex items-center space-x-1 sm:space-x-2 xl:space-x-4"
            >
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={formData.Details_of_Citizen.gender === gender}
                onChange={(e) =>
                  updateNestedFormData(
                    "Details_of_Citizen",
                    "gender",
                    e.target.value.toUpperCase()
                  )
                }
                className="w-3 h-3 sm:w-[14px] sm:h-[14px] xl:w-[16px] xl:h-[16px] rounded-full accent-[#391031]"
              />
              <span className="text-sm sm:text-base xl:text-lg font-medium">
                {gender}
              </span>
            </label>
          ))}
        </div>

        {/*civil status*/}
        <div className="flex items-center gap-4">
          <label className="text-sm sm:text-lg xl:text-xl font-medium ml-10">
            iii. Civil Status :-
          </label>
          {["SINGLE", "MARRIED"].map((civil_status) => (
            <label
              key={civil_status}
              className="flex items-center space-x-1 sm:space-x-2 xl:space-x-4"
            >
              <input
                type="radio"
                name="civil_status"
                value={civil_status}
                checked={
                  formData.Details_of_Citizen.civil_status === civil_status
                }
                onChange={(e) =>
                  updateNestedFormData(
                    "Details_of_Citizen",
                    "civil_status",
                    e.target.value.toUpperCase()
                  )
                }
                className="w-3 h-3 sm:w-[14px] sm:h-[14px] xl:w-[16px] xl:h-[16px] rounded-full accent-[#391031]"
              />
              <span className="text-sm sm:text-base xl:text-lg font-medium">
                {civil_status}
              </span>
            </label>
          ))}
        </div>
        {/*religion */}
        <div className="flex gap-2 items-center">
          <label className="text-sm sm:text-lg xl:text-xl font-medium ml-10">
            iv. Religion:-
          </label>
          <input
            type="text"
            name="religion"
            value={formData.Details_of_Citizen.religion}
            onChange={(e) =>
              updateNestedFormData(
                "Details_of_Citizen",
                "religion",
                e.target.value.toUpperCase()
              )
            }
            className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1 uppercase"
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
            name="birth_date"
            value={formData.Details_of_Citizen.birth_date}
            onChange={(e) =>
              updateNestedFormData(
                "Details_of_Citizen",
                "birth_date",
                e.target.value.toUpperCase()
              )
            }
            className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
          />
        </div>
        <div className="flex gap-2 items-center">
          <label className="text-sm sm:text-lg xl:text-xl font-medium ml-10">
            vi. Age:-
          </label>
          <input
            type="number"
            name="age"
            value={formData.Details_of_Citizen.age}
            onChange={(e) =>
              updateNestedFormData("Details_of_Citizen", "age", e.target.value)
            }
            className="border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1"
          />
        </div>
        {/* Citizenship */}
        <div className="flex items-center gap-4">
          <label className="text-sm sm:text-lg xl:text-xl font-medium ml-10">
            vii. Citizenship :-
          </label>
          {["SRILANKAN", "FOREIGNER"].map((citizenship) => (
            <label
              key={citizenship}
              className="flex items-center space-x-1 sm:space-x-2 xl:space-x-4"
            >
              <input
                type="radio"
                name="citizenship"
                value={citizenship}
                checked={
                  formData.Details_of_Citizen.citizenship === citizenship
                }
                onChange={(e) => {
                  if (e.target.value === "SRILANKAN") {
                    updateNestedFormData(
                      "Details_of_Citizen",
                      "country",
                      "SRILANKA"
                    );
                    updateNestedFormData(
                      "Details_of_Citizen",
                      "citizenship_from",
                      ""
                    );
                  } else {
                    updateNestedFormData("Details_of_Citizen", "country", "");
                    updateNestedFormData(
                      "Details_of_Citizen",
                      "citizenship_from",
                      "N/A"
                    );
                  }
                  updateNestedFormData(
                    "Details_of_Citizen",
                    "citizenship",
                    e.target.value.toUpperCase()
                  );
                }}
                className="w-3 h-3 sm:w-[14px] sm:h-[14px] xl:w-[16px] xl:h-[16px] rounded-full accent-[#391031]"
              />
              <span className="text-sm sm:text-base xl:text-lg font-medium">
                {citizenship}
              </span>
            </label>
          ))}
        </div>
        <div className="flex gap-2 items-center ml-10">
          <label className="text-xs  ml-1">
            (if foreigner please mention the name of the country)
          </label>
          <input
            type="text"
            name="ifforeigner"
            value={
              formData.Details_of_Citizen.country === "SRILANKA"
                ? ""
                : formData.Details_of_Citizen.country
            }
            onChange={(e) =>
              updateNestedFormData(
                "Details_of_Citizen",
                "country",
                e.target.value.toUpperCase()
              )
            }
            disabled={formData.Details_of_Citizen.citizenship !== "FOREIGNER"}
            className={`border-2 border-black rounded-md focus:outline-1 focus:outline-black px-2 w-[220px] sm:w-[420px] xl:w-[650px] text-sm sm:text-lg xl:text-2xl py-1 uppercase ${
              formData.Details_of_Citizen.citizenship !== "FOREIGNER"
                ? "cursor-not-allowed border-gray-400"
                : ""
            }`}
          />
        </div>
        {/* if srilankan */}
        <div className="flex items-center gap-4 ml-10">
          <label className="text-sm sm:text-lg xl:text-xl font-medium ml-100">
            If Sri Lankan:-
          </label>
          {["BY DESCENT", "BY REGISTRATION"].map((citizenship_from) => (
            <label
              key={citizenship_from}
              className="flex items-center space-x-1 sm:space-x-2 xl:space-x-4"
            >
              <input
                type="radio"
                name="citizenship_from"
                disabled={
                  formData.Details_of_Citizen.citizenship !== "SRILANKAN"
                }
                value={
                  formData.Details_of_Citizen.citizenship === "SRILANKAN"
                    ? citizenship_from
                    : ""
                }
                checked={
                  formData.Details_of_Citizen.citizenship_from ===
                  citizenship_from
                }
                onChange={(e) =>
                  updateNestedFormData(
                    "Details_of_Citizen",
                    "citizenship_from",
                    e.target.value.toUpperCase()
                  )
                }
                className="w-3 h-3 sm:w-[14px] sm:h-[14px] xl:w-[16px] xl:h-[16px] rounded-full accent-[#391031]"
              />
              <span className="text-sm sm:text-base xl:text-lg font-medium">
                {citizenship_from}
              </span>
            </label>
          ))}
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
