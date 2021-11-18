import React, { useState, useRef, useContext } from 'react'
import { Context } from '../../Context/Context';
import Register from '../Register/Register'
import axios from 'axios';
import "./login.css"

export default function Login() {

    const { dispatch, isFetching } = useContext(Context)

    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);

    const userRef = useRef();
    const passRef = useRef();

    const showModal = () => {
        setShow(!show);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        dispatch({type: "LOGIN_START"});
        try {
            const res = await axios.post('/login',{
                username: userRef.current.value,
                password: passRef.current.value
            });
            dispatch({type: "LOGIN_SUCCESS", payload: res.data.data});
            localStorage.setItem('jwt', res.data.jwt);
        } catch(err) {
            setError(true)
            dispatch({type: "LOGIN_FAILURE"});
        }
    }

    return (
        <>
        <div className="login">
            <div className="box">
                {error && <p className="errorInfo">Wrong username or password, try again!</p>}
            <form action="" className="loginForm" onSubmit={handleSubmit}>
            <div className="inputBoxes">
                <label htmlFor="">Username</label>
                <input ref={userRef}  type="text" className="usernameLogin" />
                <label htmlFor="">Password</label>
                <input ref={passRef}  type="password" className="passwordLogin" />

            </div>
                <button className="loginButton" type="submit">Login</button>
            </form>
                <button className="registerButton" onClick={showModal}>Register</button>
            </div>
        </div>
               {show && <Register changeShow={setShow}/>}
        </>
    )
}
