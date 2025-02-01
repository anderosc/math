import {useEffect, useState } from "react"
import "./compmodes.css"
import { useNavigate } from "react-router-dom";

function Addition() {
    const [operation, setOperation] = useState("");
    const [answer, setAnswer] = useState("");
    const [randomNumber, setRandomNumber] = useState("");
    const [randomNumber2, setRandomNumber2] = useState("");
    const [seconds, setSeconds] = useState(40);
    const [extraSeconds, setExtraSecond] = useState(false);
    const [gameStatus, setGameStatus] = useState(false);
    const [points, setPoints] = useState(0)
    const [level, setLevel] = useState(1);
    const [correctCount, setCorrectCount] = useState(0) 
    const [showGif, setShowGif] = useState(false);
    const navigate = useNavigate();
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(10);

    let wonAudio = new Audio("/audio/correct.wav");
    let wrongAudio = new Audio("/audio/incorrect.wav");

    function startGame(){
        setGameStatus(true);
        setOperation("+");
        setGameStatus(true);
        randomNumberGenerator();
    }


// timer and endgame routing
    useEffect(() => {
        if (gameStatus && seconds > 0) {
            const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
            return () => clearTimeout(timer); 
        } else if ( seconds <= 0) {

            localStorage.setItem("points", JSON.stringify(points));

            let additionTop = JSON.parse(localStorage.getItem("AdditionTop")) || [];

            if(additionTop.length === 0){
                additionTop = []
            }
            additionTop.push(points);
            const newArraySorted = additionTop.toSorted((a,b) => b - a).slice(0, 10);
            localStorage.setItem("AdditionTop", JSON.stringify(newArraySorted));

            navigate('/games/end', { state: { from: 'games/addition' } });

        }
    }, [seconds, gameStatus]);
    
    


    useEffect(() => {
        if(level === 1){
            setMin(0);
            setMax(10)
        }else if(level === 2){
            setMin(10);
            setMax(20);
        }else if(level === 3){
            setMin(10);
            setMax(100);
        }else if(level === 4){
            setMin(100);
            setMax(700);
        }else if(level === 5){
            setMin(700);
            setMax(7000);
        }else if(level === 6){
            setMin(7000);
            setMax(100000);
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

        const checkedanswer = randomNumber + randomNumber2

        if(answer == checkedanswer ){
            setCorrectCount(correctCount + 1)
            setAnswer("");
            setPoints(points + (level * 10))
            setSeconds(seconds + 3);
            randomNumberGenerator();
            wonAudio.play();
            // functions for time measuring
            // clearTimeout(pointsTimer);
            // extrasec();

            
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

    useEffect(() => {
        if(correctCount === 6){
            setLevel(level + 1);
            setCorrectCount(0)
        }
      }, [correctCount]);

      //TO-DO  function for time measuring.
    // function extrasec(){
    //    const pointsTimer = setTimeout(
    //     if()
    //    )
    // }


      

  return (
    <div> 
        <div>
            <p>LEVEL:{level}</p>
            <p>TIME: {seconds} sec</p>
            <p>POINTS: {points}  </p>
        </div>

        <div className= "body">
                {gameStatus === true ? <label className= "operation">{randomNumber} {operation} {randomNumber2}</label> : ""}
                <br />
                <br />
                <label className= "answer">{answer}</label>

                    {showGif && (
                    <div className="gif-popup">
                    <img src="/gif/wrongans.gif"  />
                    </div>
                    )}

                            {/* {showRecordGif && (
                            <div className="gif2-popup" >
                            <img src="/gif/celebrate.gif"  />
                            </div>
                            )} */}

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
       
        </div>
    </div>
  )
}

export default Addition