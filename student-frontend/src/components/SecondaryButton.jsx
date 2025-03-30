import React from "react";

function SecondaryButton({
  text,
  color,
  hoverColor,
  onClick,
  type,
  isDisabled,
}) {
  return (
    <button
      className={`gap-2 px-[15px] sm:px-[22px] cursor-pointer w-fit py-[8px] sm:py-[10px] rounded-2xl text-white text-[10px] sm:text-[14px] font-semibold ${color} flex items-center justify-center tracking-wider uppercase ${
        hoverColor ? `hover:${hoverColor}` : ""
      } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={onClick}
      type={type}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}

export default SecondaryButton;
