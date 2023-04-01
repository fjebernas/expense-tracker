import axios from "axios";
import { Accordion, Container, ListGroup } from "react-bootstrap";
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
            <h3 className="fs-6 text-warning">Create new budget</h3>
          </Accordion.Header>
          <Accordion.Body>
            <CreateBudgetForm handleBudgetFormSubmit={handleBudgetFormSubmit} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <p className="text-muted my-3">ALL BUDGETS</p>
      <ListGroup>
        {
          props.budgets.map(budget => (
            <ListGroup.Item key={budget.id}>
              <input type="radio" className="btn-check" name="options-outlined" id={budget.id} />
              <label
                onClick={() => handleClick(budget.name, budget.id)}
                htmlFor={budget.id}
                className="btn btn-outline-primary w-100"
              >
                {budget.name}
              </label>
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </Container>
  );
}

export default BudgetList;