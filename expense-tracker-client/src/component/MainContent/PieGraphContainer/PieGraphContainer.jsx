import { Col, Container, Row } from "react-bootstrap";
import PieGraph from "./PieGraph";

function PieGraphContainer(props) {

  return (
    <>
      <Container className="mt-5">
        <Row className="mt-4">
          <Col xl={4} className='mb-3'>
            <h4>Total Income : Total Expense</h4>
            {
              props.totals.length > 0 ? <PieGraph transactions={props.totals} /> : <p className="text-muted fst-italic">No data</p>
            }
          </Col>
          <Col xl={4} className='mb-3'>
            <h4>Incomes</h4>
            {
              props.incomeTransactions.length > 0 ? <PieGraph transactions={props.incomeTransactions} /> : <p className="text-muted fst-italic">No data</p>
            }
          </Col>
          <Col xl={4} className='mb-3'>
            <h4>Expenses</h4>
            {
              props.incomeTransactions.length > 0 ? <PieGraph transactions={props.expenseTransactions} /> : <p className="text-muted fst-italic">No data</p>
            }
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PieGraphContainer;