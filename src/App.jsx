import { Routes, Route } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Home from "../Components/Home";
import About from "../Components/About";
import Games from "../Components/Games";
import SignIn from "../Components/Signin";
import SignUp from "../Components/SignUp";
import Profile from "../Components/Profile";
function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/games" element={<Games />} /> 
      <Route path="/signin" element={<SignIn/>} /> 
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/profile" element={<Profile/>} />
    </Routes>
    </>
  ) 
}

export default App