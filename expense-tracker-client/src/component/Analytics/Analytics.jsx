import { Col, Container, Row } from "react-bootstrap";
import AnalyticsChart from "./AnalyticsChart";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../data/data";
import BudgetSummary from "../MainContent/BudgetSummary/BudgetSummary";
import { isObjectEmpty } from "../../utils/checker";
import { toastError } from "../../utils/toast";
import { amountFormatter } from "../../utils/formatter";

function Analytics() {

  const [totalDtos, setTotalDtos] = useState([]);

  const [totalsDtoWithHighestIncome, setTotalsDtoWithHighestIncome] = useState({});

  const [totalsDtoWithHighestExpense, setTotalsDtoWithHighestExpense] = useState({});

  const [totalRemainingBalanceOfAllBudgets, setTotalRemainingBalanceOfAllBudgets] = useState(NaN);

  useEffect(() => {
    getAllTotalDtos();
    getTotalsDtoWithHighestIncome();
    getTotalsDtoWithHighestExpense();
    getTotalRemainingBalanceOfAllBudgets();
  }, []);

  const getAllTotalDtos = async () => {
    await axios.get(`${baseUrl}/totals`)
      .then(res => setTotalDtos(res.data))
      .catch(err => toastError(err.message));
  }

  const getTotalsDtoWithHighestIncome = async () => {
    await axios.get(`${baseUrl}/totals/highest?category=income`)
      .then(res => setTotalsDtoWithHighestIncome(res.data))
      .catch(err => toastError(err.message));
  }

  const getTotalsDtoWithHighestExpense = async () => {
    await axios.get(`${baseUrl}/totals/highest?category=expense`)
      .then(res => setTotalsDtoWithHighestExpense(res.data))
      .catch(err => toastError(err.message));
  }

  const getTotalRemainingBalanceOfAllBudgets = async () => {
    await axios.get(`${baseUrl}/totals/remaining-balance`)
      .then(res => setTotalRemainingBalanceOfAllBudgets(res.data))
      .catch(err => toastError(err.message));
  }

  return (
    <Container fluid className='my-5 px-5 text-center'>
      <Row>
        <Col>
          <h1 className="text-info">Budget Analytics</h1>
          <p className="text-muted fst-italic">*Not mobile responsive yet</p>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xxl={{ span:'8', offset:'1' }}>
          <AnalyticsChart totalDtos={totalDtos} />
        </Col>
        <Col xxl={{ span:'3', }}>
          <Container>
            <Row className="text-start">
              <h3 className="fs-4 text-primary">
                Total remaining balance:
                <span className="fs-4 fw-bold text-info ms-3">
                  {
                    amountFormatter.format(totalRemainingBalanceOfAllBudgets)
                  }
                </span>
              </h3>
            </Row>
            <Row className="mt-3">
              <Col>
                {
                  !isObjectEmpty(totalsDtoWithHighestIncome) && totalsDtoWithHighestIncome &&
                    <BudgetSummary title={`${totalsDtoWithHighestIncome.budget.name} (highest by income)`} totals={totalsDtoWithHighestIncome.totals} />
                }
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                {
                  !isObjectEmpty(totalsDtoWithHighestExpense) && totalsDtoWithHighestExpense &&
                    <BudgetSummary title={`${totalsDtoWithHighestExpense.budget.name} (highest by expense)`} totals={totalsDtoWithHighestExpense.totals} />
                }
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Analytics;