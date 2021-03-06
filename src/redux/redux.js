const control={
    chatModal:false,
    chat:true,
    participants:false,
    meeting:false
    
  }
 export const Controls=(state = control, action)=>{
    switch (action.type) {
      case "chat":
        return {...state,chat:!state.chat}
      case "chatCondition":
          return {...state,chat:action.payload}
      case "chatModal":
        return {...state,chatModal:!state.chatModal}
        case "LeaveMeeting":
          return {...state,meeting:!state.meeting}
    case 'participants':
        return {...state,participants:!state.participants}
      default:
        return state;
    }
  
  }
  export const Logged=(state = {state:''}, action)=>{
    switch (action.type) {
      case "set_log":
        return {state:action.payload}
      default:
        return state;
    }
  
  }
  export const MessageList=(state = [], action)=>{
    switch (action.type) {
      case "save_message":
        return [...action.payload];
      case "save_one":
          return [...state,action.payload]
      default:
        return state;
    }
  
  }

  export const UnserInfor=(state = {}, action)=>{
    switch (action.type) {
      case "save_user":
        return action.payload

      default:
        return state;
    }
  
  }

  export const ParticipantsList=(state = [], action)=>{
    switch (action.type) {
      case "update_participants":
        return action.payload

      default:
        return state;
    }
  
  }