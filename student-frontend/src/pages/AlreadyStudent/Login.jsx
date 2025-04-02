import React, { useEffect, useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../../components/Banner";
import axios from "axios";
import Loading from "../../components/Loading";
import SecondaryButton from "../../components/SecondaryButton";
import { toast, Bounce } from "react-toastify";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Login() {
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);

  const navigate = useNavigate();

  // console.log(`Reg no = ${regNo} Password = ${password}`);

  useEffect(() => {
    const availableToken = sessionStorage.getItem("token");
    sessionStorage.removeItem("Email");
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

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${backendUrl}/users/login`, {
        Enrollment_Number: regNo,
        password: password,
      });

      // console.log(response.data);

      if (response.data.success) {
        const message = `You have logged in as ${response.data.data.Enrollment_Number}`;
        toast.success(message, {
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
        setIsLoading(false);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem(
          "Enrollment_Number",
          response.data.data.Enrollment_Number
        );
        navigate("/user-dashboard");
      }
    } catch (error) {
      // console.log(error);
      const message = error.response?.data.message;
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
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col gap-3 sm:gap-5 justify-center items-center">
      <Banner />
      <div className="bg-white p-8 sm:p-8 rounded-3xl flex flex-col items-center gap-5 sm:gap-8 shadow-2xl">
        <h2 className="text-sm sm:text-lg font-bold tracking-wide uppercase">
          Student Login
        </h2>
        <div className="relative">
          <input
            type="text"
            id="regno"
            value={regNo}
            className="block px-2 pb-2 sm:px-2.5 sm:pb-2.5 pt-4 w-[14rem] sm:w-[20rem] text-xs sm:text-lg font-medium text-gray-900 bg-transparent outline outline-2 outline-gray-300 rounded-md peer focus:outline focus:outline-2 focus:outline-black"
            placeholder=" "
            onChange={(e) => setRegNo(e.target.value)}
          />
          <label
            htmlFor="regno"
            className="absolute text-xs sm:text-lg text-gray-500 duration-300 transform -translate-y-4 sm:-translate-y-5 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 sm:peer-focus:-translate-y-5 start-1 cursor-text"
          >
            Registration Number
          </label>
        </div>
        <div className="relative">
          <input
            type={isPassVisible ? "text" : "password"}
            id="password"
            value={password}
            className="block px-2 pb-2 sm:px-2.5 sm:pb-2.5 pt-4 w-[14rem] sm:w-[20rem] text-xs sm:text-lg font-medium text-gray-900 bg-transparent outline outline-2 outline-gray-300 rounded-md peer focus:outline focus:outline-2 focus:outline-black"
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            htmlFor="password"
            className="absolute text-xs sm:text-lg text-gray-500 duration-300 transform -translate-y-4 sm:-translate-y-5 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 sm:peer-focus:-translate-y-5 start-1 cursor-text"
          >
            Password
          </label>
          <div className="absolute right-5 top-4 cursor-pointer">
            {isPassVisible ? (
              <IoEye
                size="25px"
                onClick={() => setIsPassVisible((prev) => !prev)}
              />
            ) : (
              <IoMdEyeOff
                size="25px"
                onClick={() => setIsPassVisible((prev) => !prev)}
              />
            )}
          </div>
        </div>

        <Link to="/forgot-password">
          <p className="text-red-600 text-xs sm:text-sm font-medium -mt-2 sm:-mt-4 text-center cursor-pointer">
            Forgot password?
          </p>
        </Link>

        <div className="flex gap-10">
          <SecondaryButton
            text="Home"
            color="bg-red-700"
            hoverColor="bg-red-800"
            onClick={() => {
              navigate("/");
            }}
          />
          <PrimaryButton text="LOGIN" onClick={handleLogin} />
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
}
export default Login;
