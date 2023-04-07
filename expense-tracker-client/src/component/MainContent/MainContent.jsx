import axios from "axios";
import { useEffect, useState } from "react";
import { Accordion, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { baseUrl } from "../../data/data";
import { toastError, toastSuccess } from "../../utils/toast";
import BudgetBasicInfo from "./BudgetBasicInfo";
import BudgetListAndCreateForm from "./BudgetList/BudgetListAndCreateForm";
import BudgetTransactionsList from "./BudgetTransactionsList/BudgetTransactionsList";
import CreateTransactionForm from "./CreateTransactionForm/CreateTransactionForm";
import DeleteButton from "./DeleteButton";
import ChartsContainer from "./ChartsContainer/ChartsContainer";
import BudgetSummary from "./BudgetSummary/BudgetSummary";

function MainContent() {

  const [budgets, setBudgets] = useState([]);

  const [totals, setTotals] = useState({});

  const [incomeTransactions, setIncomeTransactions] = useState([]);

  const [expenseTransactions, setExpenseTransactions] = useState([]);

  const [transactionDtosOfBudget, setTransactionDtosOfBudget] = useState([]);

  const [currentBudget, setCurrentBudget] = useState({});
  
  useEffect(() => {
    getAllBudgets();
  }, []);

  const getAllBudgets = async () => {
    await axios.get(`${baseUrl}/budgets`)
      .then((res) => setBudgets(res.data))
      .catch(err => toastError(err.message));
  }

  const getTotalsByBudgetId = async (budgetId) => {
    await axios.get(`${baseUrl}/budgets/${budgetId}/totals`)
      .then((res) => setTotals(res.data.totals))
      .catch(err => toastError(err.message));
  }

  const getIncomeTransactionsByBudgetId = async (budgetId) => {
    await axios.get(`${baseUrl}/budgets/${budgetId}/incomes`)
      .then((res) => setIncomeTransactions(res.data))
      .catch(err => toastError(err.message));
  }

  const getExpenseTransactionsByBudgetId = async (budgetId) => {
    await axios.get(`${baseUrl}/budgets/${budgetId}/expenses`)
      .then((res) => setExpenseTransactions(res.data))
      .catch(err => toastError(err.message));
  }

  const getTransactionsByBudgetId = async (budgetId) => {
    await axios.get(`${baseUrl}/budgets/${budgetId}/transactions`)
    .then((res) => setTransactionDtosOfBudget(res.data))
    .catch(err => toastError(err.message));
  }

  const handleBudgetClick = (budget) => {
    getTotalsByBudgetId(budget.id);
    getIncomeTransactionsByBudgetId(budget.id);
    getExpenseTransactionsByBudgetId(budget.id);
    getTransactionsByBudgetId(budget.id);
    setCurrentBudget(budget);
  }

  const handleTransationFormSubmit = async (category, transactionRequest, setTransaction) => {
    if (category === 'income') {
      await axios.post(`${baseUrl}/budgets/${currentBudget.id}/incomes`, transactionRequest)
        .then(() => {
          toastSuccess('Income transaction added');
          setTransaction({
            description: '',
            amount: ''
          });
          getIncomeTransactionsByBudgetId(currentBudget.id);
          getTotalsByBudgetId(currentBudget.id);
          getTransactionsByBudgetId(currentBudget.id);
        })
        .catch(err => {
          err.response.data.errors.forEach(errMessage => {
            toastError(errMessage.defaultMessage);
          });
        });
    } else if (category === 'expense') {
      await axios.post(`${baseUrl}/budgets/${currentBudget.id}/expenses`, transactionRequest)
        .then(() => {
          toastSuccess('Expense transaction added');
          setTransaction({
            description: '',
            amount: ''
          });
          getExpenseTransactionsByBudgetId(currentBudget.id);
          getTotalsByBudgetId(currentBudget.id);
          getTransactionsByBudgetId(currentBudget.id);
        })
        .catch(err => {
          err.response.data.errors.forEach(errMessage => {
            toastError(errMessage.defaultMessage);
          });
        });
    } else {
      toastError('Choose if income or expense');
    }
  }

  const handleDeleteBudgetClick = async (budgetId) => {
    await axios.delete(`${baseUrl}/budgets/${budgetId}`)
      .then(() => {
        toastSuccess('Deleted budget');
        getAllBudgets();
        setIncomeTransactions([]);
        setExpenseTransactions([]);
        setTotals({});
      })
      .catch(err => toastError(err.message));
  }

  const handleDeleteTransactionClick = async (category, transactionId) => {
    if (category === 'income') {
      await axios.delete(`${baseUrl}/incomes/${transactionId}`)
        .then(() => {
          toastSuccess('Income transaction deleted');
          getTransactionsByBudgetId(currentBudget.id);
          getIncomeTransactionsByBudgetId(currentBudget.id);
          getTotalsByBudgetId(currentBudget.id);
        })
        .catch(err => toastError(err.message));
    } else if (category === 'expense') {
      await axios.delete(`${baseUrl}/expenses/${transactionId}`)
        .then(() => {
          toastSuccess('Expense transaction deleted');
          getTransactionsByBudgetId(currentBudget.id);
          getExpenseTransactionsByBudgetId(currentBudget.id);
          getTotalsByBudgetId(currentBudget.id);
        })
        .catch(err => toastError(err.message));
    } else {
      toastError('Transaction must be income or expense');
    }
  }

  return (
    <Container fluid className='my-5 px-5'>
      <Row>
        <Col xxl={2} className='mb-5'>
          <BudgetListAndCreateForm
            budgets={budgets}
            handleBudgetClick={handleBudgetClick}
            getAllBudgets={getAllBudgets}
          />
        </Col>
        <Col xxl={8} className='mb-5'>
          <Container fluid>
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <BudgetBasicInfo budgetName={currentBudget.name} totals={totals} />
              </Col>
            </Row>
            <Row>
              <Col>
                <Tabs
                  fill
                  defaultActiveKey="charts"
                  id="uncontrolled-tab-example"
                  className="mt-5 mb-3"
                >
                  <Tab eventKey="charts" title="Pie Charts">
                    <ChartsContainer
                      totals={totals}
                      incomeTransactions={incomeTransactions}
                      expenseTransactions={expenseTransactions}
                    />
                  </Tab>
                  <Tab eventKey="list" title="Transactions list">
                    <BudgetTransactionsList transactionDtos={transactionDtosOfBudget} handleDeleteTransactionClick={handleDeleteTransactionClick} />
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col xxl={2} className='mb-5'>
          <Container fluid>
            <Row>
              <Col>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <h3 className="fs-5 text-info">Add new transaction</h3>
                    </Accordion.Header>
                    <Accordion.Body>
                      <CreateTransactionForm
                        budgetId={currentBudget.id}
                        handleTransationFormSubmit={handleTransationFormSubmit}
                      />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <BudgetSummary title='Budget Summary' totals={totals} />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <DeleteButton
                  id={currentBudget.id}
                  handleClick={handleDeleteBudgetClick}
                  title='Delete budget'
                />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default MainContent;