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
        Subject1: { Name: "", result: "" },
        Subject2: { Name: "", result: "" },
        Subject3: { Name: "", result: "" },
      },
    },
    Details_of_Citizen: {
      race: "",
      gender: "",
      civil_status: "",
      religion: "",
      nationality: "",
      birth_date: "",
    },
    Details_of_Parents: {
      Name_of_Parents: "",
      Occupation: "",
      Address: "",
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
      value={{ formData, updateFormData, updateNestedFormData, updateFile }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
