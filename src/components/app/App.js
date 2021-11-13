import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Home } from "../Homepage/home";
import { Login } from "../auth/login";
import { Room } from "../room/room";
import './App.css';
import { useEffect } from "react";
import Peer from 'peerjs';
import axios from "axios";
import io from 'socket.io-client'
import { url } from "../../base";
import { connect } from "react-redux";
import { SSpinner } from "../spinner";


// const CONNECTION_PORT = "http://localhost:4000/";
// export let socket = io(CONNECTION_PORT);
// export var peer = new Peer(undefined, {
//   host: '/',
//   port: 4000,
//   path: '/peerjs'
// }); 


function App({setLogged,checkLogged}) {

  // useEffect(() => {
  //   peer.on("open", (id) => {
  //     socket.emit("join-room", id);
  //     // setTimeout(() => {
  //     //   VideoSteam();
  //     // }, 500);
  //   });
  // }, []);


useEffect(()=>{
    (async()=>{
      const data = await axios.get(`${url}/`,{headers: {
        token: localStorage.getItem('token'),
      }})
      let response = data.data;
      // console.log('logging')
      setLogged(response.state)
     })()
},[])

console.log('logged',checkLogged)


  //all the action buttton at bottoms.............
// const chatbtn = document.querySelector('.chatbtn')















// ///scroll chas to view---------------------------------------
// const chatCont = document.querySelectorAll('.chat_cont > div');
// chatCont.forEach((el,i)=>{
//   if(i===chatCont.length-1){
// el.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
//   }
// })




// ////--------for chat-----------------------------------//



// ////for video onMouseOver ..............
// const bottomlayer = document.querySelector('.bottomlayer');
// setTimeout(() => {
//   bottomlayer.classList.add('hidden')
// }, 15000);


// const vSection = document.querySelector('.centerlater');
// vSection.onmouseover=()=>{
//   bottomlayer.classList.remove('hidden')
// }
// vSection.onmousemove=()=>{
//   setTimeout(() => {
//     bottomlayer.classList.remove('hidden')
//   }, 60000);
// }



// ////////////////////////////////////////////////////////////////////////////////////////////////////////


// //////////////////////for joining room/////////////////////////////////






// ////////////////////////////////for participants movements and closing/////////////////////////////////
// const particiCont =document.querySelector('.particicont');
// const participant =document.querySelector('.participant')

// const close_participantsMo =document.querySelector('.close_participantsMo')
// particiCont.ondrag=function(e){


  
//   // console.log(this)
//   if(window.event.clientX!==0){
//     this.style.marginLeft=`${window.event.clientX}px`
//     this.style.top=`${window.event.clientY}px`
    
//   }

// }
// particiCont.ondragstart=function(e){

//   e.dataTransfer.setDragImage(this, 0, 0); 

// }


// close_participantsMo.onclick=()=>{
//   particiCont.classList.add('hidden')
// }
// participant.onclick=()=>{
//   particiCont.classList.remove('hidden')
// }

  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {checkLogged.state===false?
            <Redirect
            to="/login"
          />:(checkLogged.state===true?  <Home />:<SSpinner/>)
          }
        </Route>
        <Route path="/login">
          
          {checkLogged.state===true?
            <Redirect
            to="/"
          />:(checkLogged.state===false? <Login />:<SSpinner/>)
          }
        </Route>
        <Route path="/:RoomId">
          {checkLogged.state===false?
            <Redirect
            to="/login"
          />:(checkLogged.state===true? <Room />:<SSpinner/>)
          }
        </Route>
        <Route path="*">
          <div>old match</div>
        </Route>
      </Switch>
    </Router>
  );

}

const mapStateToProps = (state) => {
    return {
      checkLogged: state.Logged,
    };
  };
  //this sets the dispatch method props for the dispatching data
  
  const setter = (dispatch) => {
    return {
      setLogged: (bool) => {
        dispatch({ type: "set_log", payload:bool });
      }
    };
  };
  
  export default connect(mapStateToProps, setter)(App);
