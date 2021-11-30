import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./pages/Home/Home"
import Articles from "./pages/Articles/Articles";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



function App() {

  return (
    <Router>
      <Navbar/>
    <Routes>
      <Route exact path="/" element={<Home/> }/>
      <Route  path="/articles" element={<Articles/>}/>
      <Route  path="/public/articles" element={<Articles/>}/>
    </Routes>
    </Router>
    
  );
}

export default App;
