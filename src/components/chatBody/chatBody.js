import React from "react";
import { useSelector } from "react-redux";

export const ChatBody = () => {
  
  const messages = useSelector(state => state.MessageList);
  const userInfo = useSelector(state=>state.UnserInfor)

// console.log("redux",userInfo)
  // console.log(messages)
  return (
    <div className="w-full px-5 flex flex-col justify-between">
      <div className="chatbo m-w-full min-h-full flex flex-col mt-5 chat_cont">
      {messages.sort((a,b)=>a.date-b.date).map((el,i)=>{
          return el.name===userInfo.Email?
          <div key={i} className="flex justify-end mb-4">
          <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
           {el.messageValue}
          </div>
          <img src={el.image} className="object-cover h-8 w-8 rounded-full"
            alt="" />
        </div>
          :<div key={i} className="flex justify-start mb-4">
          <img src={el.image} className="object-cover h-8 w-8 rounded-full"
            alt="" />
          <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
          {el.messageValue}
          </div>
        </div>
        })}
      </div>
    </div>
  );
};
