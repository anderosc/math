import Accordion from 'react-bootstrap/Accordion';
import "./statistics.css"
import { useAuth } from "../../contexts/authContext";


function Statistics() {
      const { userLoggedIn, username } = useAuth()



  return (
    
    <div>
        
        Log in to see your stats.
    
    </div> 
  );
}

export default Statistics;