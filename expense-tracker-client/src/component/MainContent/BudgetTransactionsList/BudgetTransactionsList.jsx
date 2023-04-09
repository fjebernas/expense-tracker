import { ButtonGroup, Col, Container, Row, ToggleButton } from "react-bootstrap";
import TransactionCard from "./TransactionCard";
import { useState } from "react";

function BudgetTransactionsList(props) {

  const [radioValue, setRadioValue] = useState('1');

  const handleRadioClick = (e) => {
    setRadioValue(e.currentTarget.value)
  }

  const handleDeleteTransactionClick = (category, transactionId) => {
    props.handleDeleteTransactionClick(category, transactionId);
  }

  const radios = [
    { name: 'All', value: '1' },
    { name: 'Income', value: '2' },
    { name: 'Expense', value: '3' },
  ];

  const transactionCards = () => {
    const t = props.transactionDtos;
    const filteredT = radioValue == '2' ? t.filter(t => t.category === 'income')
                    : radioValue == '3' ? t.filter(t => t.category === 'expense')
                    : t;

    return filteredT.map(t => (
      <TransactionCard
        key={t.transaction.id + t.category}
        category={t.category}
        transaction={t.transaction}
        handleDeleteTransactionClick={handleDeleteTransactionClick}
      />
    ));
  }

  return (
    <Container className="mt-5 text-center">
      <Row>
        <Col>
          <ButtonGroup>
            {
              radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={radio.value == 1 ? 'outline-primary' : radio.value == 2 ? 'outline-success' : 'outline-danger'}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={handleRadioClick}
                >
                  {radio.name}
                </ToggleButton>
              ))
            }
          </ButtonGroup>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col lg={{ span: 8, offset: 2 }}>
          {
            props.transactionDtos.length > 0 ? transactionCards()
              : <p className="text-muted fst-italic">No transactions</p>
          }
        </Col>
      </Row>
    </Container>
  );
}

export default BudgetTransactionsList;