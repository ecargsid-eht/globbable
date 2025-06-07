import React from 'react'

const Nav = ({ step, setStep, handleLogout }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light text-dark shadow">
        <div className="container">
          <a href="#" className="navbar-brand">
            <img src={require('../images/globbable.png')} alt="" />
          </a>

          {
            step !== 1 && (
              <ul className="navbar-nav">
                <li className="nav-item" onClick={() => handleLogout()}><a href="#" className="btn-link">Logout</a></li>
              </ul>)
          }
        </div>
      </nav>
    </>
  )
}

export default Nav