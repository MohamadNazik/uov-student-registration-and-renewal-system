import React, { useEffect, useState } from "react";
import PrimaryButton from "../../components/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../../components/Banner";
import axios from "axios";
import Loading from "../../components/Loading";
import SecondaryButton from "../../components/SecondaryButton";

function Login() {
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // console.log(`Reg no = ${regNo} Password = ${password}`);

  useEffect(() => {
    const availableToken = sessionStorage.getItem("token");
    if (availableToken) {
      navigate("/user-dashboard");
    }
  }, []);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          Enrollment_Number: regNo,
          password: password,
        }
      );

      // console.log(response.data);

      if (response.data.success) {
        setIsLoading(false);
        sessionStorage.setItem("token", response.data.token);
        navigate("/user-dashboard");
      }
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      setError("Invalid Enrollment Number or Password");
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
            type="password"
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
        </div>
        {error && (
          <p className="text-xs font-medium text-red-600 text-center">
            {error}
          </p>
        )}
        <p className="text-red-600 text-xs sm:text-sm font-medium -mt-2 sm:-mt-4 text-center">
          Forgot password?
        </p>

        <div className="flex gap-10">
          <SecondaryButton
            text="Home"
            color="bg-red-700"
            hoverColor="hover:bg-red-800"
            onClick={() => {}}
          />
          <PrimaryButton text="LOGIN" onClick={handleLogin} />
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
}
export default Login;
