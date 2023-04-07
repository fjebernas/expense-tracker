import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

function CreateTransactionForm(props) {

  const [category, setCategory] = useState(null);

  const [transaction, setTransaction] = useState({
    description: '',
    amount: ''
  });

  const handleInputChange = (e) => {
    setTransaction({...transaction, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleTransationFormSubmit(category, transaction, setTransaction);
  }

  return (
    <>
        <fieldset disabled={isNaN(props.budgetId)}>
          <Form onSubmit={handleSubmit}>
            <div className="btn-group mb-3 w-100" role="group">
              <input type="radio" className="btn-check" name="options-outlined" id='income' />
              <label
                className="btn btn-outline-success"
                onClick={() => {setCategory('income')}}
                htmlFor='income'
              >
                Income
              </label>

              <input type="radio" className="btn-check" name="options-outlined" id='expense' />
              <label
                className="btn btn-outline-danger"
                onClick={() => {setCategory('expense')}}
                htmlFor='expense'
              >
                Expense
              </label>
            </div>
            <FloatingLabel
              label="Transaction"
              className="mb-3"
            >
              <Form.Control
                name="description"
                type="text"
                placeholder="ex. Bills" 
                onChange={handleInputChange}
                value={transaction.description}
              />
            </FloatingLabel>
            <FloatingLabel
              label="Amount in ₱"
              className="mb-3"
            >
              <Form.Control
                name="amount"
                type="number"
                placeholder="ex. 500" 
                onChange={handleInputChange}
                value={transaction.amount}
              />
            </FloatingLabel>
            <Button variant="primary" type="submit" className="w-100">
              Add
            </Button>
          </Form>
        </fieldset>
    </>
  );
}

export default CreateTransactionForm;