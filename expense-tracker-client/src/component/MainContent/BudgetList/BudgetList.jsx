import axios from "axios";
import { Accordion, Button, ButtonGroup, Container, ListGroup, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { baseUrl } from "../../../data/data";
import { toastError, toastSuccess } from "../../../utils/toast";
import CreateBudgetForm from "./CreateBudgetForm";

function BudgetList(props) {

  const handleClick = (budgetName, budgetId) => {
    props.handleBudgetClick(budgetName, budgetId);
  }

  const handleBudgetFormSubmit = async (budgetRequest) => {
    await axios.post(`${baseUrl}/budgets`, budgetRequest)
      .then(() => {
        toastSuccess('New budget created');
        props.getAllBudgets();
      })
      .catch(err => toastError(err.message));
  }

  return (
    <Container>
      <h4 className="mb-4 text-info">Budget records</h4>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h3 className="fs-6 text-primary">Create new budget</h3>
          </Accordion.Header>
          <Accordion.Body>
            <CreateBudgetForm handleBudgetFormSubmit={handleBudgetFormSubmit} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <p className="text-muted my-3">ALL BUDGETS</p>
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
    </Container>
  );
}

export default BudgetList;