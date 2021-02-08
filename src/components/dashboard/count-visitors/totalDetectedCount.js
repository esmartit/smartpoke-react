import React, { useState, useEffect } from "react";
import { Col } from "reactstrap";

import "../top-tiles/topTiles.css";

// Create our number formatter.
const formatter = new Intl.NumberFormat("es-ES");

const TotalVisitors = () => {
  const [data, setData] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let eventSource = new EventSource("http://localhost:3001/total-detected-count");
      eventSource.onmessage = (e) => setData(JSON.parse(e.data));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  if (!data) {
    return (
      <Col ld="4">
        <div className="d-flex">
          <div className="mr-2 align-self-center">
            <i className="fas fa-mobile display-7 op-3 text-dark" />
          </div>
          <div className="align-self-center">
            <h6 className="text-dark mt-2 mb-2">All</h6>
            <h4 className="mt-0 text-dark">0</h4>
          </div>
        </div>
      </Col>
    );
  }
  return (
    <Col ld="4">
      <div className="d-flex">
        <div className="mr-2 align-self-center">
          <i className="fas fa-mobile display-7 op-3 text-dark" />
        </div>
        <div className="align-self-center">
          <h6 className="text-dark mt-2 mb-2">All</h6>
          <h4 className="mt-0 text-dark">{formatter.format(data.count)}</h4>
        </div>
      </div>
    </Col>
  );
};

export default TotalVisitors;
