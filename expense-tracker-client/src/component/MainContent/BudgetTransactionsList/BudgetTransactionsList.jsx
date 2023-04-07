import { Col, Container, Row } from "react-bootstrap";
import TransactionCard from "./TransactionCard";

function BudgetTransactionsList(props) {

  const handleDeleteTransactionClick = (category, transactionId) => {
    props.handleDeleteTransactionClick(category, transactionId);
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 8, offset: 2 }}>
          {
            props.transactionDtos.length > 0 ?
            props.transactionDtos.map(transactionDto => (
              <TransactionCard
                key={transactionDto.transaction.id + transactionDto.category}
                category={transactionDto.category}
                transaction={transactionDto.transaction}
                handleDeleteTransactionClick={handleDeleteTransactionClick}
              />
            )) : <p className="text-muted fst-italic">No transactions</p>
          }
        </Col>
      </Row>
    </Container>
  );
}

export default BudgetTransactionsList;