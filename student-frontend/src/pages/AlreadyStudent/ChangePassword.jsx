import React, { useEffect, useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import Loading from "../../components/Loading";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function ChangePassword() {
  const [submisstionData, setSubmissionData] = useState({
    Enrollment_Number: "",
    permanent_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [isOldPassVisible, setIsOldPassVisible] = useState(false);
  const [isNewPassVisible, setIsNewPassVisible] = useState(false);
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const availableToken = sessionStorage.getItem("token");
    const Enrollment_Number = sessionStorage.getItem("Enrollment_Number");
    sessionStorage.removeItem("formData");
    if (!availableToken) {
      navigate("/login");
    }
    if (Enrollment_Number) {
      setSubmissionData((prev) => ({
        ...prev,
        Enrollment_Number: Enrollment_Number,
      }));
    } else {
      navigate("/login");
    }
  }, []);

  const handleChangePassword = async () => {
    if (submisstionData.permanent_password === submisstionData.new_password) {
      toast.error("Old Password and New Password cannot be same", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } else {
      try {
        setIsLoading(true);
        const response = await axios.post(
          `${backendUrl}/users/change-password`,
          submisstionData
        );

        // console.log(response.data);
        if (response.data.success) {
          setIsLoading(false);
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("Enrollment_Number");
          toast.success("Password changed successfully!", {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
          toast.info("You have to login again", {
            position: "top-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
          navigate("/login");
        }
      } catch (error) {
        // console.log(error);
        setIsLoading(false);
        const message = error.response.data.message;
        toast.error(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header title="CHANGE PASSWORD" />

      <div className="flex justify-between px-4 sm:px-[100px] mt-5 xl:mt-10">
        <Link to="/user-dashboard">
          <PrimaryButton text="Go Back To Dashboard" />
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center flex-grow">
        {isLoading && <Loading />}
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-lg w-11/12 max-w-md flex flex-col gap-5 items-center">
          <div className="flex flex-col">
            <label htmlFor="old-password" className="text-gray-700 font-medium">
              Old Password
            </label>
            <div className="relative mt-3">
              <input
                type={isOldPassVisible ? "text" : "password"}
                id="old-password"
                value={submisstionData.permanent_password}
                onChange={(e) =>
                  setSubmissionData((prev) => ({
                    ...prev,
                    permanent_password: e.target.value,
                  }))
                }
                className="block px-2 pb-2 sm:px-2.5 sm:pb-2.5 pt-4 w-[14rem] sm:w-[22rem] text-xs sm:text-lg font-medium text-gray-900 bg-transparent outline outline-2 outline-gray-300 rounded-md peer focus:outline focus:outline-2 focus:outline-black"
                placeholder=" "
              />
              <div className="absolute right-5 top-4 cursor-pointer">
                {isOldPassVisible ? (
                  <IoEye
                    size="25px"
                    onClick={() => setIsOldPassVisible((prev) => !prev)}
                  />
                ) : (
                  <IoMdEyeOff
                    size="25px"
                    onClick={() => setIsOldPassVisible((prev) => !prev)}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="new-password" className="text-gray-700 font-medium">
              New Password
            </label>
            <div className="relative mt-3">
              <input
                type={isNewPassVisible ? "text" : "password"}
                id="new-password"
                value={submisstionData.new_password}
                onChange={(e) =>
                  setSubmissionData((prev) => ({
                    ...prev,
                    new_password: e.target.value,
                  }))
                }
                className="block px-2 pb-2 sm:px-2.5 sm:pb-2.5 pt-4 w-[14rem] sm:w-[22rem] text-xs sm:text-lg font-medium text-gray-900 bg-transparent outline outline-2 outline-gray-300 rounded-md peer focus:outline focus:outline-2 focus:outline-black"
                placeholder=" "
              />
              <div className="absolute right-5 top-4 cursor-pointer">
                {isNewPassVisible ? (
                  <IoEye
                    size="25px"
                    onClick={() => setIsNewPassVisible((prev) => !prev)}
                  />
                ) : (
                  <IoMdEyeOff
                    size="25px"
                    onClick={() => setIsNewPassVisible((prev) => !prev)}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="confirm-password"
              className="text-gray-700 font-medium"
            >
              Confirm New Password
            </label>
            <div className="relative mt-3">
              <input
                type={isConfirmPassVisible ? "text" : "password"}
                id="confirm-password"
                value={submisstionData.confirm_password}
                onChange={(e) =>
                  setSubmissionData((prev) => ({
                    ...prev,
                    confirm_password: e.target.value,
                  }))
                }
                className="block px-2 pb-2 sm:px-2.5 sm:pb-2.5 pt-4 w-[14rem] sm:w-[22rem] text-xs sm:text-lg font-medium text-gray-900 bg-transparent outline outline-2 outline-gray-300 rounded-md peer focus:outline focus:outline-2 focus:outline-black"
                placeholder=" "
              />
              <div className="absolute right-5 top-4 cursor-pointer">
                {isConfirmPassVisible ? (
                  <IoEye
                    size="25px"
                    onClick={() => setIsConfirmPassVisible((prev) => !prev)}
                  />
                ) : (
                  <IoMdEyeOff
                    size="25px"
                    onClick={() => setIsConfirmPassVisible((prev) => !prev)}
                  />
                )}
              </div>
            </div>
          </div>

          <PrimaryButton text="CHANGE" onClick={handleChangePassword} />
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
