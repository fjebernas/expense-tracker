import { Alert, Col, Container, Row } from "react-bootstrap";

function ExpenseTransactionCard(props) {
  return (
    <Alert variant="danger" className="text-start text-danger pt-4 px-4" style={{borderLeft: '3px solid red'}}>
      <Container>
        <Row>
          <Col>
            <h5 className="fs-6 fw-bold text-uppercase">{props.description}</h5>
            <p className="fs-5">Php {props.amount}</p>
          </Col>
          <Col>
            <p className="text-end">{props.createdAt}</p>
          </Col>
        </Row>
      </Container>
    </Alert>
  );
}

export default ExpenseTransactionCard;