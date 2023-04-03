import { Accordion, ListGroup } from "react-bootstrap";
import { amountFormatter } from '../../../utils/formatter';

function BudgetSummary(props) {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <h2 className="fs-5 text-info">Budget summary</h2>
        </Accordion.Header>
        <Accordion.Body className="pb-1">
          <ListGroup variant="flush text-start">
            <ListGroup.Item>
              <h3 className="text-success fw-bold fs-5">Total Incomes:</h3>
              <p className="text-end fs-5 text-muted">{ props.totals.length > 0 ? amountFormatter.format(props.totals[0].amount) : '--' }</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3 className="text-danger fw-bold fs-5">Total Expenses:</h3>
              <p className="text-end fs-5 text-muted">{ props.totals.length > 0 ? amountFormatter.format(props.totals[1].amount) : '--' }</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3 className="text-primary fw-bold fs-5">Remaining balance:</h3>
              <p className="text-end fs-5 fw-bold text-muted">{ props.totals.length > 0 ? amountFormatter.format(props.totals[0].amount - props.totals[1].amount) : '--' }</p>
            </ListGroup.Item>
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default BudgetSummary;