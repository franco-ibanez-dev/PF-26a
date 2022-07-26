import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import carrito from "../../images/carrito.png";
import SearchBar from "../Search/Search";
import './NavBar.css'

function NavBar() {
  const { user, logout } = useAuth();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/cart">
            <img src={carrito} alt="not found" width="20px" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link className="navText" href="/">
              Inicio
            </Nav.Link>
            <NavDropdown title="Usuario" id="navbarScrollingDropdown">
              {user ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <Nav.Link className="navText" href="/login">
                  Login
                </Nav.Link>
              )}
              <Nav.Link href="/profile" className="navText">
                Perfil
              </Nav.Link>
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
