import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar variant="light" expand="lg">
      <Container>
        <Navbar.Brand as='span'>
          <Link to='/manage' className="text-decoration-none">
            <span className="text-primary fs-3">Expense</span>
            <span className="text-info fs-3">Tracker</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Offcanvas
          id='offcanvasNavbar-expand-lg'
          aria-labelledby='offcanvasNavbarLabel-expand-lg'
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="fs-3 text-info" id='offcanvasNavbarLabel-expand-lg'>
              Hello, Francis!
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3 fs-5 fw-bold">
              <Nav.Link as='span'>
                <Link to="/manage" className="text-decoration-none">Manage Budgets</Link>
              </Nav.Link>
              <Nav.Link as='span'>
                <Link to="/analytics" className="text-decoration-none">Analytics</Link>
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;