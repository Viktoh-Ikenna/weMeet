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
import { EndModal } from "./endModal";
const CONNECTION_PORT = `${url}/`;
export let socket = io(CONNECTION_PORT);
export var peer = new Peer(undefined, {
  secure: true,
  host: "shielded-mesa-84382.herokuapp.com",
  port: 443,
  path: "/peerjs",
  // config: {'iceServers': [
  //   { url: 'stun:stun.l.google.com:19302' },
  //   { url: 'turn:homeo@turn.bistri.com:80', credential: 'homeo' }
  // ]}
});

// export var peer = new Peer(undefined, {
//   host: "/",
//   port: 4000,
//   path: "/peerjs",
//   // config: {'iceServers': [
//   //   { url: 'stun:stun.l.google.com:19302' },
//   //   { url: 'turn:homeo@turn.bistri.com:80', credential: 'homeo' }
//   // ]}
// });
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
  const [mute, setMute] = useState({ video: true, audio: true });
  const [invalidMeet, setinvalidMeet] = useState(true);
  const [invalidTimes, setInvalidTimes] = useState(0);
  const [renderInvalid, setrenderInvalid] = useState(false);
  const [reRender, setRerender] = useState(0);
  const [userCount, setuserCount] = useState(0);
  const [display, setodisplay] = useState(true);

  //selectors
  const userInfo = useSelector((state) => state.UnserInfor);
  const chatConatiner = useSelector((state) => state.Controls.chat);
  // console.log('chatConatiner',userInfo)
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
  const chatContainerShow = (cond) => {
    Dispatch({ type: "chatCondition", payload: cond });
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
        socket.emit("join-room", RoomId, peerId, true, true);
        VideoSteam(true, true);
      } else {
        // console.log(connectedToPeer)
        window.location.reload(true);
      }
    } else {
    }
  }, [invalidMeet]);

  useEffect(() => {
    socket.on("disconnect", (reason) => {
      socket.connect();

      // console.log("i am disconeected", reason);
    });
  }, []);

  useEffect(() => {
    socket.on("removeVideo", function (id) {
      removeVideo(id);
    });
  }, []);

  useEffect(() => {
    socket.on("updateNames", function (id, info) {
      showName(id, info);
    });
  }, []);

  const VideoSteam = async (video, audio) => {
    // console.log(video,audio)

    const streams = await navigator.mediaDevices.getUserMedia({
      video: video,
      audio: audio,
    });

    //  console.log('Myvideo',video)

    addMyvideo(streams);

    // console.log('mute.video',video)
    socket.on("user-connected", async (userId, videoT, audioT) => {
      //FOR CALCULATING THE NUMBER USERS//////////////

      //REMOVING AN EXISTING USER //////////
      removeExisting(userId, videoT, audioT);

      setupateparticipants(upateparticipants + 1);
      // console.log('peerdid',userId)
      var call = peer.call(userId, streams);
      call.on("stream", function (remoteStream) {
        addvideo(remoteStream, userId);
      });
    });
  };

  ////for display connectors video..
  const addvideo = (streams, options) => {
    // console.log("options",options)
    // http://localhost:3000/ef5d6682-b55a-4565-b549-66603d2639d2

    const video = document.createElement("video");
    const div = document.createElement("div");

    //hover element
    const hover = document.createElement("div");
    hover.className =
      "nameshow absolute w-full bg-gray-900 bg-opacity-50 h-3/12 z-10 bottom-0 flex py-5 px-4 items-end justify-end text-lg text-gray-500";
    hover.innerText = "";

    video.srcObject = streams;
    div.id = options;
    video.className = "border-2 border-bgray-900 flex-1 h-full";

    // video.style.minWidth = "full\\";
    // video.style.minHeight = "320px";
    // video.style.maxWidth = "100%";
    div.style.minWidth = "320px";
    div.style.minHeight = "320px";
    div.style.maxWidth = "70%";
    div.className = "flex items-center justify-center relative";

    div.append(video);
    div.append(hover);
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    document.getElementById("videoCotainerPlacing").append(div);
    setTimeout(() => {
      filterIt();
      socket.emit("add-name", peerId, userInfo);
    }, 100);
  };

  ////for display my personal vidoe..
  const addMyvideo = (streams) => {
    document.getElementById("myvideoV").innerHTML = "";
    const video = document.createElement("video");

    video.srcObject = streams;
    video.className = "z-50 max-w-64 max-h-64 border-2 border-bgray-900";
    video.muted = true;

    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    document.getElementById("myvideoV").append(video);
    setRerender(reRender + 1);
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
      setuserCount(
        document.querySelectorAll("#videoCotainerPlacing >div").length
      );
    }
  };

  ////toggle audio or video//
  const removeExisting = (id, video, audio) => {
    // console.log(id)

    var divs = document.querySelectorAll("#videoCotainerPlacing >div");
    divs.forEach((el) => {
      if (el.id === id) {
        if (video) {
          el.getElementsByTagName("video")[0].classList.remove("hidden");
          el.classList.remove("bg-bgray-900");
        } else {
          el.getElementsByTagName("video")[0].classList.add("hidden");
          el.classList.add("bg-bgray-900");
        }
        if (audio) {
          el.getElementsByTagName("video")[0].muted = false;
        } else {
          el.getElementsByTagName("video")[0].muted = true;
        }
        // document.querySelector('#videoCotainerPlacing').removeChild(el)
      }
      setuserCount(document.querySelector("#videoCotainerPlacing").length);
    });
  };

  const removeVideo = (id) => {
    var divs = document.querySelectorAll("#videoCotainerPlacing >div");
    divs.forEach((el) => {
      if (el.id === id) {
        document.querySelector("#videoCotainerPlacing").removeChild(el);
      }
    });
  };

  const showName = (id, info) => {
    var divs = document.querySelectorAll("#videoCotainerPlacing >div");
    divs.forEach((el) => {
      if (el.id === id) {
        // console.log('infor1',el)
        el.querySelector(".nameshow").innerText = info.FullName
          ? info.FullName
          : "";
      }
    });
  };

  ///answering a call

  var getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;
  peer.on("call", function (call) {
    getUserMedia(
      { video: true, audio: mute.audio },
      function (stream) {
        // console.log(call.peer)
        call.answer(stream);
        call.on("stream", function (remoteStream) {
          addvideo(remoteStream, call.peer);
        });
      },
      function (err) {
        console.log("Failed to get local stream", err);
      }
    );
  });

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
    if (msgvalue !== "") {
      const allData = {
        room: RoomId.replace(/\-/g, ""),
        name: userInfo.Email,
        image: userInfo.image,
        msg: msgvalue,
        visibility: "all",
      };
      writeUserData(allData);
    }
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
    console.log(e.target.value.length);
    if (e.keyCode === 13 && e.target.value !== "") {
      ForwardMessage();
    }
  };

  //handles
  const handleMute = () => {
    setMute((prev) => {
      return { ...prev, audio: !mute.audio };
    });

    socket.emit("join-room", RoomId, peerId, mute.video, !mute.audio);

    VideoSteam(true, !mute.audio);
  };
  const handleMuteVideo = () => {
    setMute((prev) => {
      return { ...prev, video: !mute.video };
    });
    socket.emit("join-room", RoomId, peerId, !mute.video, mute.audio);

    VideoSteam(!mute.video, true);
   
  };

  /////////mobile touch functions/////////////////////////
  let per;
  const handlePointer = (evt) => {
    evt.preventDefault();

    per = (evt.touches[0].clientY / window.screen.height) * 100;

    if (evt.target.id === "chathead") {
      document.querySelector(".rightcenter").style.top = `${per}%`;
    }
  };

  const handleDsiplayControl = (e) => {
    if (e.target.id === "videoCotainerPlacing") {
      setodisplay(!display);
    }
  };

  const handleTouchEnd = (e) => {
    // const it = (window.getComputedStyle(document.querySelector('.rightcenter')).top)
    // console.log('end',per)
    if (per > 40) {
      document.querySelector(".rightcenter").style.top = "90%";
      setTimeout(() => {
        chatContainerShow(true);
        document.querySelector(".rightcenter").style.top = "0%";
      }, 150);
    } else {
      document.querySelector(".rightcenter").style.top = "0%";
    }
  };

  return (
    <div
      onTouchStart={handleDsiplayControl}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handlePointer}
      className="w-screen h-screen bg-gray-400 main-container text-gray-50"
    >
      <div>
        <div className="toplayer">
          <div className="lefttop"></div>
          <div className="righttop"></div>
        </div>
