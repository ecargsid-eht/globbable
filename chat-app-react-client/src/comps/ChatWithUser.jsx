import React from 'react'
import OnlineUsers from './OnlineUsers'

const ChatWithUser = ({ setMedia,media,iconRef,step, selectUser, users, setStep, sendMessage, message, setMessage, receiver, sortNames, groupMessage, username,searchBar }) => {
  const messages = groupMessage ? groupMessage[sortNames(username, receiver)] : [null]
  // console.log(messages)
  const openFileInput = () => {
    // console.log(iconRef)
    iconRef.current.click()
  }
  return (
    <div className="container mt-4">
      {/* <div className="row"> */}
      <div className="card p-0 border-0 shadow-lg w-100" style={{ borderRadius: "20px" }}>
        <div className="card-body p-0">
          <div className="row">
            <div className="col-3 px-0">
              <OnlineUsers searchBar={searchBar} username={username} selectUser={selectUser} users={users} step={step} />
            </div>
            <div className="col-9 px-0">
              <div className="card border-0 w-100" >
                <div className="card-header d-flex align-items-top bg-white" style={{ borderTopRightRadius: "20px" }}>
                  <i onClick={() => setStep(2)} class="bi bi-arrow-left-circle-fill fs-2" style={{cursor:"pointer"}}></i>
                  <div className=''>
                    <p className='ms-2 lead mb-0'>{receiver}</p>
                    <span className="ms-2 small text-success">online</span>
                  </div>
                </div>

                <div className="card-body" style={{ overflowY: "scroll" }}>
                  <ul className='nav flex-column' style={{ display: "flex" }}>
                    {
                      messages?.length > 0 && messages.map((msg, index) => (
                        <div
                          className='mt-3 '
                          style={{
                            display: "flex",
                            flexDirection: (username === msg.receiver) ? "row" : "row-reverse",
                          }}>
                          <div
                            className='py-1 px-3 rounded-3'
                            style={{
                              backgroundColor: (username === msg.receiver) ? "#6ce7d2" : "#f0a6b3",
                              maxWidth: "400px"

                            }}>
                            {(msg.media !== null) && (
                              <img src={(username === msg.sender) ? URL.createObjectURL(msg.media) : msg.media} alt="" style={{display:"block",maxWidth:"270px",maxHeight:"300px"}} />
                            )}
                            {msg.message}
                            
                          </div>
                        </div>
                      ))
                    }
                  </ul>

                </div>

                <div className="card-footer  border-0 bg-white">
                  {media !== null && (
                    <img src={URL.createObjectURL(media)} alt="" style={{maxWidth:"100px",maxHeight:"110px",margin:"20px 20px",border:"2px solid black"}} />
                    
                  )}
                  <div className='position-relative'>
                  <form action="" className='d-flex' onSubmit={(e) => sendMessage(e)}>
                    <textarea name="" onChange={(e) => (setMessage(e.target.value))} className='form-control border-0' value={message} placeholder='Send message' rows={1} style={{ flex: 1, backgroundColor: "#eee" }}></textarea>
                    <input type="file" ref={iconRef} hidden onChange={(e) => setMedia(e.target.files[0])} />
                    <button className='border-0 position-absolute icon' style={{ top: "05px", right: "60px" }} onClick={() => openFileInput()}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-paperclip" viewBox="0 0 16 16">
                        <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                      </svg>
                    </button>
                    <button className='border-0 position-absolute icon' style={{ top: "05px", right: "20px" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                      </svg>
                    </button>
                  </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}

export default ChatWithUser