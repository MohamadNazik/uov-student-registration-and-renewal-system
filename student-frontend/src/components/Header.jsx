import React from "react";
import uni_logo from "../assets/uov_logo.png";
import logout_icon from "../assets/icons/logout_icon.png";
import { Link } from "react-router-dom";

function Header({ title, logOutFunc }) {
  return (
    <div className="w-full bg-[#391031] flex items-center justify-between px-[25px] md:px-[100px] py-3 sm:py-6">
      <img
        src={uni_logo}
        alt="university_logo"
        className="w-10 h-10 sm:w-14 sm:h-14"
      />

      <h1 className="text-white text-sm sm:text-3xl font-semibold uppercase">
        {title}
      </h1>

      <Link to="/login">
        <img
          src={logout_icon}
          alt="logout_icon"
          className="w-h-6 h-6 sm:w-10 sm:h-10 cursor-pointer"
          onClick={logOutFunc}
        />
      </Link>
    </div>
  );
}

export default Header;
