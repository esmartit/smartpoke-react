import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Card, CardBody } from "reactstrap";
import service from "../../../services/home/rankingByBrand/rankingbybrands.service";

const timeZone = process.env.REACT_APP_TIME_ZONE;
const restApi = "/v3/sensor-activity/today-brands?timezone=" + timeZone;

function RankingBrand() {
  const [brands, setBrands] = useState([]);
  const [first, setFirst] = useState(true);

  const brandsSeries = [];
  const brandsLabels = [];

  function orderBrands(key, order = "asc") {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  }

  const getCounter = () => {
    service
      .getRankingByBrand(restApi)
      .then((response) => {
        setBrands(response.data);
        setFirst(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    if (first) {
      getCounter();
    } else {
      let i = setInterval(() => {
        getCounter();
      }, 15000);
      return () => clearInterval(i);
    }
  }, [first]);

  brands.sort(orderBrands("value", "desc"));
  for (let i = 0; i < brands.length; i++) {
    brandsSeries[i] = brands[i].value;
    brandsLabels[i] = brands[i].name;
  }

  const optionsBrand = {
    chart: {
      id: "donut-chart",
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        expandOnClick: true,
        offsetX: 0,
        offsetY: 0,
        customScale: 0.9,
        dataLabels: {
          offset: 0,
          minAngleToShowLabel: 5,
        },
        donut: {
          size: "70px",
          labels: {
            show: true,
          },
        },
      },
    },
    labels: brandsLabels,
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "8px",
        fontFamily: "Helvetica, Arial, sans-serif",
      },
    },
    stroke: {
      width: 0,
    },
    legend: {
      show: true,
    },
    colors: [
      "#26B99A",
      "#34495E",
      "#BDC3C7",
      "#3498DB",
      "#9B59B6",
      "#8abb6f",
      "#759c6a",
      "#bfd3b7",
      "#f57641",
      "#e3225e",
    ],
    tooltip: {
      fillSeriesColor: false,
      formatter: "{b} : {c} ({d}%)",
    },
  };

  return (
    <Card>
      <CardBody>
        <h4 className="card-title mb-4">Ranking by Brand</h4>
        <div className="pb-4">
        {/* <div className="chart-wrapper"> */}
          <Chart
            options={optionsBrand}
            series={brandsSeries}
            type="donut"
            height="300"
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default RankingBrand;
