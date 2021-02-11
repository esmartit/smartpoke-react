import React from 'react';
import {
    Row,
    Card,
    CardBody
} from 'reactstrap';
import TopCount from '../top-tiles/topTiles.js';

const urlBase = "http://localhost:3001";

const topListData = [
    {
        id: 1,
        api: urlBase+'/total-registered-count/?resourcePath=/sensor-activity/total-registered-count/',
        title: 'All',
        color: 'text-success',
        icon: 'fa-id-badge'
    },
    {
        id: 2,
        api: urlBase+'/today-registered-count/?resourcePath=/sensor-activity/daily-registered-count/',
        title: 'Today',
        color: 'text-success',
        icon: 'fa-id-badge'
    },
    {
        id: 3,
        api: urlBase+'/now-registered-count/?resourcePath=/sensor-activity/now-registered-count/',
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