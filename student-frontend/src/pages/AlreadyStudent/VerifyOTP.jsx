import React, { useEffect, useState } from "react";
import SecondaryButton from "../../components/SecondaryButton";
import PrimaryButton from "../../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import Loading from "../../components/Loading";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function VerifyOTP() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // console.log(otp);

  useEffect(() => {
    const availableToken = sessionStorage.getItem("token");
    const emailAdd = sessionStorage.getItem("Email");
    sessionStorage.removeItem("formData");
    if (availableToken) {
      navigate("/user-dashboard");
    } else {
      sessionStorage.removeItem("Enrollment_Number");
    }

    if (!emailAdd) {
      navigate("/forgot-password");
    } else {
      setEmail(emailAdd);
    }
    const removeLocalStorage = () => {
      localStorage.removeItem("regDetails");
      localStorage.removeItem("student");
    };
    removeLocalStorage();
  }, []);

  const handleResetpassword = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${backendUrl}/common/verify-otp`, {
        otp: otp,
        email: email,
      });

      // console.log(response);
      if (response.data.success) {
        setIsLoading(false);
        navigate("/login");
        sessionStorage.removeItem("Email");
        toast.success("Password is reset to your default password", {
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
    } catch (error) {
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
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      {isLoading && <Loading />}
      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-lg w-11/12 max-w-md text-center">
        <p className="text-black text-lg mb-6 font-medium">
          Please enter the OTP (One Time Passcode) that was sent to your E-mail.
        </p>
        <div className="flex flex-col gap-7 items-center">
          <div className="relative">
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="block px-2 pb-2 sm:px-2.5 sm:pb-2.5 pt-4 w-[14rem] sm:w-[21rem] text-xs sm:text-lg font-medium text-gray-900 bg-transparent outline outline-2 outline-gray-300 rounded-md peer focus:outline focus:outline-2 focus:outline-black"
              placeholder=" "
            />
            <label
              htmlFor="otp"
              className="absolute text-xs sm:text-lg text-gray-500 duration-300 transform -translate-y-4 sm:-translate-y-5 scale-75 top-2 z-0 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 sm:peer-focus:-translate-y-5 start-1 cursor-text"
            >
              OTP
            </label>
          </div>
          <div className="flex flex-col gap-4 w-full items-center">
            <PrimaryButton
              text="Reset password"
              onClick={handleResetpassword}
            />
            <SecondaryButton
              text="Home"
              color="bg-red-700"
              hoverColor="bg-red-800"
              // onClick={() => {
              //   navigate("/");
              // }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;
