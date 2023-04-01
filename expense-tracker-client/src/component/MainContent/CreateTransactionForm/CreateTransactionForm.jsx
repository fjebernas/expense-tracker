import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

function CreateTransactionForm(props) {

  const [transactionType, setTransactionType] = useState(null);

  const [transaction, setTransaction] = useState({
    description: '',
    amount: ''
  });

  const handleInputChange = (e) => {
    setTransaction({...transaction, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleTransationFormSubmit(transactionType, transaction, setTransaction);
  }

  return (
    <>
      <h4 className="mb-4 text-info">Add new transaction</h4>
      <Card body className="w-100">
        <fieldset disabled={isNaN(props.budgetId)}>
          <Form onSubmit={handleSubmit}>
            <div className="btn-group mb-3 w-100" role="group">
              <input type="radio" className="btn-check" name="options-outlined" id='income' />
              <label
                className="btn btn-outline-success"
                onClick={() => {setTransactionType('income')}}
                htmlFor='income'
              >
                Income
              </label>

              <input type="radio" className="btn-check" name="options-outlined" id='expense' />
              <label
                className="btn btn-outline-danger"
                onClick={() => {setTransactionType('expense')}}
                htmlFor='expense'
              >
                Expense
              </label>
            </div>
            <Form.Group className="mb-3 text-start">
              <Form.Label>Transaction</Form.Label>
              <Form.Control name="description" onChange={handleInputChange} value={transaction.description} type="text" placeholder="ex. Bills" />
            </Form.Group>
            <Form.Group className="mb-3 text-start">
              <Form.Label>Amount</Form.Label>
              <Form.Control name="amount" onChange={handleInputChange} value={transaction.amount} type="number" placeholder="ex. 500" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Add
            </Button>
          </Form>
        </fieldset>
      </Card>
    </>
  );
}

export default CreateTransactionForm;