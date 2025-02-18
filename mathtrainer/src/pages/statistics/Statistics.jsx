import Accordion from 'react-bootstrap/Accordion';
// import "./statistics.css"
import { useAuth } from "../../contexts/authContext";
import Heatmap from '../../components/heatmap/Heatmap';


function Statistics() {
      const { userLoggedIn, username } = useAuth()



  return (
    
    <div>
        < Heatmap />
    
    </div> 
  );
}

export default Statistics;