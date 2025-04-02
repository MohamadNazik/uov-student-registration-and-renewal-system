import React from "react";
import student_img from "../assets/DP.jpg";
import holder_signature from "../assets/signature.png";
import uni_logo from "../assets/uov_logo.png";

function RecordBookComponent({
  image,
  Name_with_Initials,
  Name_denoted_by_Initials,
  Enrollment_Number,
  NIC,
  DOB,
  stSignature,
}) {
  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:gap-14">
      {/* Front view */}
      <div className="w-[250px] sm:w-[390px] bg-[#E13923] h-[350px] sm:h-[500px] flex justify-center items-center overflow-hidden relative">
        <div className="w-[200px] sm:w-[300px] bg-[#E13923] h-[300px] sm:h-[450px] border-2  border-customBlue flex flex-col justify-start items-center overflow-hidden relative">
          <img
            src={uni_logo}
            alt="University Logo"
            className="w-[50px] sm:w-[120px] h-auto mt-4 sm:mt-5"
          />
          <h3
            className="text-customBlue text-[12px] sm:text-[20px] font-inter font-bold mt-6 sm:mt-8 leading-tight "
            style={{
              textShadow: `
               1px 1px 0 white, 
                -1px -1px 0 white, 
                -1px 1px 0 white, 
                1px -1px 0 white,
                1px 0 0 white, 
                0 1px 0 white, 
                -1px 0 0 white, 
                0 -1px 0 white
                
              `,
            }}
          >
            University of Vavuniya
          </h3>
          <h3
            className="text-customBlue text-[12px] sm:text-[20px]  font-inter font-bold leading-tight"
            style={{
              textShadow: `
                1px 1px 0 white, 
                -1px -1px 0 white, 
                -1px 1px 0 white, 
                1px -1px 0 white,
                1px 0 0 white, 
                0 1px 0 white, 
                -1px 0 0 white, 
                0 -1px 0 white
                
              `,
            }}
          >
            Sri Lanka
          </h3>
          <h3
            className="text-customBlue text-[16px] sm:text-[28px] text-center  font-inter font-bold uppercase mt-8 sm:mt-8 leading-tight"
            style={{
              textShadow: `
                1px 1px 0 white, 
                -1px -1px 0 white, 
                -1px 1px 0 white, 
                1px -1px 0 white,
                1px 0 0 white, 
                0 1px 0 white, 
                -1px 0 0 white, 
                0 -1px 0 white
              `,
            }}
          >
            Student's Record Book
          </h3>
          <h3
            className="text-customBlue text-[8px] sm:text-[18px] text-center  font-inter font-bold uppercase mt-20 sm:mt-[80px] sm:pt-2 leading-tight "
            style={{
              textShadow: `
                1px 1px 0 white, 
                -1px -1px 0 white, 
                -1px 1px 0 white, 
                1px -1px 0 white,
                1px 0 0 white, 
                0 1px 0 white, 
                -1px 0 0 white, 
                0 -1px 0 white
              `,
            }}
          >
            Faculty Of Applied Science
          </h3>
        </div>
      </div>

      {/* Back view */}
      <div className="w-[250px] sm:w-[390px]  bg-white h-[350px] sm:h-[500px] flex justify-center items-center overflow-hidden relative">
        <div className="w-[200px] sm:w-[300px] bg-white h-[300px] sm:h-[450px] border-2  border-black flex flex-col justify-start items-center overflow-hidden relative px-1">
          <div class="w-[85px] h-[20px] sm:w-[120px] sm:h-[40px] sm:text-[12px] border  border-black text-[10px] ml-auto mr-[10px] mt-2">
            <p class="text-center mt-[2px] font-bold">Registration No:</p>
          </div>
          <div className="w-[85px] h-[20px] sm:w-[120px] sm:h-[40px] border border-black text-[10px] sm:text-[12px] ml-auto mr-[10px]">
            <p className="text-center mt-[2px]  font-bold">
              {Enrollment_Number}
            </p>
          </div>
          <div class="text-left  text-[9px] sm:text-[12px] ml-1 mt-5 sm:mr-[40px] sm:mt-10 space-y-1 sm:space-y-3">
            <h4>
              Name With Initials
              <span className="inline mx-auto  ml-9 sm:ml-[43px]">:</span>
              <span className="font-bold ml-3  sm:ml-2">
                {Name_with_Initials}
              </span>
            </h4>
            <h4>
              Name Donated By Initials
              <span className="inline ml-[10px]">:</span>
              <span className="font-bold ml-3 sm:ml-2">
                {Name_denoted_by_Initials}
              </span>
            </h4>
            <h4>
              National Identity Card No
              <span className="inline ml-2 ">:</span>
              <span className="font-bold ml-2 sm:ml-2">{NIC}</span>
            </h4>
            <h4>
              Date of Birth
              <span className="inline ml-[60px] sm:ml-[75px]">:</span>
              <span className="font-bold  ml-3 sm:ml-2">{DOB}</span>
            </h4>
          </div>

          <div className="flex justify-center items-center mt-8 sm:mt-8">
            {image && image instanceof File ? (
              <img
                src={URL.createObjectURL(image)}
                alt="student_image"
                className="w-16 h-32 sm:w-[105px] border-[1px] border-black"
              />
            ) : typeof image === "string" ? (
              <img
                src={image}
                alt="student_image"
                className="w-16 h-32 sm:w-[105px] border-[1px] border-black"
              />
            ) : (
              <img
                src={student_img}
                alt="student_image"
                className="w-16 h-32 sm:w-[105px] border-[1px] border-black"
              />
            )}
          </div>

          <div className="flex items-center text-left text-[9px] sm:text-[12px] mr-7 mt-7 sm:mr-[70px] sm:mt-7 mb-10 pb-3">
            Signature of the student<span class="ml-3 sm:ml-[15px]">:</span>
            {stSignature && stSignature instanceof File ? (
              <img
                src={
                  stSignature && stSignature instanceof File
                    ? URL.createObjectURL(stSignature)
                    : holder_signature
                }
                alt="holder_signature"
                className="w-9 sm:w-16 pl-3"
              />
            ) : stSignature && typeof stSignature === "string" ? (
              <img
                src={stSignature}
                alt="holder_signature"
                className="w-9 sm:w-16 pl-3"
              />
            ) : (
              <img
                src={holder_signature}
                alt="holder_signature"
                className="w-9 sm:w-16 pl-3"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecordBookComponent;
