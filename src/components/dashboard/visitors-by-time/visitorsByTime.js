import React from "react";

import Chart from "react-apexcharts";
import { Card, CardBody } from "reactstrap";

const VisitorByTime = () => {
  const optionsVisitor = {
    chart: {
      id: "basic-bar",
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#26B99A", "#34495E", "#bdc3c7", "#3498DB"],
    legend: {
      show: false,
    },
    markers: {
      size: 3,
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    grid: {
      borderColor: "rgba(0,0,0,0.2)",
    },
    tooltip: {
      theme: "dark",
    },
  };
  const seriesVisitor = [
    {
      name: "TOTAL",
      data: [3822, 6212, 10318, 8722, 4551, 5121, 8128, 8410],
    }
  ];

  return (
    <Card>
      <CardBody>
        <div className="d-flex align-items-center">
          <div>
            <h4 className="card-title">Visitors </h4>
          </div>
          <div className="ml-auto">
            <select className="custom-select">
              <option value="0">Last Hour</option>
            </select>
          </div>
        </div>
      </CardBody>
      <div className="bg-blue stats-bar">
        <div className="row">
          <div className="col-lg-4 col-md-4">
            <div className="p-3 active w-100 text-truncate">
              <h6 className="text-white"><span><i className="fas fa-sign-in-alt"/> IN </span></h6>
              <h3 className="text-white m-b-0">1,345</h3>
            </div>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="p-3 w-100 text-truncate">
              <h6 className="text-white"><span><i className="fas fa-exchange-alt"/> LIMIT </span></h6>
              <h3 className="text-white m-b-0">2,589</h3>
            </div>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="p-3 w-100 text-truncate">
              <h6 className="text-white"><span><i className="fas fa-sign-out-alt"/> OUT </span></h6>
              <h3 className="text-white m-b-0">4,476</h3>
            </div>
          </div>
        </div>
      </div>
      <CardBody>
        <div className="mt-4">
          <div className="">
            <Chart
              options={optionsVisitor}
              series={seriesVisitor}
              type="area"
              height="350"
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default VisitorByTime;
