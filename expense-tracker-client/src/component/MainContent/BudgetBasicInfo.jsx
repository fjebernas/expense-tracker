import { Container, Row } from "react-bootstrap";
import { isObjectEmpty } from "../../utils/checker";
import { amountFormatter } from "../../utils/formatter";

function BudgetBasicInfo(props) {

  return (
    <Container fluid className="text-center">
      <Row>
        <h1 className="text-primary fs-1">
          { props.budgetName ? props.budgetName : '--' }
        </h1>
      </Row>
      <Row>
        <h2 className="text-secondary fs-4">
          Remaining balance:&nbsp;
          <span className="text-success fs-4">
            {
              !isObjectEmpty(props.totals) ? amountFormatter.format(props.totals.income - props.totals.expense) : '--'
            }
          </span>
        </h2>
      </Row>
    </Container>
  );
}

export default BudgetBasicInfo;