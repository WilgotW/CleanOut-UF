import { Button } from "@mui/material";
import React, { useState } from "react";

interface IProps {
  title: string;
  message: string;
  hidePopup: () => void;
}
export default function Popup({ title, message, hidePopup }: IProps) {
  return (
    <div className="absolute w-full h-full bg-gray-700 bg-opacity-80 z-10 flex justify-center pb-96 items-center">
      <div className="w-[80%] max-w-96 h-fit pt-10 pb-10 text-center bg-white rounded-md flex flex-col gap-5">
        <h1 className="text-2xl font-bold">{title}</h1>
        <h2>{message}</h2>
        <div className="flex justify-center">
          <Button
            onClick={() => hidePopup()}
            className="max-w-96"
            variant="contained"
          >
            Stäng
          </Button>
        </div>
      </div>
    </div>
  );
}
