import React, { useContext, useState } from 'react'
import Article_modal from '../../Components/Article_modal/Article_modal';
import Dashboard from '../../Components/Dashboard/Dashboard';
import Login from '../../Components/LogIn/Login'
import { Context } from '../../Context/Context';
import "./home.css"

export default function Home() {

    const [showArt, setShowArt] = useState(false);

    const {user, isFetching} = useContext(Context);
    // console.log(user.data.username);

    
    
    return [
        !isFetching ? <div className="home">
        {!user && <Login/>}
        {user && <Dashboard setShowArt={setShowArt}/>}
        {showArt && <Article_modal setShowArt={setShowArt}/>}
     </div>  : <div className="home">
         <img src="https://icon-library.com/images/spinner-icon-gif/spinner-icon-gif-26.jpg" alt="" />
     </div>
         
    ]
    
}
