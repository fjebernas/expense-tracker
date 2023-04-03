import { Alert, Col, Container, Row } from "react-bootstrap";
import { amountFormatter, formatDate } from "../../../utils/formatter";

function TransactionCard(props) {

  const getTheme = (category) => {
    return category === 'income' ? 'success' :
            category === 'expense' ? 'danger' :
              'info';
  }

  return (
    <Alert variant={ getTheme(props.category) } className="text-start pt-4 px-4">
      <Container>
        <Row>
          <Col>
            <h5 className="fs-6 fw-bold text-uppercase">{props.transaction.description}</h5>
            <p className="fs-4">{ amountFormatter.format(props.transaction.amount) }</p>
          </Col>
          <Col>
            <p className="text-end">{ formatDate(props.transaction.createdAt) }</p>
          </Col>
        </Row>
      </Container>
    </Alert>
  );
}

export default TransactionCard;