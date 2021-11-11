import React from "react";

export const Spinner = ({spin}) => {
  return (
    <div className={`loadspinner z-50 bg-bgray-400 bg-opacity-70 flex justify-center items-center ${!spin&&'hidden'} fixed inset-0 w-full h-screen`}>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
