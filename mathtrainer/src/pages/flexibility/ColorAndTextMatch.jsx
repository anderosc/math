import {useEffect, useRef, useState } from "react"
import "./compmodes.css"
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase"; 
import { saveScore } from "../../firebase/savescore";


function ColorAndTextMatch() {
    
    const [randomNumber, setRandomNumber] = useState("");
    const [randomNumber2, setRandomNumber2] = useState("");
    const [seconds, setSeconds] = useState(60);
    const [extraPoints, setExtraPoints] = useState(1);
    const [gameStatus, setGameStatus] = useState(false);
    const [points, setPoints] = useState(0)
    const [correctCount, setCorrectCount] = useState(0) 
    const [showGif, setShowGif] = useState(false);
    const navigate = useNavigate();
    const [backgroundcolor, setBackgroundColor] = useState()
    const [textcolor, setTextColor] = useState("white");
    const [operation, setOperation] = useState("");
    const colors = ["Red", "Green", "Black" , "Yellow", "Blue"]

    const timerRef = useRef(null);


    let wonAudio = new Audio("/audio/correct.wav");
    let wrongAudio = new Audio("/audio/incorrect.wav");

    function startGame(){
        setGameStatus(true);
        TrueOrFalse();
        pointsTimer();
    }


    useEffect(() => {
        if (gameStatus && seconds > 0) {
          const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
          return () => clearTimeout(timer);
        } else if (seconds <= 0) {
          if (!auth.currentUser) {
            return;
          }
    
          localStorage.setItem("points", JSON.stringify(points));
          localStorage.setItem("game", JSON.stringify("Color and Text Match"));
    
          // Save the score and send it to another file
          const userId = auth.currentUser.uid; 
          saveScore(points, userId, "colorandtextmatch_scores/"); 
   
          navigate("/games/end", { state: { from: "games/colorandtextmatch" } });
        }
      }, [seconds, gameStatus]);
    


      function TrueOrFalse() {
        const number = Math.random();
        console.log(number);
        if (number < 0.5) {
            // Case: Text color matches background color (different shades)
            const RandomBackground = Math.round(Math.random() * 4);
            setBackgroundColor(colors[RandomBackground]);
            setOperation(colors[RandomBackground]);
            let randomTextColor = Math.round(Math.random() * 4);
            if (randomTextColor === RandomBackground) {
                if (randomTextColor === 0) {
                    randomTextColor = randomTextColor + 1;
                } else {
                    randomTextColor = randomTextColor - 1;
                }
            }
            setTextColor(colors[randomTextColor]);
        } else {
            // Case: Text color does not match background color
            const RandomBackground = Math.round(Math.random() * 4);
            let randomOperation = Math.round(Math.random() * 4);
            if (RandomBackground === randomOperation) {
                if (randomOperation === 0) {
                    randomOperation = randomOperation + 1;
                } else {
                    randomOperation = randomOperation - 1;
                }
            }
            setBackgroundColor(colors[RandomBackground]);
            setOperation(colors[randomOperation]);
            let randomTextColor = Math.round(Math.random() * 4);
            if (randomTextColor === RandomBackground) {
                if (randomTextColor === 0) {
                    randomTextColor = randomTextColor + 1;
                } else {
                    randomTextColor = randomTextColor - 1;
                }
            }
            setTextColor(colors[randomTextColor]);
        }
    }



    function pointsTimer(){
        setExtraPoints(2);
            timerRef.current = setInterval(() =>{
                setExtraPoints(prevPoints => prevPoints > 1 ? prevPoints - 0.1 : 1 )
            }, 700)
                    
    }



    const checkAnswer = () => {
        if(gameStatus === false){
            return;
        }
        
        if(backgroundcolor === operation){
            setCorrectCount(correctCount + 1)

            setPoints(prevPoints => Math.round(prevPoints + (10 * extraPoints)));
            TrueOrFalse();
            wonAudio.play();
            clearTimeout(timerRef.current); 
            pointsTimer();
        } else {
            setShowGif(true);

            setTimeout(() => { setShowGif(false);
                TrueOrFalse();
            setOperation("+")
            }, 2500);
            // meanwhile --> 
            setRandomNumber();
            setRandomNumber2();
            setOperation("");
            wrongAudio.play();
        }
    }


      

  return (
    <div className="game"> 
        <div className="statsbox">
            <p>TIME: {seconds} sec</p>
            <p>POINTS: {points}  </p>
        </div>

        <div className= "body">
                {gameStatus === true ? <label style={{ width: "300px", height: "90px", fontSize: "60px", backgroundColor: backgroundcolor, color: textcolor}}>{operation}  </label> : <label className= "operation"> </label> }
                <br />
                <br />

                    {showGif && (
                    <div className="gif-popup">
                    <img src="/gif/wrongans.gif"  />
                    </div>
                    )}

            <br />

            <div >
                <div className="keyboard">

                    <button onClick={() => checkAnswer()}>TRUE</button>
                    <button onClick={() => checkAnswer()}>FALSE</button>

                </div>
                <br />
                <br />

                {gameStatus === false ?<button className="button-00" onClick={() => startGame()}>START</button>  : undefined}
            </div>
       
        </div>
    </div>
  )
}

export default ColorAndTextMatch