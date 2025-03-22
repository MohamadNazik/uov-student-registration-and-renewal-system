import { CircularProgress } from "@mui/material";
import React from "react";

function Loading() {
  return (
    <div className="bg-[#391031] bg-opacity-60 absolute w-screen h-full backdrop-blur-[4px] z-10 flex items-center justify-center text-white">
      <CircularProgress size="50px" color="#ffffff" />
    </div>
  );
}

export default Loading;
