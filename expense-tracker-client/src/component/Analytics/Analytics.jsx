import { Col, Container, Row } from "react-bootstrap";
import AnalyticsChart from "./AnalyticsChart";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../data/data";
import BudgetSummary from "../MainContent/BudgetSummary/BudgetSummary";
import { isObjectEmpty } from "../../utils/checker";

function Analytics() {

  const [totalDtos, setTotalDtos] = useState([]);

  const [totalsDtoWithHighestIncome, setTotalsDtoWithHighestIncome] = useState({});

  const [totalsDtoWithHighestExpense, setTotalsDtoWithHighestExpense] = useState({});

  useEffect(() => {
    getAllTotalDtos();
    getTotalsDtoWithHighestIncome();
    getTotalsDtoWithHighestExpense();
  }, []);

  const getAllTotalDtos = async () => {
    await axios.get(`${baseUrl}/totals`)
      .then(res => setTotalDtos(res.data))
      .catch();
  }

  const getTotalsDtoWithHighestIncome = async () => {
    await axios.get(`${baseUrl}/totals/highest?category=income`)
      .then(res => setTotalsDtoWithHighestIncome(res.data))
      .catch();
  }

  const getTotalsDtoWithHighestExpense = async () => {
    await axios.get(`${baseUrl}/totals/highest?category=expense`)
      .then(res => setTotalsDtoWithHighestExpense(res.data))
      .catch();
  }

  return (
    <Container fluid className='my-5 px-5'>
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
            <Row>
              <Col>
                {
                  !isObjectEmpty(totalsDtoWithHighestIncome) && <BudgetSummary title={`Highest by income: ${totalsDtoWithHighestIncome.budget.name}`} totals={totalsDtoWithHighestIncome.totals} />
                }
              </Col>
            </Row>
            <Row className="mt-5">
              <Col>
                {
                  !isObjectEmpty(totalsDtoWithHighestExpense) && <BudgetSummary title={`Highest by expense: ${totalsDtoWithHighestExpense.budget.name}`} totals={totalsDtoWithHighestExpense.totals} />
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