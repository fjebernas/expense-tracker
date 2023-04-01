import { Container, Navbar } from "react-bootstrap";

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <span className="text-primary fs-3">Expense</span>
          <span className="text-info fs-3">Tracker</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;