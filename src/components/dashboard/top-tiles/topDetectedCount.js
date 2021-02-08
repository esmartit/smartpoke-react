import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";

import TotalDetectedCount from "../count-visitors/totalDetectedCount"
import TodayDetectedCount from "../count-visitors/todayDetectedCount"
import NowDetectedCount from "../count-visitors/nowDetectedCount"

function TopDetectedCount() {
  return (
    <Card>
      <CardBody>
        <h4 className="card-title mb-2">Unique Visitors</h4>
        <Row>
          <Col ld={4}>
              <TotalDetectedCount />
          </Col>
          <Col ld={4}>
            <TodayDetectedCount />
          </Col>
          <Col ld={4}>
            <NowDetectedCount />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default TopDetectedCount;
