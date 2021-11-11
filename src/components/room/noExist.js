import React from "react";
import { useHistory, useLocation } from "react-router-dom";

export const NoExist = ({reder}) => {
    const history=useHistory()
  return (
    <div className={`bg-opacity-50 ${!reder&&"hidden"} bg-bgray-50 border-l-8 border-red-900 mb-2 fixed z-50 inset-0`} style={{zIndex:"100000"}}>
      <div className="flex items-center">
        <div className="p-2">
          <div className="flex items-center">
            <div className="ml-2" onClick={()=>{history.push('/')}}>
              <svg
                className="h-8 w-8 text-red-900 mr-2 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="px-6 py-4 text-red-900 font-semibold text-lg">
              Meeting Doesnt Exits
            </p>
          </div>
          <div className="px-16 mb-4">
           
          </div>
        </div>
      </div>
    </div>
  );
};
