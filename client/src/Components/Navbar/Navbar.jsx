import React, {useContext} from 'react'
import { Context } from '../../Context/Context';
import "./navbar.css"

export default function Navbar() {

  const {user, dispatch} = useContext(Context);

  const handleClick = () => {
      localStorage.removeItem('jwt');
      dispatch({type: "LOGOUT"});
  }

  // console.log(user);
    return (
        <div class="topbar">
      <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
        <a class="navbar-brand" >Forlogis</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
         <span class="navbar-toggler-icon"></span>
      </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" >Home <span class="sr-only">(current)</span></a>
              </li>
              </ul>
          {user && <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="logout nav-link" onClick={handleClick}>Log Out <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
               <a class="nav-link">{user.username}<span class="sr-only">(current)</span></a>
              </li>
           </ul>}
          </div>
      </nav>
    </div>
    )
}
