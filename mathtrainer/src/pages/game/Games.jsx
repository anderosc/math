import {  Link } from "react-router-dom";
import "./games.css"
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';


function Games() {
  const setLastGameLS = (i) => {
    localStorage.setItem("game", JSON.stringify(i));
  }
 
  
  
    return (
      <div className="games">
        <img className="backgroundimg" src="/menupics/leaf.png" alt="" />
            <div className="menu">
            <Sidebar>
  <Menu> <br />
    <div> GAMES </div>
    <br />
    <MenuItem> Math </MenuItem>
    <MenuItem> Spatial reasoning </MenuItem>
  </Menu>
</Sidebar>;
            </div>
          
        <div className="gamestop" >
        
        <div className="menusection">
        <div className="gamesh1" >MATH</div>
        <div className="gamesbox" >
          <div className="gamesboxinside">
          <Link onClick={() => setLastGameLS("addition")} className="Link" to="/games/addition">
              <div className="singlegame" >
              <img src="/games/math/addition.png" className="gameimage" alt="Subtraction"  />
              <div>Addition</div>
              </div>
            </Link>
            </div>
           

            <div className="gamesboxinside">
            <Link onClick={() => setLastGameLS("subtraction")} className="Link" to="/games/subtraction">
              <div className="singlegame" >
              <img src="/games/math/subtraction.png" className="gameimage" />
              <div>Subtraction</div>
              </div>
            </Link>
            </div>


            <div className="gamesboxinside">
            <Link onClick={() => setLastGameLS("multiplication")} className="Link" to="/games/multiplication">
              <div className="singlegame" >
              <img src="/games/math/multiplication.png" className="gameimage"  />
              <div>Multiplication</div>
              </div>
            </Link>
            </div>

            <div className="gamesboxinside">
            <Link onClick={() => setLastGameLS("division")} className="Link" to="/games/division">
              <div className="singlegame" >
              <img src="/games/math/division.png" className="gameimage"  />
              <div>Division</div>
              </div>
            </Link>
            </div>
        </div>
        </div>
        <br />


        <div className="menusection">
        <div className="gamesh1" >SPATIAL REASONING</div>

        <div className="gamesbox" >
        <div className="gamesboxinside">
            <Link onClick={() => setLastGameLS("3DRotation")} className="Link" to="/games/3drotation">
              <div className="singlegame" >
              <img src="/games/math/division.png" className="gameimage"  />
              <div>3D rotation</div>
              </div>
            </Link>
            </div>
        </div>
        </div>


        <div className="menusection">
        <div className="gamesh1" >BINARY</div>

        <div className="gamesbox" >
        <div className="gamesboxinside">
            <Link onClick={() => setLastGameLS("3DRotation")} className="Link" to="/games/binary">
              <div className="singlegame" >
              <img src="/games/math/division.png" className="gameimage"  />
              <div>Binary Conversion</div>
              </div>
            </Link>
            </div>
            </div>

        </div>

        </div>
        </div>
         
      );
    };
export default Games