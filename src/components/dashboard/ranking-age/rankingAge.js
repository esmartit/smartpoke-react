import React from "react";
import Chart from 'react-apexcharts';
import { Card, CardBody } from 'reactstrap';

const RankingAge = () => {

    const optionsAge = {
        colors: ["#4fc3f7"],
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [
            "65+",
            "56-65",
            "46-55",
            "36-45",
            "26-35",
            "0-25",
          ],
          labels: {
            style: {
              cssClass: "grey--text lighten-2--text fill-color",
            },
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        grid: {
          borderColor: "rgba(0,0,0,0.1)",
        },
        yaxis: {
          labels: {
            style: {
              cssClass: "grey--text lighten-2--text fill-color",
            },
          },
        },
        tooltip: {
          theme: "dark",
        },
      };
    
      const seriesAge = [
        {
          data: [1, 2, 12, 17, 11, 7],
        },
      ];    

    return (
        <Card>
            <CardBody>
                <h4 className="card-title mb-4">Ranking by Age</h4>
                <div className="chart-wrapper">
                    <Chart 
                        options={optionsAge}
                        series={seriesAge}
                        type="bar"
                        height="280"
                    />
                </div>
            </CardBody>
        </Card>
    );
}

export default RankingAge;

