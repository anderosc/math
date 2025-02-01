import { useEffect, useRef } from "react";
import "../MathGames/compmodes.css"
import "./threeDrotation.css"

function threeDrotation() {
  const canvasRef = useRef(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const draw = (ctx) => {
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(75, 75, 30, 1.5, 2*Math.PI)
    ctx.fill()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    //Our draw come here
    draw(context)
  }, [draw])

  return (
    <div>
      <div>
          <p>LEVEL: level</p>
          <p>TIME: second sec</p>
          <p>POINTS: points </p>
      </div>

        <div className= "body">
                {/* {gameStatus === true ? <label className= "operation">{randomNumber} {operation} {randomNumber2}</label> : ""} */}



          
            <div className="keyboard">

              <canvas ref={canvasRef} width="150px" height="150px" className="canvaselement" />
            </div>


                {/* {gameStatus === false ?<button className="button-00" onClick={() => startGame()}>START</button>  : undefined} */}
          
       
        </div>
    </div>
    
  )
}

export default threeDrotation