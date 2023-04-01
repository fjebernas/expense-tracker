import { Alert, Col, Container, Row } from "react-bootstrap";

function IncomeTransactionCard(props) {
  return (
    <Alert variant="success" className="text-start text-success pt-4 px-4" style={{borderLeft: '3px solid green'}}>
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

export default IncomeTransactionCard;