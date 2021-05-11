import React, { useState, useEffect } from "react";
import { Col } from "reactstrap";
import service from "../../../services/home/topTiles/toptilecounters.service";

import "./topTiles.css";

const timeZone = process.env.REACT_APP_TIME_ZONE;
const restApi = '/v3/sensor-activity/total-detected-count/?timezone='+timeZone;

function CountVisitorsTotal() {
  const [counter, updateCounter] = useState(0);
  const [first, setFirst] = useState(true);

  const getCounter = () => {
    service.getTotalDetectedCount(restApi)
    .then((response) => {
      updateCounter(response.data);
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

  if (!counter) {
    return (
      <Col ld="4">
        <div className="d-flex">
          <div className="mr-2 align-self-center">
            <i className={"fas fa-mobile display-7 op-3 text-dark"} />
          </div>
          <div className="align-self-center">
            <h6 className="text-dark mt-2 mb-2">All</h6>
            <h4 className="mt-0 text-dark">Loading...</h4>
          </div>
        </div>
      </Col>
    );
  }

  return (
    <Col ld="4">
      <div className="d-flex">
        <div className="mr-2 align-self-center">
          <i className={"fas fa-mobile display-7 op-3 text-dark"} />
        </div>
        <div className="align-self-center">
        <h6 className="text-dark mt-2 mb-2">All</h6>
          <h4 className="mt-0 text-dark">{Intl.NumberFormat().format(counter.count)}</h4>
        </div>
      </div>
    </Col>
  );
}

export default CountVisitorsTotal;
