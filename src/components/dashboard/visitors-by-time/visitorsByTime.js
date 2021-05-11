import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Card, CardBody } from "reactstrap";


const timeZone = process.env.REACT_APP_TIME_ZONE;
const urlBase = process.env.REACT_APP_BASE_URL;

const VisitorByTime = () => {
  let dataIn = 0;
  let dataLimit = 0;
  let dataOut = 0;
  let inData = [];
  let limitData = [];
  let outData = [];
  let devices = [];
  let axisTime = [];  

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
      position: "top",
      horizontalAlign: "center",
      show: true,
    },
    markers: {
      size: 3,
      style: 'hollow',
    },
    xaxis: {
      categories: axisTime,
      tickAmount: 15,
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
      data: devices,
    },
    {
      name: "IN",
      data: inData,
    },
    {
      name: "LIMIT",
      data: limitData,
    },
    {
      name: "OUT",
      data: outData,
    },
  ];

  const [data, updateData] = useState([]);
  const [lastRange, setLastRange] = useState(60);
  const restApi = urlBase + '/now-detected/?resourcePath=/sensor-activity/v2/now-detected/?timezone='+timeZone+'&range='+lastRange;
  
  function handleChange(event) {
    setLastRange(event.target.value);
  }

  useEffect(() => {
    let isMounted = true;
    let seVisitorsByTime = new EventSource(restApi);
    seVisitorsByTime.onmessage = function logEvents(event) {
      if (isMounted) {
        updateData(JSON.parse(event.data));
      }
    };
    seVisitorsByTime.onerror = () => {
      seVisitorsByTime.close();
    }
    return () => {
      isMounted = false;
      seVisitorsByTime.close();
    };
  }, [restApi]);

  for (let i=0; i < data.length; i++) {    
    let axis = (new Date(data[i]['time'])).toTimeString();
    let xTime = axis.substring(0,5);
    dataIn = dataIn + data[i]['inCount'];
    dataLimit = dataLimit + data[i]['limitCount'];
    dataOut = dataOut + data[i]['outCount'];
    inData[i] = data[i]['inCount'];
    limitData[i] = data[i]['limitCount'];
    outData[i] = data[i]['outCount'];
    devices[i] = inData[i] + limitData[i] + outData[i];
    axisTime[i] = xTime;
  }

  return (
    <Card>
      <CardBody>
        <div className="d-flex align-items-center">
          <div>
            <h4 className="card-title">Visitors </h4>
          </div>
          <div className="ml-auto">
            <select className="custom-select" value={lastRange} onChange={handleChange}>            
              <option value="15">Last 15 min</option>
              <option value="30">Last 30 min</option>
              <option value="60">Last hour</option>
              <option value="120">Last 2 hours</option>
            </select>
          </div>
        </div>
      </CardBody>
      <div className="bg-blue stats-bar">
        <div className="row">
          <div className="col-lg-4 col-md-4">
            <div className="p-3 active w-100 text-truncate">
              <h6 className="text-white">
                <span>
                  <i className="fas fa-sign-in-alt" /> IN
                </span>
              </h6>
              <h3 className="text-white m-b-0">{Intl.NumberFormat().format(dataIn)}</h3>
            </div>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="p-3 w-100 text-truncate">
              <h6 className="text-white">
                <span>
                  <i className="fas fa-exchange-alt" /> LIMIT
                </span>
              </h6>
              <h3 className="text-white m-b-0">{Intl.NumberFormat().format(dataLimit)}</h3>
            </div>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="p-3 w-100 text-truncate">
              <h6 className="text-white">
                <span>
                  <i className="fas fa-sign-out-alt" /> OUT
                </span>
              </h6>
              <h3 className="text-white m-b-0">{Intl.NumberFormat().format(dataOut)}</h3>
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
