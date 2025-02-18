import { useEffect, useRef } from "react";
import "./threeDrotation.css"

function threeDrotation() {
  const canvasRef = useRef()
  const canvasRef2 = useRef()

  let beginPointX;
  let beginPointY;
  let moveToX;
  let moveToY;
  const draw = (context) =>{

    const linecorner = Math.random()
    if(linecorner > 0 && linecorner <= 0.25){
       beginPointX = Math.random() * 75 
       beginPointY = Math.random() * 25
       moveToX = Math.random() * 10 + 125
       moveToY = Math.random() * 10 + 125
    } else if(linecorner >0.25 && linecorner  <= 0.5){
      beginPointX = Math.random() * (150 -75) +75
      beginPointY = Math.random() * 25
      moveToX = Math.random() * 10 + 25
      moveToY = Math.random() * 10 + 125
    }else if(linecorner > 0.5 && linecorner  <= 0.75){
      beginPointX = Math.random() * 25
      beginPointY = Math.random() * (150-75) + 75
      moveToX = Math.random() * 10 + 125
      moveToY = Math.random() * 10 + 25
    }else if(linecorner > 0.75 && linecorner  <= 1){
      beginPointX = Math.random() * (150 -75) +75
      beginPointY = Math.random() * (150-75) + 75
      moveToX = Math.random() * 10 + 25
      moveToY = Math.random() * 10 + 25
    }

    context.beginPath();
    context.strokeStyle = "purple";
    context.moveTo(beginPointX, beginPointY);
    context.lineTo(moveToX , moveToY)
    context.stroke();
  }

  function draw2(context){
    context.strokeStyle = "purple";
    context.moveTo(beginPointX +25, beginPointY +5 );
    context.lineTo(moveToX , moveToY)
    context.stroke();
  }

  function newDraw(){
    const canvas = canvasRef.current;
    const context = canvas.getContext(`2d`);
    draw(context);
        const canvas2 = canvasRef2.current;
    const context2 = canvas2.getContext(`2d`);
    draw2(context2);
  }

  // const draw2 = (context) =>{
  //   // Loo ajutine canvas
  //   const offscreenCanvas = document.createElement("canvas");
  //   offscreenCanvas.width = 150;
  //   offscreenCanvas.height = 150;
  //   const offscreenCtx = offscreenCanvas.getContext("2d");

  //   // Joonista joon offscreen canvas'ile
  //   offscreenCtx.beginPath();
  //   offscreenCtx.strokeStyle = "purple";
  //   offscreenCtx.moveTo(50, 0);
  //   offscreenCtx.lineTo(150, 130);
  //   offscreenCtx.stroke();

  //   // Põhicanvasele joonistamine pööratult
  //   context.save();
  //   context.translate(100, 100); // Nihuta pööramispunkti
  //   context.rotate(50 * Math.PI / 180);
  //   context.drawImage(offscreenCanvas, -100, -100); // Joonista valmis pilt tagasi
  //   context.restore();
  //     }

  // useEffect(() =>{
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext(`2d`);
  //   draw(context);
  // }, [])

  // useEffect(() =>{
  //   const canvas = canvasRef2.current;
  //   const context = canvas.getContext(`2d`);
  //   draw2(context);
  // }, [])




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

              <canvas ref={canvasRef} width="150px" height="150px" className="canvaselement" /> <br />
              <canvas ref={canvasRef2} width="150px" height="150px" className="canvaselement" />

    <button onClick={newDraw}>dar</button>

            </div>


                {/* {gameStatus === false ?<button className="button-00" onClick={() => startGame()}>START</button>  : undefined} */}
          
       
        </div>
    </div>
    
  )
}

export default threeDrotation