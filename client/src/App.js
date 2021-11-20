import Login from "./Components/LogIn/Login";
import Register from "./Components/Register/Register";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./pages/Home/Home"
import Articles from "./pages/Articles/Articles";
import { useContext } from "react";
import { Context } from "./Context/Context";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";



function App() {

  const {user} = useContext(Context);


  return (
    <Router>
      <Navbar/>
    <Routes>
      <Route exact path="/" element={<Home/> }/>
      <Route  path="/articles" element={<Articles/>}/>
    </Routes>
    </Router>
    
  );
}

export default App;
