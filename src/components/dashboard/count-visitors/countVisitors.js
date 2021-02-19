import React from 'react';
import {
    Row,
    Card,
    CardBody
} from 'reactstrap';
import TopCount from '../top-tiles/topTiles';

const timeZone = process.env.REACT_APP_TIME_ZONE;

const topListData = [
    {
        id: 'TotalDetectedCount',
        restApi: '/v3/sensor-activity/total-detected-count/?timezone='+timeZone,
        title: 'All',
        color: 'text-dark',
        icon: 'fa-mobile'
    },
    {
        id: 'TodayDetectedCount',
        restApi: '/v3/sensor-activity/today-detected-count/?timezone='+timeZone,
        title: 'Today',
        color: 'text-dark',
        icon: 'fa-mobile'
    },
    {
        id: 'NowDetectedCount',
        restApi: '/v3/sensor-activity/now-detected-count/?timezone='+timeZone,
        title: 'Now',
        color: 'text-dark',
        icon: 'fa-mobile'
    }
]

const TotalVisitors = () => {
    return (
        <Card>
            <CardBody>
                <h4 className="card-title mb-2">Unique Visitors</h4>
                <Row>
                    {
                        topListData.map((topData) => <TopCount key={topData.id} {...topData} />)
                    }
                </Row>
            </CardBody>
        </Card>
    );
}

export default TotalVisitors;