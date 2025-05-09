import React from "react";
import uni_logo from "../assets/uov_logo.png";
import student_img from "../assets/DP.jpg";
import barcode from "../assets/barcode.png";
import qrcode from "../assets/QR_Code.png";
import holder_signature from "../assets/signature.png";
import dr_signature from "../assets/signature2.png";

function StudentIDCard({
  image,
  Name_with_Initials,
  Enrollment_Number,
  NIC,
  Enrollment_Date,
  Address,
  Date_of_Issue,
  Acedamic_Year,
  stSignature,
}) {
  return (
    <div className="flex flex-col gap-5 xl:flex-row xl:gap-14">
      {/* Front view */}
      <div className="w-[300px] sm:w-[500px] bg-white h-[175px] sm:h-[280px] rounded-xl overflow-hidden relative">
        <div className="w-[300px] sm:w-[500px] bg-[#F2BA1E] h-[70px] sm:h-[120px] rounded-tr-xl rounded-tl-xl flex justify-between gap-4 px-6 sm:px-9 items-center">
          <img
            src={uni_logo}
            alt="university_logo"
            className="w-12 h-12 sm:w-20 sm:h-20"
          />
          <div className="flex flex-col items-center justify-between">
            <h1 className="text-[12px] sm:text-[20px] font-bold text-black uppercase tracking-wider">
              faculty of applied science
            </h1>
            <h2 className="text-[10px] sm:text-[15px] font-normal text-black tracking-wider">
              University of Vavuniya, Sri Lanka
            </h2>
            <h2 className="text-[9px] sm:text-[14px] font-bold text-black uppercase tracking-wider">
              student's identity card
            </h2>
          </div>
        </div>
        <div className="flex gap-2 sm:gap-4 px-6 py-2">
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

          <div className="flex flex-col justify-between">
            <div className="flex gap-2">
              <div className="flex gap-[59px] sm:gap-[88px]">
                <h3 className="text-[9px] sm:text-[14px] font-medium">Name</h3>
                <h3 className="text-[9px] sm:text-[14px] font-medium">:</h3>
              </div>
              <h3 className="text-[9px] sm:text-[14px] font-medium">
                {Name_with_Initials}
              </h3>
            </div>
            <div className="flex  gap-2">
              <div className="flex gap-[24px] sm:gap-[33px]">
                <h3 className="text-[9px] sm:text-[14px] font-medium">
                  Enrollment No
                </h3>
                <h3 className="text-[9px] sm:text-[14px] font-medium">:</h3>
              </div>
              <h3 className="text-[9px] sm:text-[14px] font-medium">
                {Enrollment_Number}
              </h3>
            </div>
            <div className="flex  gap-2">
              <div className="flex gap-[49px] sm:gap-[72px]">
                <h3 className="text-[9px] sm:text-[14px] font-medium">
                  N.I.C No
                </h3>
                <h3 className="text-[9px] sm:text-[14px] font-medium">:</h3>
              </div>
              <h3 className="text-[9px] sm:text-[14px] font-medium">{NIC}</h3>
            </div>
            <div className="flex  gap-2">
              <div className="flex gap-[6px]">
                <h3 className="text-[9px] sm:text-[14px] font-medium">
                  Date of Enrollment
                </h3>
                <h3 className="text-[9px] sm:text-[14px] font-medium">:</h3>
              </div>
              <h3 className="text-[9px] sm:text-[14px] font-medium">
                {Enrollment_Date}
              </h3>
            </div>
          </div>
        </div>
        <div className="w-[300px] sm:w-[500px] bg-[#F2BA1E] h-[12px] sm:h-[17px] rounded-br-xl rounded-bl-xl absolute top-[163px] sm:top-[265px]"></div>
      </div>

      {/* Rear view */}
      <div className="w-[300px] sm:w-[500px] bg-white h-[175px] sm:h-[280px] rounded-xl overflow-hidden relative">
        <div className="w-[300px] sm:w-[500px] bg-[#391031] h-[12px] sm:h-[17px] rounded-tr-xl rounded-tl-xl"></div>

        <div className="flex justify-center py-2 sm:py-3">
          <img
            src={barcode}
            alt="Barcode"
            className="w-[200px] h-[14px] sm:w-[300px] sm:h-[20px]"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div className="flex flex-col px-6 gap-2 justify-between">
            <div className="flex gap-2">
              <div className="flex gap-[37px]">
                <h3 className="text-[9px] sm:text-[14px] font-medium">
                  Address
                </h3>
                <h3 className="text-[9px] sm:text-[14px] font-medium">:</h3>
              </div>
              <h3 className="text-[9px] sm:text-[14px] font-medium">
                {Address}
              </h3>
            </div>
            <div className="flex  gap-2">
              <div className="flex gap-[5px]">
                <h3 className="text-[9px] sm:text-[14px] font-medium">
                  Date of Issue
                </h3>
                <h3 className="text-[9px] sm:text-[14px] font-medium">:</h3>
              </div>
              <h3 className="text-[9px] sm:text-[14px] font-medium">
                {Date_of_Issue}
              </h3>
            </div>
          </div>

          <h2 className="text-[9px] font-bold text-center pt-1 sm:pt-3 sm:text-[14px]">
            Valid for four academic years from - {Acedamic_Year}
          </h2>

          <div className="flex justify-between px-6 py-1 pt-2 sm:pt-4 items-center">
            <div className="flex flex-col items-center">
              {stSignature && stSignature instanceof File ? (
                <img
                  src={
                    stSignature && stSignature instanceof File
                      ? URL.createObjectURL(stSignature)
                      : holder_signature
                  }
                  alt="holder_signature"
                  className="w-9 sm:w-16"
                />
              ) : stSignature && typeof stSignature === "string" ? (
                <img
                  src={stSignature}
                  alt="holder_signature"
                  className="w-9 sm:w-16"
                />
              ) : (
                <img
                  src={holder_signature}
                  alt="holder_signature"
                  className="w-9 sm:w-16"
                />
              )}

              <p className="text-[8px] -mt-1 sm:text-[12px] sm:-mt-2">
                ...............................................
              </p>
              <h2 className="text-[6px] font-bold sm:text-[9px]">
                Holder's Signature
              </h2>
            </div>
            <img
              src={qrcode}
              alt="QR_code"
              className="w-8 h-8 sm:w-12 sm:h-12"
            />
            <div className="flex flex-col items-center">
              <img
                src={dr_signature}
                alt="holder_signature"
                className="w-9 sm:w-16"
              />
              <p className="text-[8px] -mt-1 sm:text-[12px] sm:-mt-2">
                ...............................................
              </p>
              <h2 className="text-[6px] font-bold sm:text-[9px]">
                Deputy Registrar
              </h2>
            </div>
          </div>
        </div>

        <div className="w-[300px] sm:w-[500px] bg-[#391031] h-[12px] sm:h-[17px] rounded-br-xl rounded-bl-xl absolute top-[163px] sm:top-[265px]"></div>
      </div>
    </div>
  );
}

export default StudentIDCard;
