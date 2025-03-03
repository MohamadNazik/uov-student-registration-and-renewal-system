import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SecondaryButton from "../../components/SecondaryButton";
import StudentIDCard from "../../components/StudentIDCard";
import { useFormContext } from "../../utils/FormContext";
import axios from "axios";
import { openDB } from "idb";
import Loading from "../../components/Loading";

function VerifyID() {
  const dbPromise = openDB("fileDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("files")) {
        db.createObjectStore("files");
      }
    },
  });
  const { formData } = useFormContext();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // console.log(formData);
  const clearIndexedDBFiles = async () => {
    const dbName = "fileDB";
    const db = await openDB(dbName, 1);

    if (!db.objectStoreNames.contains("files")) {
      console.warn("No 'files' store found in IndexedDB.");
      return;
    }

    const tx = db.transaction("files", "readwrite");
    const store = tx.objectStore("files");

    const clearRequest = store.clear();

    clearRequest.onsuccess = () => {
      console.log("All files cleared from IndexedDB 'files' store.");
    };

    clearRequest.onerror = (event) => {
      console.error("Error clearing IndexedDB files:", event.target.error);
    };
  };

  console.log(formData);

  useEffect(() => {
    const loadFiles = async () => {
      const db = await dbPromise;
      const ugcLtrFile = await db.get("files", "UGC_Letter");
      if (!ugcLtrFile) {
        navigate("/a1-from-part-1");
      }

      const bcFile = await db.get("files", "BC");
      if (!bcFile) {
        navigate("/a1-from-part-1");
      }

      const nicFile = await db.get("files", "NIC");
      if (!nicFile) {
        navigate("/a1-from-part-1");
      }

      const olFile = await db.get("files", "OL");
      if (!olFile) {
        navigate("/a1-from-part-1");
      }

      const alFile = await db.get("files", "AL");
      if (!alFile) {
        navigate("/a1-from-part-1");
      }

      const a3File = await db.get("files", "A3");
      if (!a3File) {
        navigate("/a1-from-part-1");
      }

      const a4File = await db.get("files", "A4");
      if (!a4File) {
        navigate("/a1-from-part-1");
      }

      const a5File = await db.get("files", "A5");
      if (!a5File) {
        navigate("/a1-from-part-1");
      }

      const a6File = await db.get("files", "A6");
      if (!a6File) {
        navigate("/a1-from-part-1");
      }

      const attestationFile = await db.get("files", "Attestation");
      if (!attestationFile) {
        navigate("/a1-from-part-1");
      }

      const storedProfile = await db.get("files", "profile_photo");
      if (!storedProfile) {
        navigate("/a1-from-part-1");
      }

      const storedSignature = await db.get("files", "signature");
      if (!storedSignature) {
        navigate("/a1-from-part-1");
      }
    };

    if (
      formData.Enrollment_Number === "" ||
      formData.Name_with_Initials === "" ||
      formData.Name_denoted_by_Initials === "" ||
      formData.Address.Permenant_Address === "" ||
      formData.Address.Province === "" ||
      formData.Address.District === "" ||
      formData.Address.Divisional_Secretarial === "" ||
      formData.Address.NIC === "" ||
      formData.Address.Phone_Number === "" ||
      formData.Address.Email === "" ||
      formData.Title === "" ||
      formData.Educational_Qualifications.AL_year === "" ||
      formData.Educational_Qualifications.Index_AL === "" ||
      formData.Educational_Qualifications.Zscore === "" ||
      formData.Educational_Qualifications.AL_result.Subject1.Name === "" ||
      formData.Educational_Qualifications.AL_result.Subject1.Result === "" ||
      formData.Educational_Qualifications.AL_result.Subject2.Name === "" ||
      formData.Educational_Qualifications.AL_result.Subject2.Result === "" ||
      formData.Educational_Qualifications.AL_result.Subject3.Name === "" ||
      formData.Educational_Qualifications.AL_result.Subject3.Result === "" ||
      formData.Details_of_Citizen.race === "" ||
      formData.Details_of_Citizen.PI === "" ||
      formData.Details_of_Citizen.country === "" ||
      formData.Details_of_Citizen.gender === "" ||
      formData.Details_of_Citizen.civil_status === "" ||
      formData.Details_of_Citizen.religion === "" ||
      formData.Details_of_Citizen.birth_date === "" ||
      formData.Details_of_Citizen.age === "" ||
      formData.Details_of_Citizen.citizenship === "" ||
      formData.Details_of_Parents_or_Guardians.Name === "" ||
      formData.Details_of_Parents_or_Guardians.Occupation === "" ||
      formData.Details_of_Parents_or_Guardians.Phone_Number === "" ||
      formData.Emergency_Person.Name === "" ||
      formData.Emergency_Person.Relationship === "" ||
      formData.Emergency_Person.Address === "" ||
      formData.Emergency_Person.Phone_Number === ""
    ) {
      navigate("/a1-from-part-1");
    } else if (formData.Details_of_Citizen.citizenship === "SRILANKAN") {
      if (formData.Details_of_Citizen.citizenship_from === "") {
        navigate("/a1-from-part-1");
      }
    }
    loadFiles();
  }, []);

  const handleSubmit = async () => {
    try {
      const submissionData = new FormData();
      // Append simple fields
      Object.entries(formData).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          submissionData.append(key, JSON.stringify(value)); // Convert nested objects to JSON
        } else {
          submissionData.append(key, value);
        }
      });
      // Append files
      if (formData.Documents) {
        Object.entries(formData.Documents).forEach(([key, file]) => {
          if (file) submissionData.append(key, file);
        });
      }
      if (formData.profile_photo)
        submissionData.append("profile_photo", formData.profile_photo);
      if (formData.signature)
        submissionData.append("signature", formData.signature);
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/users/add-student",
        submissionData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.success) {
        await clearIndexedDBFiles();
        setIsLoading(false);
        sessionStorage.removeItem("formData");
        localStorage.removeItem("student");
        localStorage.removeItem("regDetails");
        navigate("/reg-success");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mb-10 h-full">
        <div className="bg-white md:block sm:flex m-2 sm:m-5 xl:ml-8 p-2 sm:p-7 xl:p-10 shadow-md rounded-lg justify-center">
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
        {isLoading && <Loading />}

        {/* student id */}
        <div className="flex w-full justify-center py-5 xl:py-16">
          <StudentIDCard
            image={formData.profile_photo}
            Name_with_Initials={formData.Name_with_Initials}
            Enrollment_Number={formData.Enrollment_Number}
            Address={formData.Address.Permenant_Address}
            NIC={formData.Address.NIC}
            Enrollment_Date={formData.Enrollment_Date}
            Date_of_Issue={formData.ID_IssueDate}
            Acedamic_Year={formData.AcademicYear}
            stSignature={formData.signature}
          />
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
          <SecondaryButton
            text="Correct & Submit"
            color="bg-green-700"
            hoverColor="hover:bg-green-800"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
}

export default VerifyID;
