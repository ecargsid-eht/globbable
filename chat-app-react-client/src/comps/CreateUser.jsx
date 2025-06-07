import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Lottie from "lottie-react";
import chatting from "../images/chatting.json";

const CreateUser = ({ handleSetUsername, username, setUsername, checkUsername }) => {
  const [nameError, setNameError] = useState(false)
  useEffect(() => {
    setNameError(checkUsername(username))
    // console.log(nameError)
  }, [username])
  return (
    // <div className="d-flex">
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-6 mt-5 pt-5">
            <div className="">
              <p className="display-4 fw-bold col-8" style={{ letterSpacing: "-1px", fontWeight: "bolder", lineHeight: "54px" }}>
                It's fun time with Globbable.
              </p>
              <p className="lead fs-5 mt-3 col-9" style={{ fontWeight: "300" }}>
                Globbable is a complete fun-based chatting platform that lets you connect throughout the world.
              </p>
              <form onSubmit={(e) => handleSetUsername(e)} className="mt-4 col-9">
                <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Choose a username.. Eg.'knight12'" type="text" style={{ backgroundColor: "#ddd" }} className="form-control fw-light border-0 py-3 px-4 fs-5" />
                <p className="small text-danger">
                  {nameError === "used" && "The username already exists."}
                  {nameError === "short" && "The username is too short. (at least 5 characters needed).."}
                </p>
                {/* {(nameError === "used") &&
                  <p className="small text-danger">The username is already in use.</p>
                }
                {(nameError === "short") &&
                  <p className="small text-danger">The username is too short (At least 5 characters needed)..</p>
                } */}
                <button disabled={!nameError} className='fs-2 fw-bold rounded-3 px-4 py-2 float-end animationButton' style={{ border: "3px solid #e76c81" }}>Get Started</button>
              </form>
            </div>
          </div>
          <div className="col-6">
            <Lottie
              animationData={chatting}
            />
          </div>
        </div>
      </div>
    </>
    // </div>
  )
}

export default CreateUser