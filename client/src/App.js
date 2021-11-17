import Login from "./Components/LogIn/Login";
import Register from "./Components/Register/Register";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./pages/Home/Home"
import Articles from "./pages/Articles/Articles";
import { useContext } from "react";
import { Context } from "./Context/Context";



function App() {

  const {user} = useContext(Context);
  return (
    <>
    <Navbar/>
    <Home/>
    {/* <Articles/> */}
    </>
  );
}

export default App;
