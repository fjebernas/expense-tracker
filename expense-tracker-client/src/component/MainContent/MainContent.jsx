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

  const [budgetName, setBudgetName] = useState('');

  const [totals, setTotals] = useState({});

  const [incomeTransactions, setIncomeTransactions] = useState([]);

  const [expenseTransactions, setExpenseTransactions] = useState([]);

  const [currentBudgetId, setCurrentBudgetId] = useState(NaN);

  const [transactionDtosOfBudget, setTransactionDtosOfBudget] = useState([]);
  
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

  const handleBudgetClick = (budgetName, budgetId) => {
    setBudgetName(budgetName);
    getTotalsByBudgetId(budgetId);
    getIncomeTransactionsByBudgetId(budgetId);
    getExpenseTransactionsByBudgetId(budgetId);
    setCurrentBudgetId(budgetId);
    getTransactionsByBudgetId(budgetId);
  }

  const handleTransationFormSubmit = async (transactionType, transactionRequest, setTransaction) => {
    if (transactionType === 'income') {
      await axios.post(`${baseUrl}/budgets/${currentBudgetId}/incomes`, transactionRequest)
        .then(() => {
          toastSuccess('Income transaction added');
          setTransaction({
            description: '',
            amount: ''
          });
          getIncomeTransactionsByBudgetId(currentBudgetId);
          getTotalsByBudgetId(currentBudgetId);
          getTransactionsByBudgetId(currentBudgetId);
        })
        .catch(err => {
          err.response.data.errors.forEach(errMessage => {
            toastError(errMessage.defaultMessage);
          });
        });
    } else if (transactionType === 'expense') {
      await axios.post(`${baseUrl}/budgets/${currentBudgetId}/expenses`, transactionRequest)
        .then(() => {
          toastSuccess('Expense transaction added');
          setTransaction({
            description: '',
            amount: ''
          });
          getExpenseTransactionsByBudgetId(currentBudgetId);
          getTotalsByBudgetId(currentBudgetId);
          getTransactionsByBudgetId(currentBudgetId);
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
        setCurrentBudgetId(NaN);
        setBudgetName('')
      })
      .catch(err => toastError(err.message));
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
                <BudgetBasicInfo budgetName={budgetName} totals={totals} />
              </Col>
              <Col md={{ span: 2 }} className='d-flex align-items-center justify-content-center'>
                
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
                    <BudgetTransactionsList transactionDtos={transactionDtosOfBudget} />
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
                        budgetId={currentBudgetId}
                        handleTransationFormSubmit={handleTransationFormSubmit}
                      />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <BudgetSummary totals={totals} />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <DeleteButton
                  id={currentBudgetId}
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