import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RenewalContext = createContext();

export const RenewalProvider = ({ children }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    const savedData = sessionStorage.getItem("formData");
    return savedData
      ? JSON.parse(savedData)
      : {
          specialization: "",
          present_address: "",
          receipt_number: "",
          submission_date: "",
          payment_date: "",
          receipt: null,
        };
  });

  useEffect(() => {
    sessionStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  // Automatically clear session and files after 90 minutes
  useEffect(() => {
    const timeout = setTimeout(async () => {
      sessionStorage.removeItem("formData");

      setFormData({
        specialization: "",
        present_address: "",
        receipt_number: "",
        submission_date: "",
        payment_date: "",
        receipt: null,
      });

      alert("Session expired! Please restart the renewal process.");
      navigate("/user-dashboard");
    }, 15 * 60 * 1000); // 15 minutes

    return () => clearTimeout(timeout);
  }, [navigate]);

  // Update text inputs
  const updateFormData = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateFile = async (name, file) => {
    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  // console.log(formData);

  return (
    <RenewalContext.Provider
      value={{
        formData,
        updateFormData,
        updateFile,
        setFormData,
      }}
    >
      {children}
    </RenewalContext.Provider>
  );
};

export const useRenewalContext = () => useContext(RenewalContext);
