import React, {useContext} from 'react'
import { Context } from '../../Context/Context';
import "./navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {

  const {user, dispatch} = useContext(Context);

  const handleClick = () => {
      localStorage.removeItem('jwt');
      dispatch({type: "LOGOUT"});
  }

  // console.log(user);
    return (
        <div class="topbar">
      <nav class="navClass navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="appBrand navbar-brand" > <i class="logoIcon fab fa-foursquare"></i>orlogis</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
         <span class="navbar-toggler-icon"></span>
      </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
              <Link className="routerLink" to="/">
                <a class="nav-link links" >Home <span class="sr-only">(current)</span></a>
              </Link>
              </li>
              <li class="nav-item">
              {user && <Link className="routerLink" to="/articles">
                <a class="nav-link links" >Articles <span class="sr-only">(current)</span></a>
              </Link>}
              </li>
              </ul>
              {user && <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="logout nav-link" onClick={handleClick}>Log Out <i class="fas fa-sign-out-alt"></i> <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item logged">
               <a class="nav-link"><span className="loggedIn">Logged in <i class="fas fa-user"></i> </span><span className="username">{user.username}</span><span class="sr-only">(current)</span></a>
              </li>
           </ul>}
          </div>
      </nav>
    </div>
    )
}
