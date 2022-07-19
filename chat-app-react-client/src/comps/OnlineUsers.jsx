import React from 'react'

const OnlineUsers = ({selectUser,users,username,step,receiver,searchBar}) => {

  
    
  return (
    <div className={`${step === 2 && 'container mt-4'}`}>
      <div className={`${step===2 && 'col-4 mx-auto'}`}>
      <div className={`card w-100 border-0 ${step === 2 && 'shadow'}`} >
        <div className="card-body mx-0 p-0 d-flex flex-column" style={{backgroundImage: "linear-gradient(to right top, #e76c81, #eb7f91, #ee91a1, #f1a3b1, #f3b5c0)",borderRadius:"20px"}}>
          {/* <img src="https://www.seekpng.com/png/full/110-1100707_person-avatar-placeholder.png" width={"40px"} className="rounded-circle shadow-4" style={{backgroundColor:"white",}} alt="" /> */}
          <p className="display-6 my-4 ms-3">
            Hi, {username}!
          </p>

          <div className='w-100 px-3 bg-light' style={{height:"100%",borderRadius:"20px",alignSelf:"stretch"}}>
            <div className="input-container position-relative p-0 m-0 mb-3 fixed-top">
              <i className="bi bi-search position-absolute" style={{right:"15px",top:"5px"}}></i>
              <input type="text" placeholder='Search user to chat.' onChange={(e) => searchBar(e.target.value)} className="form-control shadow-sm mt-3 border-0 fw-light" style={{backgroundColor:"white"}} />
            </div>

            <p className="small fw-bold">Online Users - {Object.keys((users)).filter((user) => username !== user).length}</p>
            {
                    (users) && Object.keys(users).map((user,index) => username!== user && (
                      <div onClick={() => selectUser(user)} className="chat container bg-white py-2 my-2 d-flex align-items-center justify-content-between rounded-3 shadow-sm" key={index} style={{cursor:"pointer", backgroundColor:(user === receiver) ? "#ddd" : "white"}}>
                         <div>
                          <span className='me-3'><img src={`https://picsum.photos/30/30?random=${index}`} style={{borderRadius:"20px"}} alt="" /></span>
                          <span className='lead'>{user}</span>
                         </div>
                        
                         <span className="float-end small text-success">Online</span>
                      </div>

                    )
                    )
            }
          </div>
        </div>

      </div>
    </div>
    </div>
  )
}

export default OnlineUsers