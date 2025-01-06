import React from "react";

function SecondaryButton({ text, color, hoverColor, onClick }) {
  return (
    <button
      className={`gap-2 px-[15px] sm:px-[22px] w-fit py-[8px] sm:py-[10px] rounded-2xl text-white text-[10px] sm:text-[14px] font-semibold ${color} ${hoverColor} flex items-center justify-center tracking-wider uppercase`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default SecondaryButton;
