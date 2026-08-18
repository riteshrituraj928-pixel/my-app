import { Routes, Route } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Home from "../Components/Home";
import About from "../Components/About";
import Games from "../Components/Games";
import SignIn from "../Components/Signin";
function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/games" element={<Games />} /> 
      <Route path="/signin" element={<SignIn/>} /> 
    </Routes>
    </>
  ) 
}

export default App