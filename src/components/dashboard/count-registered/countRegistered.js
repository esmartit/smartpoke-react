import React from 'react';
import {
    Row,
    Card,
    CardBody
} from 'reactstrap';
import TopCount from '../top-tiles/topTiles.js';

const timeZone = process.env.REACT_APP_TIME_ZONE;

const topListData = [
    {
        id: 'TotalRegisteredCount',
        restApi: '/v3/sensor-activity/total-registered-count/?timezone='+timeZone,
        title: 'All',
        color: 'text-success',
        icon: 'fa-id-badge'
    },
    {
        id: 'TodayRegisteredCount',
        restApi: '/v3/sensor-activity/daily-registered-count/?timezone='+timeZone,
        title: 'Today',
        color: 'text-success',
        icon: 'fa-id-badge'
    },
    {
        id: 'NowRegisteredCount',
        restApi: '/v3/sensor-activity/now-registered-count/?timezone='+timeZone,
        title: 'Now',
        color: 'text-success',
        icon: 'fa-id-badge'
    }
]

const TotalRegistered = () => {
    return (
        <Card>
            <CardBody>
                <h4 className="card-title mb-2">Users Registered</h4>
                <Row>
                    {
                        topListData.map((topData) => <TopCount key={topData.id} {...topData} />)
                    }
                </Row>
            </CardBody>
        </Card>
    );
}

export default TotalRegistered;