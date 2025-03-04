import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import AdditionScores from "./AdditionScores";
import DivisionScores from "./DivisionScores";
import MultiplicationScores from "./MultiplicationScores";
import styles from "./statistics.module.css"
import SubtractionScores from "./SubtractionScores";
import { useState } from "react";
import {  getDatabase} from "firebase/database";
import { auth } from "../../firebase/firebase";



function Statistics() {
  const [category, setCategory] = useState(null)
   const realtimeDB = getDatabase();
 
  return (
    <div className={styles.top}>
      <div className={styles.navbar}>
      <Sidebar>
          <Menu>
            <br />
            <MenuItem >GAMES</MenuItem>
            <br />
        
            <SubMenu label="Math">
              <MenuItem onClick={() => setCategory("addition")}> Addition</MenuItem>
              <MenuItem onClick={() => setCategory("subtraction")}> Subtraction </MenuItem>
              <MenuItem onClick={() => setCategory("division")}> Division </MenuItem>
              <MenuItem onClick={() => setCategory("multiplication")}> Multiplication </MenuItem>

            </SubMenu>
            <MenuItem onClick={() => setCategory("FLEXIBILITY")}>Flexibility</MenuItem>

          </Menu>
        </Sidebar>
      </div>
      <div className={styles.stats}>
        {category === null ? <div className={styles.cat}> Please choose category</div> : null }
        { category === "addition" ? <AdditionScores /> : null}
        {category === "subtraction" ? <SubtractionScores /> : null}
        { category === "multiplication" ?<MultiplicationScores /> : null}
        { category === "division" ?<DivisionScores /> : null}
      </div>
    </div>
  );
}



export default Statistics;