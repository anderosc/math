import { Link } from "react-router-dom"
import "./home.css"

function Home() {

  return (
    <div>
      <div className="first">
        <div className="firsttext">
        <h1>Ditch the Brain Rot – Start Thinking Again</h1>
        <h5>Endless scrolling isn’t helping you</h5>
        <p>Swap mindless doomscrolling for something that actually benefits you. 
          Our brain-training exercises keep your mind active, sharp, and engaged. 
          Take a break from the noise and challenge yourself with something meaningful!</p>
          <br />
         <Link to="/games"><button>PLAY</button> </Link> 
        </div>
        <div className="firstimg"> 
        <img  src="/homepage/brain.png" alt="" />
        </div>
      </div>

      <div className="second">
        <div className="secondimg"> 
          <img  src="/homepage/nocost.png" alt="" />
        </div>
        <div className="secondtext">
          <h1>Brain Training for Everyone – Completely Free</h1>
          <h5>Unlock your potential without any cost</h5>
          <p>Unlike other platforms that charge for cognitive training, 
            our exercises are 100% free. We believe that improving your mental 
            skills should be accessible to everyone. No subscriptions, no hidden fees – just pure 
            brain-boosting fun!</p>
          <br />
          <Link to="/games"><button>PLAY</button> </Link> 
        </div>
      </div>

      <div className="third">
        <div className="thirdtext">
          <h1>Personalized Growth</h1>
          <h5>Exercises tailored for you</h5>
          <p>Our mental challenges are designed to fit your individual needs, ensuring maximum benefits. 
            Track your progress and see how your brain develops over time with each session.</p>
          <br />
          <Link to="/games"><button>PLAY</button> </Link> 
        </div>
        <div className="thirdimg"> 
          <img  src="/homepage/growth.png" alt="" />
        </div>
      </div>

    </div>
  )
}

export default Home