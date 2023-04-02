import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

function CreateBudgetForm(props) {

  const [budgetName, setBudgetName] = useState('');
  

  const handleInputChange = (e) => {
    setBudgetName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleBudgetFormSubmit({ name: budgetName });
    setBudgetName('');
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel
        label="Budget name"
        controlId="floatingInput"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="ex. Budget for January" 
          onChange={handleInputChange}
          value={budgetName}
        />
      </FloatingLabel>
      <Button variant="primary" type="submit" className="w-100">
        Submit
      </Button>
    </Form>
  );
}

export default CreateBudgetForm;