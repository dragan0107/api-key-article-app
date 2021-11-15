import React, { useState } from 'react'
import Register from '../Register/Register'
import "./login.css"

export default function Login() {

    const [show, setShow] = useState(false);

    const showModal = () => {
        setShow(!show);
    }

    return (
        <>
        <div className="login">
            <div className="box">
            <form action="" className="loginForm">
                <label htmlFor="">Username</label>
                <input  type="text" className="usernameLogin" />
                <label htmlFor="">Password</label>
                <input  type="password" className="passwordLogin" />
                <button className="loginButton" type="submit">Login</button>
            </form>
                <button className="registerButton" onClick={showModal}>Register</button>
            </div>
        </div>
               {show && <Register changeShow={setShow}/>}
        </>
    )
}
