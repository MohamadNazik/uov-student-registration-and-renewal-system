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

  const [documentURLs, setDocumentURLs] = useState(() => {
    const savedURLs = sessionStorage.getItem("documentURLs");
    return savedURLs ? JSON.parse(savedURLs) : {};
  });

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

  // Load files and documentURLs from IndexedDB and sessionStorage on first render
  useEffect(() => {
    const loadFiles = async () => {
      const db = await dbPromise;
      const updatedFiles = {
        profile_photo: null,
        signature: null,
        Documents: {},
      };
      const updatedURLs = {};

      // Load profile photo and signature from IndexedDB
      updatedFiles.profile_photo = await db.get("files", "profile_photo");
      updatedFiles.signature = await db.get("files", "signature");

      // Load all document files from IndexedDB
      const documentKeys = Object.keys(formData.Documents || {});
      for (const key of documentKeys) {
        const file = await db.get("files", key);
        updatedFiles.Documents[key] = file;

        // If file exists, generate object URL and store in state + sessionStorage
        if (file) {
          const fileURL = URL.createObjectURL(file);
          updatedURLs[key] = fileURL;
        }
      }

      // Merge the loaded files into formData
      setFormData((prev) => ({
        ...prev,
        ...updatedFiles,
        Documents: {
          ...prev.Documents,
          ...updatedFiles.Documents,
        },
      }));

      // Update documentURLs state & store in sessionStorage
      setDocumentURLs((prev) => ({ ...prev, ...updatedURLs }));
      sessionStorage.setItem(
        "documentURLs",
        JSON.stringify({ ...prev, ...updatedURLs })
      );
    };

    loadFiles();
  }, []); // ✅ Runs only once when the component mounts

  // Automatically clear session and files after 90 minutes
  useEffect(() => {
    const timeout = setTimeout(async () => {
      sessionStorage.removeItem("formData");
      sessionStorage.removeItem("documentURLs"); // Clear documentURLs from sessionStorage
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

  // Save document files separately and persist in sessionStorage
  const updateDocumentFile = async (docName, file) => {
    const db = await dbPromise;

    // Save the file to IndexedDB
    await db.put("files", file, docName);

    // Update formData state
    setFormData((prev) => ({
      ...prev,
      Documents: {
        ...prev.Documents,
        [docName]: file,
      },
    }));

    // If the file is valid, create a URL and update documentURLs state
    if (file) {
      const fileURL = URL.createObjectURL(file);

      // Update the documentURLs state with the generated URL
      setDocumentURLs((prev) => {
        const updated = { ...prev, [docName]: fileURL };
        // Store documentURLs in sessionStorage
        sessionStorage.setItem("documentURLs", JSON.stringify(updated));
        return updated;
      });
    } else {
      // If the file is null (for document deletion), remove from the URLs state
      setDocumentURLs((prev) => {
        const updated = { ...prev };
        delete updated[docName];
        sessionStorage.setItem("documentURLs", JSON.stringify(updated));
        return updated;
      });
    }
  };

  console.log(formData);

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        updateNestedFormData,
        updateFile,
        updateDocumentFile,
        setFormData,
        documentURLs,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
