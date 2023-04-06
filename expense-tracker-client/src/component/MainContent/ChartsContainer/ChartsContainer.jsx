import { Col, Container, Row } from "react-bootstrap";
import Chart from "./Chart";
import { isObjectEmpty } from "../../../utils/checker";

function ChartsContainer(props) {

  const getTotalsTransactions = () => {
    let totalsTransactions = [];
    totalsTransactions.push({description: 'total income', amount: props.totals.income});
    totalsTransactions.push({description: 'total expense', amount: props.totals.expense});
    return totalsTransactions;
  }

  return (
    <Container className="mt-5">
      <Row className="mt-4">
        <Col xl={4} className='mb-3'>
          <h4 className="mb-3">Total Income : Total Expense</h4>
          {
            !isObjectEmpty(props.totals) ? <Chart transactions={getTotalsTransactions()} /> : <p className="text-muted fst-italic">No data</p>
          }
        </Col>
        <Col xl={4} className='mb-3'>
          <h4 className="mb-3">Incomes</h4>
          {
            props.incomeTransactions.length > 0 ? <Chart transactions={props.incomeTransactions} /> : <p className="text-muted fst-italic">No data</p>
          }
        </Col>
        <Col xl={4} className='mb-3'>
          <h4 className="mb-3">Expenses</h4>
          {
            props.expenseTransactions.length > 0 ? <Chart transactions={props.expenseTransactions} /> : <p className="text-muted fst-italic">No data</p>
          }
        </Col>
      </Row>
    </Container>
  );
}

export default ChartsContainer;