import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SecondaryButton from "../../components/SecondaryButton";
import StudentIDCard from "../../components/StudentIDCard";
import { useFormContext } from "../../utils/FormContext";
import axios from "axios";
import { openDB } from "idb";

function VerifyID() {
  const { formData } = useFormContext();
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

  useEffect(() => {
    const checkDocuments = () => {
      if (
        formData.Documents &&
        Object.entries(formData.Documents).length === 0
      ) {
        navigate("/upload-documents");
      }
    };

    checkDocuments();
  }, [formData.Documents]);

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

      const response = await axios.post(
        "http://localhost:8080/api/users/add-student",
        submissionData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        await clearIndexedDBFiles();

        sessionStorage.removeItem("formData");
        localStorage.removeItem("student");
        localStorage.removeItem("regDetails");

        navigate("/reg-success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-10">
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
  );
}

export default VerifyID;
