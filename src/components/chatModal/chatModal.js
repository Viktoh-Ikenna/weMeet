import React, { useState } from "react";
import { connect } from "react-redux";
import { ChatBody } from "../chatBody/chatBody";

const ChatModal = ({
  displayModal,
  SetControlsChatModal,
  inputRef,
  sendMessage,
  keyup
}) => {
  const [possition, setPosition] = useState({ top: "12%", left: "35%" });

  const handleDragStart = function (e) {
    // console.log(e.target)
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

  const handleDisplay = () => {
    SetControlsChatModal();
  };

  // console.log(displayModal.chatModal)
  return (
    <div
      onDrag={handleDragging}
      onDragStart={handleDragStart}
      draggable="true"
      className={`${
        !displayModal.chatModal && "hidden"
      } container  shadow-sm rounded chatModalCont w-96 absolute bg-bgray-100 flex flex-wrap items-center justify-between p-2 flex-col z-20`}
      style={{
        height: 550,
        left: `${possition.left}`,
        top: `${possition.top}`,
      }}
    >
      <div className="chatHeaders w-full h-12 flex justify-between border-b border-bgray-600">
        {/* <!-- options --> */}

        <div
          onClick={handleDisplay}
          id="modalchatcloseBtn"
          className="h-full w-4 flex items-center justify-center cursor-pointer"
        >
          <div className="relative dragging text-gray-700 ml-1 text-2xl ">
            &times;
          </div>
        </div>

        <div className="flex-1 items-center">
          <p className="h-full w-full flex justify-center items-center font-bold text-bgray-500">
            chat
          </p>
        </div>
      </div>
      <div className="chatbody flex-1 w-full overflow-y-scroll">
        {/* <%- include('../partials/chatBody.ejs'); %> */}
        <ChatBody />
      </div>
      <div
        className="serder border border-t-red-700 w-full flex justify-between flex-col"
        style={{ height: 100 }}
      >
        {/* <!-- categories --> */}
        <div className="flex">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-bgray-500"
          >
            SendTo
          </label>
          <select
            defaultValue="Canada"
            id="location"
            name="location"
            className="border border-l-bgray-500  mt-1 block w-1/2 px-4 py-1 mx-1 text-bgray-500 border-bgray-500 focus:outline-none focus:ring-bgray-500 focus:border-bgray-500 sm:text-sm rounded-md bg-transparent"
          >
            <option>USA</option>
            <option>Canada</option>
            <option>EU</option>
          </select>
          <button
            onClick={sendMessage}
            id="sendMessage"
            data-id="modal"
            className="btn-blue text-xl flex-1 hover:bg-bgray-500"
          >
            send
          </button>
        </div>

        <textarea
        onKeyUp={keyup}
          ref={inputRef}
          style={{ minHeight: 50 }}
          name=""
          id="msValue"
          placeholder="Enter a message ..."
          className="w-full min-h-11/12 bg-bgray-100 text-bgray-500 focus:border border-bgray-500"
        ></textarea>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    displayModal: state.Controls,
  };
};

//this sets the dispatch method props for the dispatching data

const setter = (dispatch) => {
  return {
    SetControlsChatModal: () => {
      dispatch({ type: "chatModal", payload: "" });
    },
  };
};

export default connect(mapStateToProps, setter)(ChatModal);
