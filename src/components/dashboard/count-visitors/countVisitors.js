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
        api: urlBase+'/total-detected-count/?resourcePath=/sensor-activity/total-detected-count/',
        title: 'All',
        color: 'text-dark',
        icon: 'fa-mobile'
    },
    {
        id: 2,
        api: urlBase+'/today-detected-count/?resourcePath=/sensor-activity/today-detected-count/',
        title: 'Today',
        color: 'text-dark',
        icon: 'fa-mobile'
    },
    {
        id: 3,
        api: urlBase+'/now-detected-count/?resourcePath=/sensor-activity/v2/now-detected-count/',
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