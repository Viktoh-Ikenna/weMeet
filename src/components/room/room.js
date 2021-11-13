import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import axios from "axios";
import io from "socket.io-client";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, child, get } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ChatModal from "../chatModal/chatModal";
import Participants from "../participants/participants";
import ChatContainer from "../chatContainer/ChatContainer";
import { url } from "../../base";
import Controls from "../controls";
import { NoExist } from "./noExist";
const CONNECTION_PORT = `${url}/`;
export let socket = io(CONNECTION_PORT);
// export var peer = new Peer(undefined, {
//   secure: true,
//   host: "shielded-mesa-84382.herokuapp.com",
//   port: 443,
//   path: "/peerjs",
//   // config: {'iceServers': [
//   //   { url: 'stun:stun.l.google.com:19302' },
//   //   { url: 'turn:homeo@turn.bistri.com:80', credential: 'homeo' }
//   // ]}
// });

export var peer = new Peer(undefined, {
  host: "/",
  port: 4000,
  path: "/peerjs",
  // config: {'iceServers': [
  //   { url: 'stun:stun.l.google.com:19302' },
  //   { url: 'turn:homeo@turn.bistri.com:80', credential: 'homeo' }
  // ]}
});
let connectedToPeer = false;
let peerId = "";

peer.on("open", (id) => {
  connectedToPeer = true;
  peerId = id;
});

