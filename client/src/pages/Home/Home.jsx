import React from 'react'
import Article_modal from '../../Components/Article_modal/Article_modal';
import Dashboard from '../../Components/Dashboard/Dashboard';
import Login from '../../Components/LogIn/Login'
import Navbar from '../../Components/Navbar/Navbar'
import "./home.css"

export default function Home() {
    const user = true;
    return (
        <>
        
        <div className="home">
           {!user && <Login/>}
           {/* {user && <Dashboard/>} */}
           <Article_modal/>
        </div>
        </>
    )
}
