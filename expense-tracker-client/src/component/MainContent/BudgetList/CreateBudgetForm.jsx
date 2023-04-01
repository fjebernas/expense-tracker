import { useState } from "react";
import { Button, Form } from "react-bootstrap";

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
      <Form.Group className="mb-3 text-start">
        <Form.Label>Budget name</Form.Label>
        <Form.Control onChange={handleInputChange} value={budgetName} type="text" placeholder="ex. budget for january" />
      </Form.Group>
      <Button variant="warning" type="submit" className="w-100">
        Submit
      </Button>
    </Form>
  );
}

export default CreateBudgetForm;