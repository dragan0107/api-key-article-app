import React, { useContext, useRef } from 'react'
import "./Register.css"
import axios from 'axios';
import { Context } from '../../Context/Context';

export default function Register({changeShow}) {

    const {dispatch, isFetching} = useContext(Context)

    const userRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    const passConfRef = useRef();

    const handleSubmit = async(e) => {
        e.preventDefault();
        dispatch({type: "LOGIN_START"});
        try {
            const res = await axios.post('/register', {
            username: userRef.current.value,
            email: emailRef.current.value,
            password: passRef.current.value,
            passwordConfirm: passConfRef.current.value
});

        localStorage.setItem('jwt', res.data.jwt);
        dispatch({type: "LOGIN_SUCCESS", payload: res.data.data});
        // window.location.replace('/');
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="modalBackground" >

            <div className="box">
            <div className="closeButton" onClick={()=> changeShow(false)}>
            <i class="fas fa-times"></i>
            </div>
            <form action="" className="loginForm" onSubmit={handleSubmit}>
                <div className="inputGroup">
                    <label htmlFor="">Username</label>
                    <input  type="text" className="usernameLogin" ref={userRef}/>
                    <label htmlFor="">Email</label>
                    <input  type="email" className="passwordLogin" ref={emailRef}/>
                    <label htmlFor="">Password</label>
                    <input  type="password" className="passwordLogin" ref={passRef}/>
                    <label htmlFor="">Password Confirm</label>
                    <input  type="password" className="passwordLogin" ref={passConfRef}/>
                </div>
                <button className="registerButton" type="submit">Sign Up</button>
            </form>
        </div>
        </div>

        
    )
}
