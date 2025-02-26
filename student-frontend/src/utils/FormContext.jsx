import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { openDB } from "idb";

const FormContext = createContext();

// Initialize IndexedDB for file storage
const dbPromise = openDB("fileDB", 1, {
  upgrade(db) {
    db.createObjectStore("files");
  },
});

export const FormProvider = ({ children }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    const savedData = sessionStorage.getItem("formData");
    return savedData
      ? JSON.parse(savedData)
      : {
          Enrollment_Number: "",
          Title: "",
          Name_with_Initials: "",
          Name_denoted_by_Initials: "",
          Enrollment_Date: "",
          ID_IssueDate: "",
          AcademicYear: "",
          Address: {
            Permenant_Address: "",
            Province: "",
            District: "",
            Divisional_Secretarial: "",
            NIC: "",
            Phone_Number: "",
            Email: "",
          },
          Educational_Qualifications: {
            AL_year: "",
            Index_AL: "",
            Zscore: "",
            AL_result: {
              Subject1: { Name: "", Result: "" },
              Subject2: { Name: "", Result: "" },
              Subject3: { Name: "", Result: "" },
            },
          },
          Details_of_Citizen: {
            race: "",
            gender: "",
            civil_status: "",
            religion: "",
            birth_date: "",
            age: "",
            citizenship: "",
            country: "",
            citizenship_from: "",
            PI: "",
          },
          Details_of_Parents_or_Guardians: {
            Name: "",
            Occupation: "",
            Work_Place_Address: "",
            Phone_Number: "",
          },
          Emergency_Person: {
            Name: "",
            Relationship: "",
            Phone_Number: "",
            Address: "",
          },
          profile_photo: null,
          signature: null,
          Documents: {
            UGC_Letter: null,
            BC: null,
            NIC: null,
            OL: null,
            AL: null,
            A3: null,
            A4: null,
            A5: null,
            A6: null,
            Attestation: null,
          },
        };
  });

  // Save form data (excluding files) to sessionStorage whenever it changes
  useEffect(() => {
    const { profile_photo, signature, Documents, ...rest } = formData;
    sessionStorage.setItem("formData", JSON.stringify(rest));
  }, [formData]);

  // Load files from IndexedDB on first render
  useEffect(() => {
    const loadFiles = async () => {
      const db = await dbPromise;
      const updatedFiles = {
        profile_photo: null,
        signature: null,
        Documents: {},
      };

      // Load profile photo and signature
      updatedFiles.profile_photo = await db.get("files", "profile_photo");
      updatedFiles.signature = await db.get("files", "signature");

      // Load all documents
      const documentKeys = Object.keys(formData.Documents);
      for (const key of documentKeys) {
        updatedFiles.Documents[key] = await db.get("files", key);
      }

      setFormData((prev) => ({
        ...prev,
        ...updatedFiles,
      }));
    };

    loadFiles();
  }, []);

  // Automatically clear session and files after 90 minutes
  useEffect(() => {
    const timeout = setTimeout(async () => {
      sessionStorage.removeItem("formData");
      const db = await dbPromise;
      await db.clear("files"); // Remove all stored files

      setFormData({
        Enrollment_Number: "",
        Title: "",
        Name_with_Initials: "",
        Name_denoted_by_Initials: "",
        Enrollment_Date: "",
        ID_IssueDate: "",
        AcademicYear: "",
        Address: {
          Permenant_Address: "",
          Province: "",
          District: "",
          Divisional_Secretarial: "",
          NIC: "",
          Phone_Number: "",
          Email: "",
        },
        Educational_Qualifications: {
          AL_year: "",
          Index_AL: "",
          Zscore: "",
          AL_result: {
            Subject1: { Name: "", Result: "" },
            Subject2: { Name: "", Result: "" },
            Subject3: { Name: "", Result: "" },
          },
        },
        Details_of_Citizen: {
          race: "",
          gender: "",
          civil_status: "",
          religion: "",
          birth_date: "",
          age: "",
          citizenship: "",
          country: "",
          citizenship_from: "",
          PI: "",
        },
        Details_of_Parents_or_Guardians: {
          Name: "",
          Occupation: "",
          Work_Place_Address: "",
          Phone_Number: "",
        },
        Emergency_Person: {
          Name: "",
          Relationship: "",
          Phone_Number: "",
          Address: "",
        },
        profile_photo: null,
        signature: null,
        Documents: {
          UGC_Letter: null,
          BC: null,
          NIC: null,
          OL: null,
          AL: null,
          A3: null,
          A4: null,
          A5: null,
          A6: null,
          Attestation: null,
        },
      });

      alert("Session expired! Please restart the form.");
      navigate("/instructions");
    }, 90 * 60 * 1000); // 90 minutes

    return () => clearTimeout(timeout);
  }, [navigate]);

  // Update text inputs
  const updateFormData = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update nested fields
  const updateNestedFormData = (parent, name, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [name]: value,
      },
    }));
  };

  // Save files to IndexedDB
  const updateFile = async (name, file) => {
    const db = await dbPromise;
    await db.put("files", file, name);

    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  // Save document files separately
  const updateDocumentFile = async (docName, file) => {
    const db = await dbPromise;
    await db.put("files", file, docName);

    setFormData((prev) => ({
      ...prev,
      Documents: {
        ...prev.Documents,
        [docName]: file,
      },
    }));
  };

  console.log(formData.profile_photo);
  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        updateNestedFormData,
        updateFile,
        updateDocumentFile,
        setFormData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
