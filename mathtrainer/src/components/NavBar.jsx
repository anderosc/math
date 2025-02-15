import "./navbar.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./navbar.css"
import { Link, Links} from "react-router-dom";


function NavBar() {
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/home">brainy</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/games">Games</Nav.Link>
            <Nav.Link as={Link} to="/statistics">Statistics</Nav.Link>
            <Nav.Link as={Link} to=" ">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>

          </Nav>
          {/* <select>
              <option value="eng">🇬🇧 ENG</option>
              <option value="et">🇪🇪 ET</option>
              <option value="fin">🇫🇮 FIN</option>
              <option value="de">🇩🇪 DE</option>
            </select> */}
            <br />
         <Link to="/login"> <button>Log In</button></Link>
         <Link to="/signup"> <button>Sign Up</button></Link>        
         </Navbar.Collapse>
      </Container>
    </Navbar>


</>
  );
}

export default NavBar;