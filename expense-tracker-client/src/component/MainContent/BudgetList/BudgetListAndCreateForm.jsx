import axios from "axios";
import { Accordion, Col, Container, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { baseUrl } from "../../../data/data";
import { toastError, toastSuccess } from "../../../utils/toast";
import CreateBudgetForm from "./CreateBudgetForm";

function BudgetListAndCreateForm(props) {

  const handleClick = (budgetName, budgetId) => {
    props.handleBudgetClick(budgetName, budgetId);
  }

  const handleBudgetFormSubmit = async (budgetRequest) => {
    await axios.post(`${baseUrl}/budgets`, budgetRequest)
      .then(() => {
        toastSuccess('New budget created');
        props.getAllBudgets();
      })
      .catch(err => {
        err.response.data.errors.forEach(errMessage => {
          toastError(errMessage.defaultMessage);
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
                    props.budgets.map(budget => (
                      <ToggleButton
                        id={budget.id + budget.name}
                        key={budget.id + budget.name}
                        value={budget.id}
                        onClick={() => handleClick(budget.name, budget.id)}
                        variant='outline-info'
                      >
                        {budget.name}
                      </ToggleButton>
                    ))
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