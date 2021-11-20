import React, { useContext, useRef, useState } from 'react'
import "./Register.css"
import axios from 'axios';
import { Context } from '../../Context/Context';

export default function Register({changeShow}) {

    const {dispatch, isFetching} = useContext(Context);
    
    const [error, setError] = useState(false);
    const [usernameErr, setUsernameErr] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const userRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    const passConfRef = useRef();

    const handleChange = async (e) => {
        setUsernameErr(false)
        setErrorMsg("");
        const res = await axios.post('/getUser',{
            inputUser: e.target.value
        });

        if(!res.data.user) {
            setUsernameErr(false)
            setErrorMsg("");
            
        } else {
            setUsernameErr(true)
            setErrorMsg("Username already taken, choose a different one!");
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        dispatch({type: "LOGIN_START"});

        

        if (passRef.current.value === passConfRef.current.value) {

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
        } else {
            dispatch({type: "LOGIN_FAILURE"})
            setError(true);
            setErrorMsg("Passwords do not match, try again!");
        }
    }

    return (
        <div className="modalBackgroundReg" >

            <div className="boxReg">
            <div className="closeButton" onClick={()=> changeShow(false)}>
            <i class="fas fa-times"></i>
            </div>
            <form action="" className="registerForm" onSubmit={handleSubmit}>
                <div className="inputGroupReg">
                    <label htmlFor="">Username</label>
                    <input  type="text" className="usernameReg" ref={userRef} onChange={handleChange}/>
                    <label htmlFor="">Email</label>
                    <input  type="email" className="passwordReg" ref={emailRef}/>
                    <label htmlFor="">Password</label>
                    <input  type="password" className="passwordReg" ref={passRef}/>
                    <label htmlFor="">Password Confirm</label>
                    <input  type="password" className="passwordReg" ref={passConfRef}/>
                    {(error || usernameErr) && <p className="errorInfoReg">{errorMsg}</p>}
                </div>
                <button className="regButton" type="submit" disabled={usernameErr ? true : false} >Sign Up</button>
            </form>
        </div>
        </div>

        
    )
}
