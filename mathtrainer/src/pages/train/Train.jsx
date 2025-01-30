import { useEffect, useState } from "react"
import "./train.css"
import {  useNavigate} from "react-router-dom";

function Train() {
  const buttons = ["Addition", "Subtraction", "Multiplication", "Division"];
  const difficultyLevels = ["Easy", "Medium", "Hard", "Expert"];
  const [activeButton, setActiveButton] = useState(JSON.parse(localStorage.getItem("settings")) || []);
  const [activeButton2, setActiveButton2] = useState("");
  const [time, setTime] = useState(60);
  const path = useNavigate();

  useEffect(() =>{
    const storedButton = JSON.parse(localStorage.getItem("settings"))
    if(storedButton){
      setActiveButton(storedButton)
    }
  }, [])
  useEffect(() =>{
    const storedButton2 = JSON.parse(localStorage.getItem("difficulty"))
    if(storedButton2){
      setActiveButton2(storedButton2)
    }
  }, [])


  const activeoperation = (index) => {

    localStorage.setItem("settings", JSON.stringify(index));
    setActiveButton(index);
  };
  
  

  const difficulty = (i) =>{

    localStorage.setItem("difficulty", JSON.stringify(i));
    setActiveButton2(i);
  }

  const go = () => {
    const settings = JSON.parse(localStorage.getItem("settings")) || [];
    if (settings === "Addition") {
      path("/addition");
      
    } else if (settings === "Subtraction") {
      path("/subtraction");
    } else if (settings === "Multiplication") {
      path("/multiplication");
    } else if (settings === "Division") {
      path("/division");
    }

    localStorage.setItem("time", JSON.stringify(time));

  };


  return (
    <div>
      <div>
        <label>Choose category</label> <br />

          <div className="operations">
            {buttons.map(button =>
              <div key={button}>
                <button className={activeButton === button ? "active" : "regular"} 
                onClick={() => activeoperation(button)}>
                  {button}
                </button>
                </div>
            )}
          </div>

            <br />
          <label>Choose category</label>
          <div className="operationslevel">
            {difficultyLevels.map(button =>
              <div key={button}>
                <button className={activeButton2 === button ? "active"  : "regular"} 
                onClick={() => difficulty(button)}>
                  {button}
                  </button>
                </div>
            )}
          </div>

        <div className="operationtime">
          <label htmlFor=""> Choose time</label> <br />
          <button disabled={time === 10} className="button" onClick={() => setTime(time - 5)}>-</button>
          <label > {time} sec</label> 
          <button className="button" onClick={() => setTime(time + 5)}>+</button> 
        </div>

        <br />
      
        <div><button onClick={go} className="button-64">START</button></div> 
       

      </div>
    </div>
  )
}

export default Train