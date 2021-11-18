import React, { useContext, useRef, useState } from 'react'
import "./Register.css"
import axios from 'axios';
import { Context } from '../../Context/Context';

export default function Register({changeShow}) {

    const {dispatch, isFetching} = useContext(Context);
    
    const [error, setError] = useState(false);

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
            setError(true);
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
                    <input  type="text" className="usernameReg" ref={userRef}/>
                    <label htmlFor="">Email</label>
                    <input  type="email" className="passwordReg" ref={emailRef}/>
                    <label htmlFor="">Password</label>
                    <input  type="password" className="passwordReg" ref={passRef}/>
                    <label htmlFor="">Password Confirm</label>
                    <input  type="password" className="passwordReg" ref={passConfRef}/>
                    {error && <p className="errorInfoReg">Passwords do not match, try again!</p>}
                </div>
                <button className="regButton" type="submit">Sign Up</button>
            </form>
        </div>
        </div>

        
    )
}
