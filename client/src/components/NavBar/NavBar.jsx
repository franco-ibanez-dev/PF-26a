import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import carrito from "../../images/carrito.png";
import SearchBar from "../Search/Search";
import './NavBar.css'

function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#"><Link to='/cart'><img src={carrito} alt='not found' width='30px'/></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1"><Link className='navText' to=''>Inicio</Link></Nav.Link>
            <NavDropdown title="Usuario" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3"><Link className='navText' to='/login'>Login</Link></NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                <Link to='/profile' className='navText'>Perfil</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
          <SearchBar />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
