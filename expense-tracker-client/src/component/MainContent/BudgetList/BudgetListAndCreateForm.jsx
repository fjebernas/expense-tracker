import axios from "axios";
import { Accordion, Col, Container, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { baseUrl } from "../../../data/data";
import { toastSuccess, toastWarning } from "../../../utils/toast";
import CreateBudgetForm from "./CreateBudgetForm";

function BudgetListAndCreateForm(props) {

  const handleClick = (budget) => {
    props.handleBudgetClick(budget);
  }

  const handleBudgetFormSubmit = async (budgetRequest) => {
    await axios.post(`${baseUrl}/budgets`, budgetRequest)
      .then(() => {
        toastSuccess('New budget created');
        props.getAllBudgets();
      })
      .catch(err => {
        err.response.data.errors.forEach(errMessage => {
          toastWarning(errMessage.defaultMessage);
        });
      });
  }

  return (
    <Container>
      <Row>
        <Col>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <h3 className="fs-5 text-info">Create new budget</h3>
              </Accordion.Header>
              <Accordion.Body>
                <CreateBudgetForm handleBudgetFormSubmit={handleBudgetFormSubmit} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <h3 className="fs-5 text-info">Budgets</h3>
              </Accordion.Header>
              <Accordion.Body className="p-0 pt-4">
                <ToggleButtonGroup vertical type="radio" name="options" className="w-100">
                  {
                    props.budgets.length > 0 ?
                    props.budgets.map(budget => (
                      <ToggleButton
                        id={budget.id + budget.name}
                        key={budget.id + budget.name}
                        value={budget.id}
                        onClick={() => handleClick(budget)}
                        variant='outline-info'
                      >
                        {budget.name}
                      </ToggleButton>
                    )) : <p className="text-muted fst-italic ms-4">No budgets</p>
                  }
                </ToggleButtonGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default BudgetListAndCreateForm;