import { Alert } from "react-bootstrap";

function TransactionCard(props) {
  return (
    <Alert variant="info" className="text-start text-info pt-4 px-4" style={{borderLeft: '3px solid #0dcaf0'}}>
      <h5 className="fs-6 fw-bold text-uppercase">{props.description}</h5>
      <p className="fs-4">Php {props.amount}</p>
    </Alert>
  );
}

export default TransactionCard;