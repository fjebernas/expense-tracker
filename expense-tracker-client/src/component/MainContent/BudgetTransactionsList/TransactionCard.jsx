import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { amountFormatter, formatDate } from "../../../utils/formatter";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function TransactionCard(props) {
  const MySwal = withReactContent(Swal);

  const getTheme = (category) => {
    return category === 'income' ? 'success' :
            category === 'expense' ? 'danger' :
              'info';
  }

  const handleClick = () => {
    MySwal.fire({
      title: <p>Delete transaction?</p>,
      showCancelButton: true,
      confirmButtonText: 'Absolutely',
    }).then((result) => {
      if (result.isConfirmed) {
        props.handleDeleteTransactionClick(props.category, props.transaction.id);
      }
    });
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
            <Container fluid>
              <Row>
                <Col>
                  <p className="text-end">{ formatDate(props.transaction.createdAt) }</p>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-end">
                  <Button variant={ getTheme(props.category) } onClick={handleClick}>Delete</Button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </Alert>
  );
}

export default TransactionCard;