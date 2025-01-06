import React from "react";
import downloadIcon from "../assets/icons/download_icon.png";
import pdfIcon from "../assets/icons/pdf.png";

function PdfContainer({ text }) {
  return (
    <div className="bg-[#AC1F0D] text-white w-fit px-3 py-1 sm:px-4 sm:py-2 rounded-lg flex items-center gap-2 cursor-pointer">
      <img src={downloadIcon} alt="icon" className="w-[10px] sm:w-[10px]" />
      <p className="text-xs sm:text-[0.85rem] font-semibold uppercase mb-[0.1rem]">
        {text}
      </p>
      <img src={pdfIcon} alt="icon" className="w-[16px] sm:w-[18px]" />
    </div>
  );
}

export default PdfContainer;