<EndModal/>
        <ChatModal
          keyup={HandleInputClick}
          inputRef={messageInput}
          sendMessage={ForwardMessage}
        />
        <NoExist reder={renderInvalid} />
        <Participants />
        <div
          className="centerlater flex"
          onMouseMove={() => {
            setodisplay(true);
          }}
        >
          <div className="videoSection h-screen flex-1">
            <div
              id="video"
              className="min-w-full overflow-y-hidden min-h-full max-h-full flex-wrap flex justify-evenly items-center relative"
            >
              <div
                id="myvideoV"
                className="absolute right-0 top-0 w-22 h-64 z-20 bg-bgray-900"
              ></div>
              <div
                id="videoCotainerPlacing"
                className={`min-w-full max-w-full min-h-full max-h-full absolute justify-items-center items-center grid ${
                  userCount > 1 && userCount < 5
                    ? "grid-cols-2"
                    : userCount > 4
                    ? "grid-cols-3"
                    : "grid-cols-1"
                } ${
                  userCount > 2 && userCount < 7
                    ? "grid-row-2"
                    : userCount > 7
                    ? "grid-row-3"
                    : "grid-row-1"
                } gap-4 p-6 overflow-x-scroll`}
              ></div>
              <Controls
                setodisplay={setodisplay}
                display={display}
                handleVideo={handleMuteVideo}
                state={mute}
                mute={handleMute}
              />
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
