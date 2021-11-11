import React, { useState } from "react";
import { CreateMeeting } from "./createMeeting";
import { JoinModak } from "./JoinModak";
import { Spinner } from "./spinner";

export const Home = () => {
  const [showJoin, setshowJoin] = useState(false);
  const [showCreate, setshowCreate] = useState(false);
  const [spin, setSpin] = useState(false);

  const handleJoinClick = () => {
    setshowJoin(!showJoin);
  };

  const handleCreateClick = () => {
    setshowCreate(!showCreate);
  };




  return (
    <>
      <JoinModak show={showJoin} cancel={handleJoinClick} setSpin={setSpin} />
      <CreateMeeting show={showCreate} cancel={handleCreateClick} setSpin={setSpin} />
     
      <div className="bg-grey-100 overflow-hidden shadow-md sm:rounded-lg flex justify-center items-center my-32 md:w-96 mx-auto">
        <div className="px-4 py-5 sm:p-6 w-auto ">
          <div className="flex justify-center flex-wrap py-8 min-w-full">
            <div
              onClick={handleJoinClick}
              className="Joining_room bg-yellow-500 w-5/12 rounded-lg font-bold text-white text-center p-8 my-1 transition duration-300 ease-in-out hover:bg-blue-600 mr-6"
            >
              Join
            </div>
            <div
              onClick={handleCreateClick}
              className="createMeeting bg-green-500 w-5/12 rounded-lg font-bold text-white text-center p-8 my-1 transition duration-300 ease-in-out hover:bg-green-600 mr-6"
            >
              Create
            </div>
            <div className="bg-red-600 w-5/12 rounded-lg font-bold text-white text-center p-8 my-1 transition duration-300 ease-in-out hover:bg-red-700 mr-6">
              Schedule
            </div>
            <div className="bg-gray-500 w-5/12 rounded-lg font-bold text-white text-center p-8 my-1 transition duration-300 ease-in-out hover:bg-gray-600 mr-6">
              Coming
            </div>
            <Spinner spin={spin} />

          </div>
        </div>
      </div>
    </>

  );
};
