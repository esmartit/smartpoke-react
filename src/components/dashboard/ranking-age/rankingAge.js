import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Card, CardBody } from "reactstrap";
import customerService from "../../../services/hotspot-settings/customers.service";

function RankingAge() {
  const [customers, setCustomers] = useState([]);
  const [first, setFirst] = useState(true);
  const ageRanges = [];

  for (let x = 0; x <= 5; x++) {
    ageRanges[x] = 0;
  }

  const getCustomerList = () => {
    customerService
      .getAll()
      .then((response) => {
        setCustomers(response.data);
        setFirst(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    if (first) {
      getCustomerList();
    } else {
      let i = setInterval(() => {
        getCustomerList();
      }, 15000);
      return () => clearInterval(i);
    }
  }, [first]);

  for (let i = 0; i < customers.length; i++) {
    let msDiff = new Date().getTime() - new Date(customers[i].birthDate).getTime();
    let age = Math.floor(msDiff / (1000 * 60 * 60 * 24 * 365));

    if (age >= 0 && age < 26) ageRanges[5] += 1;
    if (age >= 26 && age < 36) ageRanges[4] += 1;
    if (age >= 36 && age < 46) ageRanges[3] += 1;
    if (age >= 46 && age < 56) ageRanges[2] += 1;
    if (age >= 56 && age < 66) ageRanges[1] += 1;
    if (age >= 66) ageRanges[0] += 1;  
  }

  const optionsAge = {
    colors: ["#4fc3f7"],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["66+", "56-65", "46-55", "36-45", "26-35", "0-25"],
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
      data: ageRanges,
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
            height="300"
          />
        </div>
      </CardBody>
    </Card>
  );
}

export default RankingAge;