export const Room = () => {
  //states
  const { RoomId } = useParams();
  const messageInput = useRef();

  const [messageSent, setmessageSent] = useState(0);
  const [upateparticipants, setupateparticipants] = useState(0);
  const [mute, setMute] = useState({ video: true, audio: false });
  const [invalidMeet, setinvalidMeet] = useState(true);
  const [invalidTimes, setInvalidTimes] = useState(0);
  const [renderInvalid, setrenderInvalid] = useState(false);
  const [reRender,setRerender]=useState(0)
  //selectors
  const userInfo = useSelector((state) => state.UnserInfor);

  //dispatchers /////////////////
  const Dispatch = useDispatch();

  const saveMessage = (mes) => {
    Dispatch({ type: "save_message", payload: mes });
  };
  const saveUser = (user) => {
    Dispatch({ type: "save_user", payload: user });
  };
  const updateParticipants = (list) => {
    Dispatch({ type: "update_participants", payload: list });
  };

  // ||==============================================||
  // ||                                              ||
  // ||               mounting Effects          ||                   ||
  // ||==============================================||                                              ||

  ///////////////mounting Effects////////////////////////

  useEffect(() => {
    (async () => {
      const userData = await axios.get(`${url}/userData`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      const response = await userData.data.user;
      saveUser(response);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await axios.get(`${url}/meetingDetails/${RoomId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      const response = await data.data;
      // console.log(response)
      if (response.data !== "invalid") {
        setInvalidTimes(invalidTimes + 1);
        setinvalidMeet(false);
        updateParticipants(response.data.participant);
      } else {
        setinvalidMeet(true);
        setrenderInvalid(true);
      }
    })();
  }, [upateparticipants]);

  useEffect(() => {
    socket.on("update-message", (r) => {
      // console.log('updating a message.......',r)
      updateMessages();
    });
  }, []);

  useEffect(() => {
    updateMessages();
  }, [messageSent]);



  useEffect(() => {
    if (!invalidMeet && invalidTimes === 1) {
      if (connectedToPeer) {
        socket.emit("join-room", RoomId, peerId,true);
        VideoSteam(true,true,false);
      }
    } else {
    }
  }, [invalidMeet]);
  // console.log(USer_details)

  
  useEffect(() => {
    socket.on("disconnect", (reason) => {
      if(reason==="ping timeout"||reason==="transport close"){
        socket.connect();
      }
      console.log("i am disconeected",reason);
    });
  }, []);





  const VideoSteam = async (first,video,audio) => {
    const streams = await navigator.mediaDevices.getUserMedia({
      video: video,
      audio: true,
    });

 if(first){
  addMyvideo(streams);
 }

    // console.log('mute.video',video)
    socket.on("user-connected", async (userId, video) => {
      // console.log('video',video)
      removeExisting(userId,video)
      setupateparticipants(upateparticipants + 1);

      var call = peer.call(userId, streams);
      call.on("stream", function (remoteStream) {
        addvideo(remoteStream,userId);
        // console.log(socketID)
      });
    });
  };

  ////for display connectors video..
  const addvideo = (streams, options) => {
    // console.log("options",options)
    const video = document.createElement("video");
    const div = document.createElement("div");
    div.style.backgroundColor="black";
    video.srcObject = streams;
    div.id = options;
    video.className = "border-2 border-bgray-900";
   
    video.style.minWidth = "320px";
    video.style.minHeight = "320px";
    video.style.maxWidth = "100%";
 

    div.append(video);
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    document.getElementById("videoCotainerPlacing").append(div);
    setTimeout(() => {
      filterIt();
    }, 100);
  };

  ////for display my personal vidoe..
  const addMyvideo = (streams) => {
    document.getElementById("myvideoV").innerHTML="";
    const video = document.createElement("video");

    video.srcObject = streams;
    video.className = "z-50 max-w-64 max-h-64 border-2 border-bgray-900";
    video.muted = true;

    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    document.getElementById("myvideoV").append(video);
    setRerender(reRender+1)
  };


  //filter duplicates
  const filterIt = () => {
    var divs = document.querySelectorAll("#videoCotainerPlacing >div");
    var arrayOfUsedNames = [];

    for (var i = 0; i < divs.length; i++) {
      var index = arrayOfUsedNames.indexOf(divs[i].id);

      if (index === -1) {
        arrayOfUsedNames.push(divs[i].id);
      } else {
        divs[i].parentNode.removeChild(divs[i]);
      }
    }
  };




  ////toggle audio or video//
const removeExisting=(id,video)=>{
  // console.log(id)
 
  var divs = document.querySelectorAll("#videoCotainerPlacing >div");
  divs.forEach(el=>{
    if(el.id===id){
      if(video){
        el.getElementsByTagName('video')[0].classList.remove('hidden')
      }else{
        el.getElementsByTagName('video')[0].classList.add('hidden')
      }
      console.log(el)
      
      // document.querySelector('#videoCotainerPlacing').removeChild(el)
    }
  })
}


///answering a call

  var getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;
  peer.on("call", function (call) {
    getUserMedia(
      { video: mute.video, audio: true },
      function (stream) {
        // console.log(call)
        call.answer(stream);
        call.on("stream", function (remoteStream) {
          addvideo(remoteStream);
        });
      },
      function (err) {
        console.log("Failed to get local stream", err);
      }
    );
  });

  // ///scroll chas to view---------------------------------------

  ////for video onMouseOver ..............
  // const bottomlayer = document.querySelector('.bottomlayer');
  // setTimeout(() => {
  //   bottomlayer.classNameList.add('hidden')
  // }, 15000);

  // const vSection = document.querySelector('.centerlater');
  // vSection.onmouseover=()=>{
  //   bottomlayer.classNameList.remove('hidden')
  // }
  // vSection.onmousemove=()=>{
  //   setTimeout(() => {
  //     bottomlayer.classNameList.remove('hidden')
  //   }, 60000);
  // }

  //////////inintialising  chat app now..
  const firebaseConfig = {
    apiKey: "AIzaSyA-ILzcrrsP34CHZBfXtXI_WW2VQOyWtCw",
    authDomain: "zoom-clone-45244.firebaseapp.com",
    projectId: "zoom-clone-45244",
    storageBucket: "zoom-clone-45244.appspot.com",
    messagingSenderId: "105769106199",
    appId: "1:105769106199:web:c425e76f7c768a611c5552",
    measurementId: "G-8YBTLD8SFB",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const ForwardMessage = () => {
    let msgvalue = messageInput.current.value;
    const allData = {
      room: RoomId.replace(/\-/g, ""),
      name: userInfo.Email,
      image: userInfo.image,
      msg: msgvalue,
      visibility: "all",
    };
    writeUserData(allData);
  };

  function writeUserData({ room, name, image, msg, visibility }) {
    // console.log({room,name,image,msg,visibility})
    set(
      ref(
        database,
        "meetings/" +
          room +
          "/messages/" +
          `${Math.random(Math.random) * Math.random()}`.replace(".", "")
      ),
      {
        name,
        image,
        messageValue: msg,
        visibility,
        date: Date.now(),
      }
    );

    ///update message sent
    socket.emit("sent-message");

    messageInput.current.value = "";
    setmessageSent(messageSent + 1);
  }

  socket.on("prepareData", async () => {});

  const updateMessages = async () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, "meetings"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const result = snapshot.val();
          const roomy = result[RoomId.replace(/\-/g, "")];
          //   console.log(returnToArray(roomy.messages));
          // const x=roomy.messages
          saveMessage(returnToArray(roomy.messages));
          const chatCont = document.querySelectorAll(".chat_cont > div");
          chatCont.forEach((el, i) => {
            if (i === chatCont.length - 1) {
              el.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
              });
            }
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const returnToArray = (obj) => {
    const objj = Object.keys(obj);
    return objj.map((el) => {
      return obj[el];
    });
  };

  ///////////////////events//////////////////
  const HandleInputClick = (e) => {
    if (e.keyCode === 13) {
      ForwardMessage();
    }
  };

  //handles
  const handleMute = () => {
    setMute((prev) => {
      return { ...prev, audio: !mute.audio };
    });
  };
  const handleMuteVideo = () => {

    setMute((prev) => {
      return { ...prev, video: !mute.video };
    });
    socket.emit("join-room", RoomId, peerId,!mute.video);
    // console.log(mute.video)
    VideoSteam(!mute.video,false);
    // VideoSteam(false,false,false);
    // socket.disconnect()

  };
  return (
    <div className="w-screen h-screen bg-gray-400 main-container text-gray-50">
      <div>
        <div className="toplayer">
          <div className="lefttop"></div>
          <div className="righttop"></div>
        </div>

        <ChatModal
          keyup={HandleInputClick}
          inputRef={messageInput}
          sendMessage={ForwardMessage}
        />
        <NoExist reder={renderInvalid} />
        <Participants />
        <div className="centerlater flex">
          <div className="videoSection h-screen flex-1">
            <div
              id="video"
              className="min-w-full overflow-y-hidden min-h-full max-h-full flex-wrap flex justify-evenly items-center relative"
            >
              <div
                id="myvideoV"
                className="absolute right-0 top-0 w-22 h-64 z-20"
              ></div>
              <div
                id="videoCotainerPlacing"
                className="min-w-full max-w-full min-h-full max-h-full absolute flex-wrap flex items-center justify-center overflow-x-scroll"
              ></div>
              <Controls
              handleVideo={handleMuteVideo}
              state={mute} mute={handleMute} />
            </div>
          </div>

          <ChatContainer
            keyup={HandleInputClick}
            inputRef={messageInput}
            sendMessage={ForwardMessage}
          />
        </div>
      </div>
    </div>
  );
};
