import {  Route, Routes } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home"
import './App.css'

import NavBar from "./components/NavBar";
import Games from "./pages/Games";
import EndGameLanding from "./pages/endgame/EndGameLanding";
import Addition from "./pages/MathGames/Addition";
import Subtraction from "./pages/MathGames/Subtraction";
import Multiplication from "./pages/MathGames/Multiplication";
import Division from "./pages/MathGames/Division";

function App() {

  return (
    <>
    <div className="MAINROOT">
    <NavBar />
    
        <Routes>
<Route path="/home" element={< Home />} />

  <Route path="/games" element={< Games />} /> 
  <Route path="/games/addition" element={< Addition />} /> 
  <Route path="/games/subtraction" element={< Subtraction />} /> 
  <Route path="/games/multiplication" element={< Multiplication />} /> 
  <Route path="/games/division" element={< Division />} />
  <Route path="/games/end" element={< EndGameLanding />} /> 




</Routes>
</div>
    </>
  )
}

export default App
