import {useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import congratsData from "../../../data/congrats.json"
import "./compmodes.css"

function CompAddition() {
    const operator = "+";
    const [operation, setOperation] = useState("");
    const [answer, setAnswer] = useState("");
    const [randomNumber, setRandomNumber] = useState("");
    const [randomNumber2, setRandomNumber2] = useState("");
    const [seconds, setSeconds] = useState(40);
    const [gameStatus, setGameStatus] = useState(false);
    const [points, setPoints] = useState(0)
    const [level, setLevel] = useState(1);
    const [correctCount, setCorrectCount] = useState(0) 
    const [showGif, setShowGif] = useState(false);
    const [showRecordGif, setShowRecordGif] = useState(false);

    let wonAudio = new Audio("/audio/correct.wav");
    let wrongAudio = new Audio("/audio/incorrect.wav");


    const [prevGameStatus, setPrevGameStatus] = useState(false);


    
    function startGame(){
        setMin(0);
        setMax(10)
        setPoints(0);
        setLevel(1);
        setGameStatus(true);
        setOperation("+");
        updateCountDown();
        randomNumberGenerator();


    }

    function updateCountDown(){
        setGameStatus(true);

    }


    useEffect(() => {
        if (gameStatus && seconds > 0) {
            const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
            return () => clearTimeout(timer); 
        } else if ( seconds <= 0) {
            setGameStatus(false);
            setSeconds(40);
            // let i = Math.round(Math.random() * 100); 
            // console.log(i);
            // toast.success(congratsData[i]);
        }
        if(!gameStatus && prevGameStatus){
            let i = Math.round(Math.random() * 100); 
            console.log(i);
            toast.success(congratsData[i]);

            localStorage.setItem("AdditionPoints", JSON.stringify(points));

            let additionTop = JSON.parse(localStorage.getItem("AdditionTop")) || [];
            const highestScore = Math.max(...additionTop);


            if(additionTop.length === 0){
                additionTop = []
            }
            additionTop.push(points);
            const newArraySorted = additionTop.toSorted((a,b) => b - a).slice(0, 10);
            localStorage.setItem("AdditionTop", JSON.stringify(newArraySorted));

            console.log("Highest score:", highestScore);
            console.log("Current points:", points);
            if(points > highestScore){
                setShowRecordGif(true);
                console.log("Highest score:", highestScore);
                console.log("Current points:", points);
                setTimeout(() => { setShowRecordGif(false);
                    }, 4000);
            }



        }
        setPrevGameStatus(gameStatus);

    }, [seconds, gameStatus]);
    
    
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(10);

    useEffect(() => {
        if(level === 1){
            setMin(0);
            setMax(10)
        }else if(level === 2){
            setMin(10);
            setMax(20);
        }
      }, [level]);
    


    function randomNumberGenerator(){

        const number1 = Math.round(Math.random()* (max - min) + min);
        const number2 = Math.round(Math.random()* (max - min) + min);
        setRandomNumber(number1);
        setRandomNumber2(number2);
        return;
    }


    const checkAnswer = () => {
        if(gameStatus === false){
            return;
        }

        const checkedanswer = calculateAnswer()

        if(answer == checkedanswer ){
            setCorrectCount(correctCount + 1)
            setAnswer("");
            setPoints(points+1)
            setSeconds(seconds + 3);
            randomNumberGenerator();
            wonAudio.play();

            
        } else{
            setAnswer("");
            setShowGif(true);

            setTimeout(() => { setShowGif(false);
            randomNumberGenerator();
            setOperation("+")
            }, 2500);
            // meanwhile --> 
            setRandomNumber();
            setRandomNumber2();
            setOperation("");
            wrongAudio.play();
            
        }
    }

    function calculateAnswer(){
        let answercheck;
        if(operator === "+"){
            answercheck = randomNumber + randomNumber2;
        }
        return answercheck;
    }

    useEffect(() => {
        if(correctCount === 3){
            setLevel(level + 1);
            setCorrectCount(0)
        }
      }, [correctCount]);


      

  return (
    <div> 
        <div>
            <p>LEVEL:{level}</p>
            <p>TIME: {seconds} sec</p>
            <p>BrainJuice: {points}  </p>
        </div>
    <div className= "body">
      {gameStatus === true ?<label className= "operation">{randomNumber} {operation} {randomNumber2}</label> : ""}
      <br />
        <br />
        <label className= "answer">{answer}</label>

    {showGif && (
    <div className="gif-popup">
    <img src="/gif/wrongans.gif"  />
    </div>
    )}

    {showRecordGif && (
    <div className="gif2-popup" >
    <img src="/gif/celebrate.gif"  />
    </div>
    )}

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

            {gameStatus === false ?<button className="button-00" onClick={() => startGame()}>START</button>  : undefined}
        </div>
        <ToastContainer 
            position="top-right"
            autoClose={3500}
            theme="dark"
            closeOnClick
            />
    </div>
    </div>
  )
}

export default CompAddition