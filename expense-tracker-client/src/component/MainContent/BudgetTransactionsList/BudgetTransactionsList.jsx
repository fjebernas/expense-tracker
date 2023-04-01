import { Col, Container, Row } from "react-bootstrap";
import ExpenseTransactionCard from "./ExpenseTransactionCard";
import IncomeTransactionCard from "./IncomeTransactionCard";
import TransactionCard from "./TransactionCard";

function BudgetTransactionsList(props) {
  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          {
            props.transactionDtos.length > 0 ?
            props.transactionDtos.map(transactionDto => (
              transactionDto.category === 'income' ? (
                <IncomeTransactionCard
                  key={transactionDto.transaction.id + transactionDto.transaction.description}
                  description={transactionDto.transaction.description}
                  amount={transactionDto.transaction.amount}
                  createdAt={transactionDto.transaction.createdAt}
                />
              ) : transactionDto.category === 'expense' ? (
                <ExpenseTransactionCard
                  key={transactionDto.transaction.id + transactionDto.transaction.description}
                  description={transactionDto.transaction.description}
                  amount={transactionDto.transaction.amount}
                  createdAt={transactionDto.transaction.createdAt}
                />
              ) : (
                <TransactionCard
                  key={transactionDto.transaction.id + transactionDto.transaction.description}
                  description={transactionDto.transaction.description}
                  amount={transactionDto.transaction.amount}
                  createdAt={transactionDto.transaction.createdAt}
                />
              )
            )) : <p className="text-muted fst-italic">No transactions</p>
          }
        </Col>
      </Row>
    </Container>
  );
}

export default BudgetTransactionsList;