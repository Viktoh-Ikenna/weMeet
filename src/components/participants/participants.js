import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const Participants = ({ participants, SetParticipants }) => {
  const [possition, setPosition] = useState({ top: "0", left: "0" });
  const ParticipantsList = useSelector((state) => state.ParticipantsList);
  const { RoomId } = useParams();
  const [copied, setcopied] = useState(false);
  const [invite, setinvite] = useState(false);
  // console.log('zoom',ParticipantsList)

  const handleCloseParts = () => {
    SetParticipants();
  };

  const handleDragStart = function (e) {
    console.log(e.target);
    e.dataTransfer.setDragImage(e.target, 0, 0);
  };
  const handleDragging = () => {
    if (window.event.clientX !== 0) {
      setPosition({
        top: `${window.event.clientY}px`,
        left: `${window.event.clientX}px`,
      });
    }
  };

  const handleInvite = () => {
    setinvite(!invite);
  };

  function copyText() {
    navigator.clipboard.writeText(RoomId);

    setcopied(true);

    setTimeout(() => {
      setcopied(false);
    }, 1000);
  }

  return (
    <div
      onDragStart={handleDragStart}
      onDrag={handleDragging}
      style={{
        top: `${possition.top}`,
        left: `${possition.left}`,
      }}
      className={`particicont  ${
        !participants.participants && "hidden" 
      } bg-white pr-8 px-4 mx-auto absolute z-20 shadow-lg inset-0 top-0 rounded-sm overflow-hidden w-full md:top-4/12 md:left-1/2 md:max-w-sm `}
    >
      <div className="sm:flex sm:items-center relative px-2 py-4">
        <div
          style={{ left: "-30px", top: "-10px" }}
          className="absolute cursor-pointer left-0 top-0 w-8 h-8 bg-gray-500"
        ></div>
        <div className="flex-grow">
          <div className="flex w-full items-center justify-between text-gray-400">
            <h3 className="font-normal px-2 py-3 leading-tight text-bgray-500">
              Contacts
            </h3>
            <span
              onClick={handleCloseParts}
              className="p-2 text-grey-400 hover:bg-gray-100 text-3xl cursor-pointer close_participantsMo "
            >
              &times;
            </span>
          </div>
          <input
            type="text"
            placeholder="Search teams or members"
            className="my-2 w-full text-sm bg-gray-100 text-gray-700 rounded h-10 p-3 focus:outline-none"
          />
          <div className="w-full partsCont">
            {[...new Set(ParticipantsList)].map((el,i) => {
              return (
                <div key={i} className="flex cursor-pointer my-1 hover:bg-blue-50 rounded">
                  <div className="w-8 h-10 text-center py-1">
                    <p className="text-3xl p-0 text-green-400">&bull;</p>
                  </div>
                  <div className="w-4/5 h-10 py-3 px-1">
                    <p className="hover:text-blue-800 text-gray-900">
                      {el.email}
                    </p>
                  </div>
                  <div className="w-1/5 h-10 text-right p-3">
                    <p className="text-sm text-gray-800">Member</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className={`${
          !invite && "hidden"
        } w-full bg-blue-100 flex items-center text-blue-400 px-2 justify-between rounded-lg`}
      >
        {RoomId}
        <div className="cursor-pointer relative" onClick={copyText}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
          </svg>
          <div
            className={`bg-blue-50 ${
              !copied && "hidden"
            } px-4 py-1 absolute shadow-lg flex`}
            style={{ left: "-300%", top: "-200%",animation: ".3s ease-in fadein"  }}
          >
            copied
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="sm:flex bg-gray-100 sm:items-center px-2 py-4">
        <div className="flex-grow text-right">
          <button
            onClick={handleCloseParts}
            className="text-gray-900 hover:text-gray-800 py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleInvite}
            className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded"
          >
            Invite
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    participants: state.Controls,
  };
};

//this sets the dispatch method props for the dispatching data

const setter = (dispatch) => {
  return {
    SetParticipants: () => {
      dispatch({ type: "participants", payload: "" });
    },
  };
};

export default connect(mapStateToProps, setter)(Participants);
