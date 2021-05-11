import React from 'react';
import {
    Row,
    Card,
    CardBody
} from 'reactstrap';
import CountVisitorsTotal from "./countVisitorsTotal";
import CountVisitorsToday from "./countVisitorsToday";
import CountVisitorsNow from "./countVisitorsNow";

const TotalVisitors = () => {
    return (
        <Card>
            <CardBody>
                <h4 className="card-title mb-2">Unique Visitors</h4>
                <Row>
                    <CountVisitorsTotal />
                    <CountVisitorsToday />
                    <CountVisitorsNow />
                </Row>
            </CardBody>
        </Card>
    );
}

export default TotalVisitors;