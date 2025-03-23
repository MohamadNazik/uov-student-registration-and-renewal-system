import React, { useEffect, useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import Loading from "../../components/Loading";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const availableToken = sessionStorage.getItem("token");
    sessionStorage.removeItem("formData");
    if (availableToken) {
      navigate("/user-dashboard");
    } else {
      sessionStorage.removeItem("Enrollment_Number");
    }
    const removeLocalStorage = () => {
      localStorage.removeItem("regDetails");
      localStorage.removeItem("student");
    };
    removeLocalStorage();
  }, []);

  const sendOTP = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${backendUrl}/common/forgot-password`,
        { email: email }
      );

      // console.log(response.data.status);
      if (response.data.status === "PENDING") {
        setIsLoading(false);
        navigate("/verify-otp");
        toast.success(`OTP is sent to ${email}`, {
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
      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-lg w-11/12 max-w-md text-center flex flex-col items-center gap-6">
        <p className="text-gray-700 text-lg mb-6 font-medium">
          Please enter the e-mail that you provided to the University.
        </p>

        <div className="flex flex-col gap-7 items-center">
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block px-2 pb-2 sm:px-2.5 sm:pb-2.5 pt-4 w-[14rem] sm:w-[21rem] text-xs sm:text-lg font-medium text-gray-900 bg-transparent outline outline-2 outline-gray-300 rounded-md peer focus:outline focus:outline-2 focus:outline-black"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute text-xs sm:text-lg text-gray-500 duration-300 transform -translate-y-4 sm:-translate-y-5 scale-75 top-2 z-0 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 sm:peer-focus:-translate-y-5 start-1 cursor-text"
            >
              Email
            </label>
          </div>

          <div className="flex gap-8 w-full justify-center">
            <SecondaryButton
              text="Go Back"
              color="bg-red-700"
              hoverColor="bg-red-800"
              onClick={() => {
                navigate("/login");
              }}
            />

            <PrimaryButton text="Send otp" onClick={sendOTP} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
