import React from "react";

import uni_logo from "../assets/uov_logo.png";

function Banner() {
  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 p-3">
      <img
        src={uni_logo}
        alt="university_logo"
        className="w-20 h-20 sm:w-24 sm:h-24"
      />
      <div className="text-center flex flex-col gap-0 sm:gap-1">
        <h1 className="text-[15px] sm:text-[22px] font-bold text-black uppercase tracking-wide">
          faculty of applied science
        </h1>
        <h1 className="text-[15px] sm:text-[22px] font-bold text-black uppercase tracking-wide">
          university of vavuniya
        </h1>
      </div>
    </div>
  );
}

export default Banner;
