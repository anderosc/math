import {  Link, useLocation } from "react-router-dom";
import "./games.css"
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

function Games() {
  const location = useLocation();


  useEffect(() => {
    // Kontrollime, kas eelmine leht oli 'games/addition'
    if (location.state && location.state.from === 'games/addition') {
      toast.success("Sa jõudsid Additioni lehelt!");
    }
  }, [location]); 

  const setLastGameLS = (i) => {
    localStorage.setItem("game", JSON.stringify(i));
  }
 
  
  
    return (

        <div className="gamestop" >


        <h1 className="gamesh1" >Math</h1>
        <div className="gamesbox" >
          <Link onClick={() => setLastGameLS("addition")} className="Link" to="/games/3drotation">
              <div className="singlegame" >
              <img src="/games/math/addition.png" className="gameimage" alt="Subtraction"  />
              <div>Addition</div>
              </div>
            </Link>
            <Link onClick={() => setLastGameLS("subtraction")} className="Link" to="/games/subtraction">
              <div className="singlegame" >
              <img src="/games/math/subtraction.png" className="gameimage" />
              <div>Subtraction</div>
              </div>
            </Link>
            <Link onClick={() => setLastGameLS("multiplication")} className="Link" to="/games/multiplication">
              <div className="singlegame" >
              <img src="/games/math/multiplication.png" className="gameimage"  />
              <div>Multiplication</div>
              </div>
            </Link>
            <Link onClick={() => setLastGameLS("division")} className="Link" to="/games/division">
              <div className="singlegame" >
              <img src="/games/math/division.png" className="gameimage"  />
              <div>Division</div>
              </div>
            </Link>
        </div>
        <br />


        <h1 className="gamesh1" >Spatial reasoning</h1>

        <div className="gamesbox" >
            <Link onClick={() => setLastGameLS("3DRotation")} className="Link" to="/games/3drotation">
              <div className="singlegame" >
              <img src="/games/math/division.png" className="gameimage"  />
              <div>3D rotation</div>
              </div>
            </Link>
        </div>


        
          
       
        <ToastContainer 
         position="top-right"
         autoClose={3500}
         theme="dark"
         closeOnClick
         />
        </div>
         
      );
    };
export default Games