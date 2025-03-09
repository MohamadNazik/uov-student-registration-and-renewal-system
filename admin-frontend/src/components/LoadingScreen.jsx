import React from "react";
import { CircularProgress } from "@mui/material";

function LoadingScreen() {
  return (
    <div className="bg-[rgba(57,16,49,0.75)] absolute w-screen h-screen backdrop-blur-[4px] z-10 flex items-center justify-center text-white">
      <CircularProgress size="50px" color="#ffffff" />
    </div>
  );
}

export default LoadingScreen;
