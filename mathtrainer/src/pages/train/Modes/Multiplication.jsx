import {useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import congratsData from "../../../data/congrats.json"
import "./modes.css"

function Multiplication() {
  const operator = "*";
  const [operation, setOperation] = useState("");
  const [answer, setAnswer] = useState("");
  const [randomNumber, setRandomNumber] = useState("");
  const [randomNumber2, setRandomNumber2] = useState("");
  const difficultyLS = JSON.parse(localStorage.getItem("difficulty"));
  const [minutes, setMinutes] = useState();
  const [seconds, setSeonds] = useState();
  let time = JSON.parse(localStorage.getItem("time"));
  const [gameStatus, setGameStatus] = useState(false);
  const [points, setPoints] = useState(0)
  const [endText, setEndText] = useState("")



  
  function startGame(){
      setPoints(0)
      setGameStatus(true)
      setOperation(operator)
      updateCountDown();
      randomNumberGenerator()
  }



  function updateCountDown(){
      const gameInterval = setInterval(() => {
          if (time > 0){
              time--;
              setMinutes(Math.floor(time / 60));
              setSeonds(time % 60);
          }else{
              clearInterval(gameInterval);
              setGameStatus(false)
              let i = Math.round(Math.random()* 100); 
              toast.success(congratsData[i])
          }
      }, 1000)
  }


  function randomNumberGenerator(){
      let min;
      let max;
      if(difficultyLS === "Easy"){
          min = 0;
          max = 10;
      }else if(difficultyLS === "Medium"){
          min = 5;
          max = 20;
      }else if(difficultyLS === "Hard"){
          min = 20;
          max = 100;

      }else if(difficultyLS === "Expert"){
          min = 50;
          max = 200;
      }
      
      let number1 = Math.round(Math.random()* (max - min) + min);
      let number2 = Math.round(Math.random()* (max - min) + min);
      setRandomNumber(number1)
      setRandomNumber2(number2)
      console.log(difficultyLS)
      
      return;
  }


  const checkAnswer = () => {
      if(gameStatus === false){
          return;
      }
      const checkedanswer = calculateAnswer()
      if(answer == checkedanswer ){
          setAnswer("");
          randomNumberGenerator();
          setPoints(points+1)
      } else{
          setAnswer("");
          randomNumberGenerator();
      }
  }

  useEffect(() => {
      setEndText(`Your last score: ${points}`);
  }, [points]);

  function calculateAnswer(){
      let answercheck;
          answercheck = randomNumber * randomNumber2;
      return answercheck;
  }

return (
  <div className= "body">
      {gameStatus === true ?<label className= "operation">{randomNumber} {operation} {randomNumber2}</label> : ""}
      <br />
      <br />
      <label className= "answer">{answer}</label>
      <br />
      <div >
          <div className="keyboard">
          <button onClick={() => setAnswer(answer + "7")}>7</button>
          <button onClick={() => setAnswer(answer + "8")}>8</button>
          <button onClick={() => setAnswer(answer + "9")}>9</button>
          <br />
          <button onClick={() => setAnswer(answer + "4")}>4</button>
          <button onClick={() => setAnswer(answer + "5")}>5</button>
          <button onClick={() => setAnswer(answer + "6")}>6</button>
          <br />
          <button onClick={() => setAnswer(answer + "1")}>1</button>
          <button onClick={() => setAnswer(answer + "2")}>2</button>
          <button onClick={() => setAnswer(answer + "3")}>3</button>
          <br />
          <button onClick={() => setAnswer(answer + "0")}>0</button>
          <button onClick={() => setAnswer(answer.slice(0, answer.length-1, ))}>C</button>
          <button onClick={() => checkAnswer()}>OK</button>
          </div>
          <br />
          <br />

          {gameStatus === false ?<button onClick={() => startGame()}>START</button>  : undefined}
          {gameStatus === true ? <div>{minutes}:{seconds} </div> : undefined} <br />
          {gameStatus === true ?  <div>Times brain thank you: {points}</div> : undefined }
          {gameStatus === false ? <div>{endText}</div> : undefined  }
      </div>
      <ToastContainer 
          position="top-right"
          autoClose={3500}
          theme="dark"
          closeOnClick
          />
  </div>
)
}

export default Multiplication