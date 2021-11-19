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















// ////////////////////////////////////////////////////////////////////////////////////////////////////////


// //////////////////////for joining room/////////////////////////////////
  
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
        <Route path="/signup">
          
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
