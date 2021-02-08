import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";

import TotalRegisteredCount from "../count-registered/totalRegisteredCount"
import TodayRegisteredCount from "../count-registered/todayRegisteredCount"
import NowRegisteredCount from "../count-registered/nowRegisteredCount"

function TopRegisteredCount() {
  return (
    <Card>
      <CardBody>
        <h4 className="card-title mb-2">User Registered</h4>
        <Row>
        <Col ld={4}>
              <TotalRegisteredCount />
          </Col>
          <Col ld={4}>
            <TodayRegisteredCount />
          </Col>
          <Col ld={4}>
            <NowRegisteredCount />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default TopRegisteredCount;
