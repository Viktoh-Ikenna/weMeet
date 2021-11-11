import axios from "axios";
import React, { useRef, useState } from "react";
import { url } from "../../base";

export const JoinModak = ({ show, cancel, setSpin }) => {
  const [invalid, setValid] = useState(false);
  const LinkInput = useRef();

  const handleCancel = () => {
    cancel();
  };

  const handleChange = () => {
    setValid(false);
  };

  const joinNow = async () => {
    setSpin(true);

    if (LinkInput.current.value !== "") {
      // console.log(LinkInput.current.value)
      const data = await axios.get(`${url}/join/${LinkInput.current.value}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      const response = await data.data.details;
      if (response !== "Meetings doesnt exists") {
        window.location.pathname = response;
      } else {
        setValid(false);
        setSpin(false);
        alert("meeting doesnt exist");
      }
    } else {
      setValid(true);
      setSpin(false);
    }
  };

  return (
    <>
      <div
        data-contains="join"
        style={{ animation: ".3s ease-in fadein" }}
        className={`join_room_cont ${
          !show && "hidden"
        } bg-opacity-70 flex justify-center h-screen items-center bg-bgray-600 fixed inset-0 antialiased`}
      >
        <div className="flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl">
          <div className="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
            <p className="font-semibold text-gray-800">
              Proceed to the meeting
            </p>
            <svg
              className="w-6 h-6 cursor-pointer"
              onClick={handleCancel}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
          <div className="flex flex-col px-6 py-5 bg-gray-50">
            <p className="mb-2 font-semibold text-gray-700">
              Paste the link here
            </p>
            <input
              ref={LinkInput}
              onChange={handleChange}
              type="text"
              name=""
              placeholder="Paste the invitation link..."
              className="link_cont p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-12"
              id=""
            />
            <p className={`joining_error ${!invalid && "hidden"} text-red-500`}>
              {" "}
              Invalid invitation link
            </p>
            <hr />
          </div>
          <div className="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
            <p
              onClick={handleCancel}
              className="font-semibold text-gray-600 cursor-pointer"
            >
              Cancel
            </p>
            <button
              onClick={joinNow}
              className="go_join px-4 py-2 text-white font-semibold bg-blue-500 rounded"
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
