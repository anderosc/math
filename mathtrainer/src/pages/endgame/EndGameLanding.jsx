import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../endgame/endgame.css"

function EndGameLanding() {
    const game = (JSON.parse(localStorage.getItem("game")));
    const points =  JSON.parse(localStorage.getItem("points"));
    let navigate = useNavigate();

  
  return (

    <div className="endgame">
       <br />
       <br />
       <Card style={{ width: '35rem' }}>
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
       <Button onClick={() => {
        navigate(-1)}} variant="primary">PLAY AGAIN</Button>  
        <Link to="/games"><Button variant="primary">Go TO MENU</Button></Link>

      </Card.Body>
    </Card>
    </div>
  )
}

export default EndGameLanding