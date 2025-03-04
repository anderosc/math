import { Link } from "react-router-dom"
import styles from  "./home.module.css"
import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";


function Home() {
  const [clicked, setClicked] = useState(false);
    const typedRef = useRef(null);
    const [showButtons, setShowButtons] = useState(false)

    useEffect(() => {
        if (clicked && typedRef.current) {
          const typed = new Typed(typedRef.current, {
            strings: [
              "Greetings, human! I am Professor Brainstew! ",
              "I am your brilliant guide on the journey to sharpening your mind",
              "My brainpower is beyond measure!",
              "While others let their brains turn to mush with endless scrolling, I prefer a more… stimulating approach.",
              "With a mix of wisdom, I’ll help you train your brain and outthink the competition.",
              "Forget the brain rot—it’s time to start thinking again!",
              "Are you ready now?"
            ],
            typeSpeed: 40,
            backSpeed: 15,
            backDelay: 1000,
            startDelay: 500,
            loop: false,
          });
          setTimeout(() =>{
            talky()
          }, 44000)         

          return () => {
            typed.destroy();
          };
        }
      }, [clicked]);

      function talky(){
        setShowButtons(true);
      }

  return (
    
    <div className={styles.page}>

    <div className={styles.first}>
            <div className={styles.box}>
                <div className={styles.inside} >
                    <div className={styles.boxWhite}>
                        <img className={styles.firstboximg} 
                        src="/landingpage/brain.png" alt="" />
                            <div className={styles.boxinside}>
                                <h1>Ditch the Brain Rot – Start Thinking Again</h1>
                                <h3>Endless scrolling isn’t helping you</h3>
                                <p>Swap mindless doomscrolling for something that actually benefits you. 
                                    Our brain-training exercises keep your mind active, sharp, and engaged. 
                                    Take a break from the noise and challenge yourself with something meaningful!</p>  
                            </div>        
                    </div>
                    <div className={styles.other}>
                        <p>Ready to challenge your brain?</p> 
                        <Link to="/signup"> <button>SIGN UP</button></Link>
                    </div>
                </div>
            </div>



        <div className={styles.box}>
            <div className={styles.inside} > 
                <div className={styles.boxWhite}>
                    <img className={styles.firstboximg} 
                    src="/landingpage/person.png" alt="" />
                        <div className={styles.boxinside}>
                            <h1>Boost Your Productivity</h1>
                            <h3>Sharper mind for a more efficient you</h3>
                            <p>Our cognitive exercises are designed to enhance focus, memory, and problem-solving skills—helping 
                                you become more productive in both your personal and professional life. Train your brain to work 
                                smarter, not harder!</p>                              
                        </div> 
                </div>
                <div className={styles.other}>
                    <p>Boost your cognitive skills now</p> 
                    <Link to="/signup"> <button>SIGN UP</button></Link>
                </div>
            </div>
        </div>
            
        <div className={styles.box}>
            <div className={styles.inside} >
                <div className={styles.boxWhite}>
                    <img className={styles.firstboximg} 
                    src="/landingpage/growthgraph.png" alt="" />
                        <div className={styles.boxinside}>
                            <h1>Personalized Growth</h1>
                            <br />
                            <h3>Exercises tailored for you</h3>
                            <p>Our mental challenges are designed to fit your individual needs, 
                                ensuring maximum benefits. Track your progress and see how your 
                            brain develops over time with each session.</p>
                        </div>
                </div>
                <div className={styles.other}>
                    <p>Take the first step towards sharper focus.</p> 
                    <Link to="/signup"> <button>SIGN UP</button></Link>
                </div>
                </div>
        </div>
    </div>

    <div className={styles.secondbackground}>
    <div className={styles.second}>
        <div>
            <p className={styles.secondheader}>Professor Brainstew works for us and he takes a close interest in your gameplay</p>
            <div className={styles.buttonbox}>
                <Link to="/signup"><button className={styles.secondbutton}>CHOOSE GAME</button></Link>
            </div>
        </div>
        <div>
            <img className={styles.secondimg} src="/landingpage/proff.png" alt="" />
        </div>
    </div>
    </div>

    <div className={styles.thirdbackground}>
    <div className={styles.third}>
        <div className={styles.thirdimg}>
            <img src="/landingpage/proff.png" alt="" />
        </div>
        <div className={styles.thirdbox}>
            {clicked === false ? (<><p className={styles.thirdheader}>May I introduce myself?</p>
            <div className={styles.buttonbox}>
            <button className={styles.secondbutton} onClick={() => setClicked(true)}>YESSSS</button>
            </div> </> ): (
          <div className={styles.css_typing}>
            <span ref={typedRef}></span>
          </div>
        )}
        
        </div>
    </div>
    </div>
</div>
  )
}

export default Home