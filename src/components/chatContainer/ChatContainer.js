import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ChatBody } from '../chatBody/chatBody';

const ChatContainer = ({keyup,sendMessage,inputRef,Controls,SetControlsChat,SetControlsChatModal}) => {

  const [showToggle, setshowToggle] = useState(false)



const handleshowToggle=()=>{
    setshowToggle(!showToggle)
}
const handleChatPanel=()=>{
    SetControlsChat()
}
const handlePopOut=()=>{
    SetControlsChat()
    SetControlsChatModal();

}


    return (
        <div id="chathead" style={{zIndex:'200',transition:'.1s ease-in-out all'}} className={`md:${!Controls.chat&&'hidden'} md:relative rightcenter absolute ${Controls.chat&&'hidden'}  w-full z-50 h-screen md:w-3/12 md:z-0  h-screen border border-gray-300 bg-bgray-200  md:block`}>
        <div id="chathead" className="container h-full flex items-center justify-between flex-col">
          <div id="chathead" className="chatHeaders w-full h-12 flex justify-between border-b border-bgray-600">
            {/* <!-- options --> */}
            <div className="h-full flex items-center justify-center">
            <div className="relative">
              <button 
              onClick={handleshowToggle}
                className="relative z-10 block rounded-md bg-bgray-300 px-1 py-3 ml-1 focus:outline-none">
                <svg className="h-5 w-5 text-bgray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fillzrule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd" />
                </svg>
              </button>

              <div x-show="dropdownOpen" className={`absolute cursor-pointer ${!showToggle&&'hidden'} left-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20`}>
                <div id="close_chat"
                onClick={handleChatPanel}
                  className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white">
                  Close
                </div>
                <div onClick={handlePopOut} id="chatPopUp" className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white hidden md:block">
                  Pop Out
                </div>

              </div>
            </div>
          </div>







            <div id="chathead" className="flex-1 items-center">
              <p id="chathead" className="h-full w-full flex justify-center items-center font-bold text-bgray-500">
                chat
              </p>
            </div>
          </div>
          <div id="chathead" className="chatbody  flex-1 w-full overflow-y-scroll">
            <ChatBody />
          </div>
          <div
            className="serder border border-t-red-700 w-full flex justify-between flex-col"
            style={{ height: 120 }}
          >
            {/* <!-- categories --> */}
            <div className="flex h-12">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-bgray-500"
              >
                SendTo
              </label>
              <select
              defaultValue="canada"
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
                data-id="fixed"
                className="btn-blue text-xl flex-1 hover:bg-bgray-500"
              >
                send
              </button>
            </div>

            <textarea
            onKeyUp={keyup}
            ref={inputRef}
              name=""
              id="messageValue"
              placeholder="Enter a message ..."
              className="w-full flex-1 h-9/12 bg-bgray-100 text-bgray-500 focus:border border-bgray-500"
            ></textarea>
          </div>
        </div>
      </div>
    )
}

const mapStateToProps = (state) => {
    return {
      Controls: state.Controls,
    };
  };
  
  //this sets the dispatch method props for the dispatching data
  
  const setter = (dispatch) => {
    return {
      SetControlsChat: () => {
        dispatch({ type: "chat", payload: "" });
      },
      SetControlsChatModal: () => {
        dispatch({ type: "chatModal", payload: "" });
      }
    };
  };
  
  export default connect(mapStateToProps, setter)(ChatContainer);