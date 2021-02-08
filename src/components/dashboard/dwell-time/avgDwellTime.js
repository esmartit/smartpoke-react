import React from "react";

import {
    Card,
    CardBody,
    Col,
    Row
} from 'reactstrap';

const AvgDwellTime = () => {
    return (
        <Row>
            <Col sm={12}>
                <Card className="bg-success text-white">
                    <CardBody>
                        <div className="d-flex">
                            <div className="stats">
                                <h1 className="text-white">{["02:35:13"]}</h1>
                                <h6 className="text-white">{["Avg. Dwell Time"]}</h6>
                            </div>
                            <div className="stats-icon text-right ml-auto"><i className="fas fa-clock display-5 op-3 text-dark"></i></div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}

export default AvgDwellTime;
