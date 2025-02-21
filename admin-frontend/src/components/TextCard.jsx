import React from "react";

function TextCard({ text }) {
  return (
    <div className="bg-white px-10 py-3 w-fit text-sm sm:text-xl font-semibold rounded-2xl shadow-lg cursor-pointer">
      {text}
    </div>
  );
}

export default TextCard;
