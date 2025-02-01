import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../endgame/endgame.css"

function EndGameLanding() {
    const game = (JSON.parse(localStorage.getItem("game")));
    const points =  JSON.parse(localStorage.getItem("points"))

  
  return (

    <div className="endgame">
       <br />
       <br />
       <Card style={{ width: '35rem' }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>GAME COMPLETED </Card.Title>
        <Card.Text>
            <br />
        <div>Thank you for playing {game} game! </div>
        <br />
        <div>Your score was: {points} points</div>
        <br />
          
        </Card.Text>
        <div>Do you want to play again?</div>
       <Link to="/games/addition"><Button variant="primary">PLAY AGAIN</Button> </Link> 
        <Link to="/games"><Button variant="primary">Go TO MENU</Button></Link>

      </Card.Body>
    </Card>
    </div>
  )
}

export default EndGameLanding