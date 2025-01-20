import React from "react";

function ForgotPassword() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full bg-purple-900 text-white py-4 text-center">
        <h1 className="text-2xl font-bold">FORGOT PASSWORD</h1>
      </div>

  
      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-lg w-11/12 max-w-md text-center">
        <p className="text-gray-700 text-lg mb-6">
          Please enter the e-mail that you provided to the University.
        </p>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-900 text-white py-3 rounded-lg hover:bg-purple-800 transition duration-200"
          >
            SEND OTP
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
