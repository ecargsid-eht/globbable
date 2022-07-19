import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const CreateUser = ({handleSetUsername,username,setUsername,checkUsername}) => {
  const [nameError,setNameError] = useState(false)
    useEffect(() => {
      setNameError(checkUsername(username))
      // console.log(nameError)
    },[username])
  return (
    // <div className="d-flex">
            <>
              <div className="container mt-5">
                <div className="row">
                <div className="col-6 pt-4">
                  <div className="">
                  <p className="display-4 fw-bold col-8" style={{letterSpacing:"-1px",fontWeight:"bolder",lineHeight:"54px"}}>
                    It's fun time with SocioSnap.
                  </p>
                  <p className="lead fs-5 mt-3 col-9" style={{fontWeight:"300"}}>
                  SocioSnap is a complete fun-based chatting platform that lets you connect throughout the world.
                  </p>
                  <form onSubmit={(e) => handleSetUsername(e)} className="mt-4 col-9">
                    <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Choose a username.. Eg.'knight12'" type="text" style={{backgroundColor:"#ddd"}} className="form-control fw-light border-0 py-3 px-4 fs-5" />
                    {(nameError === "used") && 
                    <p className="small text-danger">The username is already in use.</p>
                    }
                    {(nameError === "short") && 
                    <p className="small text-danger">The username is too short (At least 5 characters needed)..</p>
                    }
                    <button disabled={!nameError} className='fs-2 fw-bold rounded-3 px-4 py-2 mt-3 float-end animationButton' style={{border:"3px solid #e76c81"}}>Get Started</button>
                  </form>
                  </div>
                </div>
                <div className="col-6 pt-2">
                  <video autoPlay loop playsInline muted src="https://www.livechat.com/live-chat-app.edf8d10b57eb5e0b135b377edc90064f66d434910cd1def15a4f0ccaa4453857.mp4" width={"650"} height={"550"} data-bs-target={"lazyplay.video"}></video>
                </div>
                </div>
              </div>
            </>
    // </div>
  )
}

export default CreateUser