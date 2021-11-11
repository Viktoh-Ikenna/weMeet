import axios from 'axios';
import React, { useRef } from 'react'
import { url } from '../../base';

export const CreateMeeting = ({show,cancel,setSpin}) => {
    const handleCancel=()=>{
        cancel()
    }

  /////////////////  for creating room ///////////////////////////
//   const close_create_modal = document.querySelectorAll('.cancel_create');
//   const createMeeting= document.querySelector('.createMeeting');
//   const createProceed= document.querySelector('.go_create')
  const startTime = useRef()
  const day = useRef()
  const duration = useRef()
  const pm =useRef()


const createMeetingClick=async()=>{
    setSpin(true)
    const createOBJ={
        startTime:startTime.current.value,day:day.current.value,duration:duration.current.value,pm:pm.current.value
    }
    console.log(createOBJ)
    cancel()
    const data = await axios.post(`${url}/create`, createOBJ,{headers: {
        token: localStorage.getItem('token'),
      }});
    const pathname=await data.data.details.id;
    window.location.pathname=pathname;
}


    return (
      
        <div data-contains="Create" style={{animation:".3s ease-in fadein"}}
        className={`join_room_cont ${!show&&'hidden'} bg-opacity-70 flex justify-center h-screen items-center bg-bgray-600 fixed inset-0 antialiased`}>
        <div className="flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl">
            <div className="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg">
                <p className="font-semibold text-gray-800">Meeting Settings</p>
                <svg onClick={handleCancel} className="w-6 h-6 cursor-pointer cancel_create" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </div>
            <div className="flex flex-col px-6 py-5 bg-gray-50">
                <div className="w-full h-auto py-2">
                    <label htmlFor="selectin">How Long will the meeting last ?</label>
                    <br/>
                    <select ref={duration} name="selectin" defaultValue="0min" className="duration_ bg-bgrey-50 py-1 px-2 outline-none cursor-pointer"  id="">
                        <option value="0" >0 Min</option>
                        <option value="1">1 Min</option>
                        <option value="5">5 Min</option>
                        <option value="10">10 Min</option>
    
                    </select>
                </div>
                <div className="w-full h-auto py-2">
                    <label htmlFor="selectin">What time should the meeting start ?</label>
                    <br/>
                    <select name="selectin" defaultValue="0" ref={startTime} className="time_ bg-bgrey-50 py-1 px-2 outline-none cursor-pointer" id="">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
    
                    </select>
                    <select ref={pm} name="selectin" className="pm_ bg-bgrey-50 py-1 px-2 outline-none cursor-pointer" id="">
                        <option value="am" >am</option>
                        <option value="pm">pm</option>
                    </select>
    
                </div>
                <div className="w-full h-auto py-2">
                    <label htmlFor="selectin">which day is the meeting starting?</label>
                    <br/>
                    <input ref={day} className="day_ bg-bgrey-50 py-1 px-2 outline-none cursor-pointer" type="date" name="" id="" />
                </div>
                <hr />
    
            </div>
            <div
                className="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
                <p onClick={handleCancel} className="font-semibold text-gray-600 cancel_create cursor-pointer">Cancel</p>
                <button onClick={createMeetingClick} className="go_create px-4 py-2 text-white font-semibold bg-blue-500 rounded">
                    Create
                </button>
            </div>
        </div>
    </div>
    )
}
