import React from "react";

import {
    Card,
    CardBody,
    Col,
    Row
} from 'reactstrap';

const LoyaltyRate = () => {
    return (
        <Row>
            <Col sm={12}>
                <Card className="bg-dark text-white">
                    <CardBody>
                        <div className="d-flex">
                            <div className="stats">
                                <h1 className="text-white">{["31,4"]}%</h1>
                                <h6 className="text-white">{["Layalty Rate"]}</h6>
                            </div>
                            <div className="stats-icon text-right ml-auto"><i className="fas fa-handshake display-5 op-3 text-white"></i></div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}

export default LoyaltyRate;
