import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { BsFillMicMuteFill,BsFillCameraVideoOffFill } from "react-icons/bs";



const Controls = ({ Controls,display,setodisplay,handleVideo, state, SetControls, SetParticipants, mute }) => {
  const [options, setoptions] = useState(false)
const dispatch = useDispatch();





 useEffect(() => {
  
  let set = setTimeout(() => {
    setodisplay(false)
  }, 15000);
   return () => {
    clearTimeout(set)
   }
 }, [display])

  const handleoptionsMBL = () => {
    setoptions(!options);
  };
  const handleChatShow = () => {
    SetControls();
  };
  const handleParticipantShow = () => {
    SetParticipants();
  };


const handleEnd=()=>{
  dispatch({ type: "LeaveMeeting", payload: '' });
}
////
  return (
    <div
      style={{ animation: "slideup .5s linear" }}
      className={`${!display&&'hidden'} bottomlayer  max-h-20 absolute min-w-full bg-gray-800  bottom-0 flex items-center justify-between`}
    >
      <div className="md:px-8 leftbottom flex px-2 h-full items-center justify-center">
        <div onClick={mute} className="mic each btn-blue w-20 text_disappear">
          <div className="coverit w-full flex items-center justify-between">
            <div
              style={{ width: "90%" }}
              className=" flex items-center justify-center"
            >
              {state.audio ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 md:h-8 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              ) : (
                <BsFillMicMuteFill className="h-8 w-5 md:w-7" />
              )}
            </div>
            <div style={{ fontSize: "20px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-4 "
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <span>Mute</span>
        </div>
        <div onClick={handleVideo} className="videoToggle btn-blue text_disappear">
          <div className="coverit w-full flex items-center justify-between">
            <div
              style={{ width: "90%" }}
              className=" flex items-center justify-center"
            >
              {state.video?<svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-5 md:w-7"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>:<BsFillCameraVideoOffFill className="h-8 w-5 md:w-7"/>}
            </div>

            <div style={{ fontSize: "20px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-4 "
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <span>Start Video</span>
        </div>
      </div>
      <div className="centerbottom flex h-full flex-1 items-center justify-center">
        <div className="securty btn-blue hidden sm:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-5 md:w-7"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Securty
        </div>
        <div
          onClick={handleParticipantShow}
          className="participant btn-blue text_disappear"
        >
          <div className="coverit w-full flex items-center justify-between">
            <div
              style={{ width: "90%" }}
              className=" flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-5 md:w-7"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>

            <div style={{ fontSize: "20px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-4 "
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <span>Participants</span>
        </div>
        <div
          onClick={handleChatShow}
          className="chatbtn btn-blue hidden md:flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-5 md:w-7"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
              clipRule="evenodd"
            />
          </svg>
          Chat
        </div>
        <div className="share btn-blue text-green-500 text_disappear">
          <div className="coverit w-full flex items-center justify-between">
            <div
              style={{ width: "90%" }}
              className=" flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-5 md:w-7"
                fill=" none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            </div>

            <div style={{ fontSize: "20px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-4 "
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <span>Share Screen</span>
        </div>
        <div className="record btn-blue hidden md:flex">
          <div className="coverit w-full flex items-center justify-between">
            <div
              style={{ width: "90%" }}
              className=" flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-5 md:w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div style={{ fontSize: "20px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-4 "
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          Record
        </div>
        <div className="emoji btn-blue hidden md:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-5 md:w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Reactions
        </div>
      </div>
      <div onClick={handleoptionsMBL} className="btn-blue px-6 md:hidden  flex items-center justify-center">
        <svg

          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-5 md:w-7"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
            clipRule="evenodd"
          />
        </svg>

        <div
          className={`${!options&&'hidden'} absolute z-20 right-0  border bg-bgray-900 px-2 py-4 rounded`}
          style={{ bottom: "100%", right: 1 ,animation: "slideup .5s linear"}}
        >
          <ul className=" list-reset flex flex-col text-bgray-500 bg-bgray-300">
            <li 
            onClick={handleChatShow}
            className=" rounded-t relative -mb-px block border p-4 border-grey">
              chat
            </li>
          </ul>
        </div>
      </div>

      <div className="hidden md:flex rightbottom flex px-6 h-full items-center justify-center">
        <div onClick={handleEnd} className="end endbtn">end</div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    Controls: state.Controls,
  };
};

//this sets the dispatch method props for the dispatching data

const setter = (dispatch) => {
  return {
    SetControls: () => {
      dispatch({ type: "chat", payload: "" });
    },
    SetParticipants: () => {
      dispatch({ type: "participants", payload: "" });
    },
  };
};

export default connect(mapStateToProps, setter)(Controls);
