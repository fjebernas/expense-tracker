import { Col, Container, Row } from "react-bootstrap";
import AnalyticsChart from "./AnalyticsChart";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../data/data";

function Analytics() {

  const [totalDtos, setTotalDtos] = useState([]);

  useEffect(() => {
    getAllTotalDtos();
  }, []);

  const getAllTotalDtos = async () => {
    await axios.get(`${baseUrl}/totals`)
    .then(res => setTotalDtos(res.data))
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
        <Col className="d-flex justify-content-center">
          <div className="position-relative d-flex justify-content-center" style={{ width: '70vw', height: '60vh' }}>
            <AnalyticsChart totalDtos={totalDtos} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Analytics;