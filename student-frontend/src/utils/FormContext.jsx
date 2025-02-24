import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    // Load form data from sessionStorage (if available)
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
            Divional_Secretarial: "",
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

  // Save data to sessionStorage whenever formData changes
  useEffect(() => {
    sessionStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      sessionStorage.removeItem("formData");
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

  console.log(formData);

  // Function to update text inputs
  const updateFormData = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to update nested objects like Address
  const updateNestedFormData = (parent, name, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [name]: value,
      },
    }));
  };

  // Function to handle file uploads
  const updateFile = (name, file) => {
    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        updateNestedFormData,
        updateFile,
        setFormData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
