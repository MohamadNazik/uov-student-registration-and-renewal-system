import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    Enrollment_Number: "",
    Title: "",
    Name_with_Initials: "",
    Name_denoted_by_Initials: "",
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
  });

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
