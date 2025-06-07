import './App.css';
import {io} from 'socket.io-client'
import {useEffect, useState} from 'react';
import CreateUser from './comps/CreateUser';
import OnlineUsers from './comps/OnlineUsers';
import ChatWithUser from './comps/ChatWithUser';
import { useRef } from 'react';
import Nav from './comps/Nav';
const socket = io(process.env.REACT_APP_SERVER_URL || "http://localhost:8000")


// I have commented strict mode in react index js
//  to prevent the twice useEffect run.

function App() {
  let userList;

  
  const sortNames = (username1,username2) => {
    return [username1,username2].sort().join('-');
  }

  const searchBar = (search) => {
    if(search === ""){
      // show full
      setUsers(permanentUsers)
    }
    else{
      setUsers(Object.fromEntries(Object.entries(permanentUsers).filter(([key]) => key.includes(search))))
      // console.log(searchedUsers);
    }
  }
  const [step,setStep]  = useState(1)
  const [username,setUsername]  = useState("")
  const [users,setUsers] = useState({})
  const [permanentUsers,setPermanentUsers] = useState({}); 
  const [message,setMessage] = useState("")
  const [receiver,setReceiver] = useState("")
  const [media,setMedia] = useState(null)
  const [groupMessage,setGroupMessage] = useState({})
  const receiverRef = useRef(null)
  // const searchRed = useRef(null);
  const iconRef = useRef(null);

  const handleSetUsername = (e) => {
    // console.log(username)
    e.preventDefault();
    if(username in users || username.length < 5){
      return
    }
    socket.emit("new_user",username)
    setStep(2)
  }

  const checkUsername = (username) => {
    if(username.length < 5 && username.length > 0){
      return "short";
    }
    else if(username in users){
      return "used";
    }
   return true
  }
 


  const selectUser = (name) => {
    setStep(3)
    receiverRef.current = name;
    setReceiver(name)
    }


  const sendMessage = (e) => {
    e.preventDefault()
    if(message === "" && media === null){
      return
    }
    const data = {
      sender:username,
      message,
      receiver,
      media
    }
    // console.log(data)
    console.log(data)
    socket.emit("send_message",data)
    setMessage("");
    setMedia(null);

    const key = sortNames(username,receiver);
    const tempGroupMessage = {...groupMessage};
    if(key in tempGroupMessage){
      tempGroupMessage[key] = [...tempGroupMessage[key],data]
    }
    else{
      tempGroupMessage[key] = [data]
    }

    setGroupMessage({...tempGroupMessage})

    // console.log(groupMessage)
  }

  useEffect(() => {
    socket.on("all_users",(user) => {
      // console.log([user])
      setPermanentUsers(user)
      setUsers(user);
    })



    socket.on("new_message",(data) => {
      // console.log(data)
      var arrayBufferView = new Uint8Array(data.media);
      const charArr = arrayBufferView.reduce((data, byte)=> (data + String.fromCharCode(byte)), '');
      let img = btoa(charArr);
      img = `data:img/jpeg;base64,${img}`
      // console.log(img)
      data = {...data,media:img}
      console.log(data);
      

      setGroupMessage( prevGroupMessage => {
        const msg = prevGroupMessage
        const key = sortNames(data.sender,data.receiver)

        if(key in msg){
          msg[key] = [...msg[key],data]
        }
        else{
          msg[key] = [data] 
        }

        return {...msg}
      })

    })

  },[])


  const handleLogout = () => {
    socket.disconnect()
    setStep(1);
    setUsername("")
    setPermanentUsers({})
    setUsers({})
  }

  

  // console.log(groupMessage)
  
  return (
    <>
      <Nav step={step} setStep={setStep} handleLogout={handleLogout}/>
    <div className="container">
          {(step === 1)&&
            <CreateUser checkUsername={checkUsername} username={username} setUsername={setUsername} handleSetUsername={handleSetUsername}/>
          }

          {
            (step === 2) &&
            <OnlineUsers searchBar={searchBar} step={step} username={username} selectUser={selectUser} users={users} />
          }

          {
            step === 3 &&  <ChatWithUser setMedia={setMedia} media={media} searchBar={searchBar} iconRef={iconRef} users={users} step={step} selectUser={selectUser} setStep={setStep} username={username} sortNames={sortNames} groupMessage={groupMessage} receiver={receiver} message={message} setMessage={setMessage} sendMessage={sendMessage}/>
          }
        {/* </div>
      </div> */}
    </div>
    </>
  );
}

export default App;
