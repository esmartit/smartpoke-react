import React from "react";
import Chart from 'react-apexcharts';
import { Card, CardBody } from 'reactstrap';

const RankingBrand = () => {

    const optionsBrand = {
        chart: {
            id: "donut-chart",
        },
        grid: {
            padding: {
                left: 0,
                right: 0
            }
        },
        plotOptions: {
            pie: {
                startAngle: 0,
                expandOnClick: true,
                offsetX: 0,
                offsetY: 0,
                customScale: 0.90,
                dataLabels: {
                    offset: 0,
                    minAngleToShowLabel: 5
                }, 
                donut: {
                    size: '70px',
                    labels: {
                        show: true,
                    }                    
                }
            }
        },
        labels: ['Samsung', 'Others', 'Apple', 'Xiaomi', 'Motorola', 'LG', 'Huawei'],
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '8px',
                fontFamily: 'Helvetica, Arial, sans-serif',
            }
        },
        stroke: {
            width: 0
        },
        legend: {
            show: true,
        },
        colors: [   '#26B99A', '#34495E', '#BDC3C7', '#3498DB',
                    '#9B59B6', '#8abb6f', '#759c6a', '#bfd3b7',
                    '#f57641', '#e3225e'
                ],
        tooltip: {
            fillSeriesColor: false,
            formatter: '{b} : {c} ({d}%)',
        }
    };

    const seriesBrand = [ 400, 230, 145, 115, 70, 18, 5 ];


    return (
        <Card>
            <CardBody>
                <h4 className="card-title mb-4">Ranking by Brand</h4>
                <div className="pb-4">
                    <Chart
                        options={optionsBrand}
                        series={seriesBrand}
                        type="donut"
                        height="190"
                    />
                </div>
            </CardBody>
        </Card>
    );
}

export default RankingBrand;

