import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PrimaryButton from "../components/PrimaryButton";
import Banner from "../components/Banner";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const response = await axios.post(
        "http://localhost:30000/api/admin/login",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        const { token, data } = response.data;
        const expireTime = Date.now() + 5 * 60 * 60 * 1000;
        sessionStorage.setItem(
          "adminToken",
          JSON.stringify({ token, expireTime })
        );
        sessionStorage.setItem("adminData", JSON.stringify({ data }));
        navigate("/dashboard");
      } else {
        setErr(response.data.message);
      }
    } catch (error) {
      setErr(error.response?.data?.message);
    }
  };

  return (
    <div className="h-screen flex flex-col gap-3 sm:gap-5 justify-center items-center">
      <Banner />
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 sm:p-8 rounded-3xl flex flex-col items-center gap-5 sm:gap-8 shadow-2xl"
      >
        <h2 className="text-sm sm:text-lg font-bold tracking-wide uppercase">
          Admin Login
        </h2>

        <div className="relative">
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block px-2 pb-2 sm:px-2.5 sm:pb-2.5 pt-4 w-[14rem] sm:w-[20rem] text-xs sm:text-lg font-medium text-gray-900 bg-transparent outline outline-2 outline-gray-300 rounded-md peer focus:outline focus:outline-2 focus:outline-black"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="absolute text-xs sm:text-lg text-gray-500 duration-300 transform -translate-y-4 sm:-translate-y-5 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 sm:peer-focus:-translate-y-5 start-1 cursor-text"
          >
            Email
          </label>
        </div>

        <div className="relative">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block px-2 pb-2 sm:px-2.5 sm:pb-2.5 pt-4 w-[14rem] sm:w-[20rem] text-xs sm:text-lg font-medium text-gray-900 bg-transparent outline outline-2 outline-gray-300 rounded-md peer focus:outline focus:outline-2 focus:outline-black"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="absolute text-xs sm:text-lg text-gray-500 duration-300 transform -translate-y-4 sm:-translate-y-5 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 sm:peer-focus:-translate-y-5 start-1 cursor-text"
          >
            Password
          </label>
        </div>

        {err && (
          <p className="text-red-600 text-xs sm:text-sm font-medium">{err}</p>
        )}

        <p className="text-red-600 text-xs sm:text-sm font-medium -mt-2 sm:-mt-4 text-center">
          Forgot password?
        </p>

        <PrimaryButton text="LOGIN" type="submit" />
      </form>
    </div>
  );
}

export default LoginPage;
