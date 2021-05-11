import React from 'react';
import {
    Row,
    Card,
    CardBody
} from 'reactstrap';
import CountRegisteredTotal from "./countRegisteredTotal";
import CountRegisteredToday from "./countRegisteredToday";
import CountRegisteredNow from "./countRegisteredNow";

const TotalVisitors = () => {
    return (
        <Card>
            <CardBody>
                <h4 className="card-title mb-2">Users Registered</h4>
                <Row>
                    <CountRegisteredTotal />
                    <CountRegisteredToday />
                    <CountRegisteredNow />
                </Row>
            </CardBody>
        </Card>
    );
}

export default TotalVisitors;