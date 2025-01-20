import React from "react";

function VerifyOTP() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add OTP verification logic here
    console.log("OTP Submitted");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
  
      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-lg w-11/12 max-w-md text-center">
        
        <p className="text-gray-700 text-lg mb-6">
          Please enter the OTP (One Time Passcode) that was sent to your E-mail.
        </p>

        {/*
        
          <div className="flex flex-col">
            <label htmlFor="otp" className="sr-only">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              placeholder="OTP (One Time Passcode)"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

        
          <button
            type="submit"
            className="w-full bg-purple-900 text-white py-3 rounded-lg hover:bg-purple-800 transition duration-200"
          >
            RESET PASSWORD
          </button>
        </form>*/}
      </div>
    </div>
  
  );
}

export default VerifyOTP;
