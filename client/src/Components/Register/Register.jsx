import React from 'react'
import "./Register.css"

export default function Register({changeShow}) {
    return (
        <div className="modalBackground" >

            <div className="box">
            <div className="closeButton" onClick={()=> changeShow(false)}>
            <i class="fas fa-times"></i>
            </div>
            <form action="" className="loginForm">
                <label htmlFor="">Username</label>
                <input  type="text" className="usernameLogin" />
                <label htmlFor="">Email</label>
                <input  type="password" className="passwordLogin" />
                <label htmlFor="">Password</label>
                <input  type="password" className="passwordLogin" />
                <button className="registerButton" type="submit">Sign Up</button>
            </form>
        </div>
        </div>

        
    )
}
