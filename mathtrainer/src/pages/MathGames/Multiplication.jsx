import {useEffect, useRef, useState } from "react"
import styles from "/src/pages/MathGames/compmodes.module.css"
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase"; 
import { saveScore } from "../../firebase/savescore";

function Multiplication() {
    const [operation, setOperation] = useState("");
    const [answer, setAnswer] = useState("");
    const [randomNumber, setRandomNumber] = useState("");
    const [randomNumber2, setRandomNumber2] = useState("");
    const [seconds, setSeconds] = useState(40);
    const [extraPoints, setExtraPoints] = useState(1);
    const [gameStatus, setGameStatus] = useState(false);
    const [points, setPoints] = useState(0)
    const [level, setLevel] = useState(1);
    const [correctCount, setCorrectCount] = useState(0) 
    const [showGif, setShowGif] = useState(false);
    const navigate = useNavigate();
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(10);
    const timerRef = useRef(null);

    let wonAudio = new Audio("/audio/correct.wav");
    let wrongAudio = new Audio("/audio/incorrect.wav");

    function startGame(){
        setGameStatus(true);
        setOperation("x");
        setGameStatus(true);
        randomNumberGenerator();
        pointsTimer();
    }


// timer and endgame routing
useEffect(() => {
    if (gameStatus && seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else if (seconds <= 0) {
      if (!auth.currentUser) {
        return;
      }

      localStorage.setItem("points", JSON.stringify(points));
      localStorage.setItem("game", JSON.stringify("Multiplication"));

      // Save the score and send it to another file
      const userId = auth.currentUser.uid; 
      saveScore(points, userId, "multiplication_scores/"); 

      // Liigu lõpu ekraanile
      navigate("/games/end", { state: { from: "games/multiplication" } });
    }
  }, [seconds, gameStatus]);
    
    


    useEffect(() => {
        if(level === 1){
            setMin(1);
            setMax(5)
        }else if(level === 2){
            setMin(2);
            setMax(10);
        }else if(level === 3){
            setMin(5);
            setMax(20);
        }else if(level === 4){
            setMin(10);
            setMax(50);
        }else if(level === 5){
            setMin(20);
            setMax(100);
        }else if(level === 6){
            setMin(50);
            setMax(500);
        }
      }, [level]);
    


    function randomNumberGenerator(){
        const number1 = Math.round(Math.random()* (max - min) + min);
        const number2 = Math.round(Math.random()* (max - min) + min);
        setRandomNumber(number1);
        setRandomNumber2(number2);
        return;
    }

    function pointsTimer(){
        setExtraPoints(2);
        if(level === 1 ){
            timerRef.current = setInterval(() =>{
                setExtraPoints(prevPoints => prevPoints > 1 ? prevPoints - 0.1 : 1 )
            }, 500)
        }else if(level === 2){
            timerRef.current = setInterval(() =>{
                setExtraPoints(prevPoints => prevPoints > 1 ? prevPoints - 0.1 : 1 )
            }, 1000)
        } else if(level === 3){
            timerRef.current = setInterval(() =>{
                setExtraPoints(prevPoints => prevPoints > 1 ? prevPoints - 0.1 : 1 )
            }, 1000)
        }else if(level === 4){
            timerRef.current = setInterval(() =>{
                setExtraPoints(prevPoints => prevPoints > 1 ? prevPoints - 0.08 : 1 )
            }, 1000)
        }else if(level === 5){
            timerRef.current = setInterval(() =>{
                setExtraPoints(prevPoints => prevPoints > 1 ? prevPoints - 0.05 : 1 )
            }, 1000)
        }else if(level === 6){
            timerRef.current = setInterval(() =>{
                setExtraPoints(prevPoints => prevPoints > 1 ? prevPoints - 0.025 : 1 )
            }, 1000)
        }                        
    }



    const checkAnswer = () => {
        if(gameStatus === false){
            return;
        }
        
        const checkedanswer = randomNumber * randomNumber2

        if(answer == checkedanswer ){
            setCorrectCount(correctCount + 1)
            setAnswer("");
            console.log(extraPoints);

            setPoints(prevPoints => Math.round(prevPoints + ((level * 10) * extraPoints)));
            setSeconds(seconds + 4);
            randomNumberGenerator();
            wonAudio.play();
            clearTimeout(timerRef.current); 
            pointsTimer();
            
        } else{
            setAnswer("");
            setShowGif(true);

            setTimeout(() => { setShowGif(false);
            randomNumberGenerator();
            setOperation("x")
            }, 2500);
            // meanwhile --> 
            setRandomNumber();
            setRandomNumber2();
            setOperation("");
            wrongAudio.play();
        }
    }

    useEffect(() => {
        if(correctCount === 6){
            setLevel(level + 1);
            setCorrectCount(0)
        }
      }, [correctCount]);

 


      

  return (
    <div> 
            <div className={styles.statsbox}>
                <p>LEVEL:{level}</p>
                <p>TIME: {seconds} sec</p>
                <p>POINTS: {points}  </p>
            </div>
    
            <div className= {styles.body}>
                    {gameStatus === true ? <label className= {styles.operation}>{randomNumber} {operation} {randomNumber2}</label> : ""}
                    <br />
                    <br />
                    <label className= {styles.answer}>{answer}</label>
    
                        {showGif && (
                        <div className={styles.gif_popup}>
                        <img src="/gif/wrongans.gif"  />
                        </div>
                        )}
    
                <br />
    
                <div >
                    <div className={styles.keyboard}>
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
    
                    {gameStatus === false ?<button className={styles.button_00} onClick={() => startGame()}>START</button>  : undefined}
                </div>
           
            </div>
        </div>
      )
    }
export default Multiplication