import "./navbar.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./navbar.css"
import { Link} from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";
import NavDropdown from 'react-bootstrap/NavDropdown';


function NavBar() {
      const { userLoggedIn, username } = useAuth()

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

            <br />
            {userLoggedIn ? 
                <NavDropdown title={username} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Settings</NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4" onClick={() => doSignOut()}>
                  Log Out
                </NavDropdown.Item>
                </NavDropdown> 
              : undefined}
            
            {userLoggedIn === false ? 
                <>
                  <Link to="/login"><button >Log In</button></Link>
                  <Link to="/signup"><button>Sign Up</button></Link>
                </>
              : undefined}     
         </Navbar.Collapse>
      </Container>
    </Navbar>


</>
  );
}

export default NavBar;