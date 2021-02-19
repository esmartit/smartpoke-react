import React, { useState, useEffect } from "react";
import { Col } from "reactstrap";
import { interval } from "rxjs";
import service from "../../../services/home/topTiles/toptilecounters.service";

import "./topTiles.css";

function TopCount({ restApi, title, color, icon }) {
  const [counter, updateCounter] = useState(0);

  useEffect(() => {
    setInterval(() => {
      service.getTopTileCounter(restApi)
        .then((response) => {
          updateCounter(response.data);
        })
        .catch((error) => {
          console.log(error.message);
          updateCounter(0);
        });

       return clearInterval(interval);
    }, 15000);
  }, [restApi]);

  if (!counter) {
    return (
      <Col ld="4">
        <div className="d-flex">
          <div className="mr-2 align-self-center">
            <i className={`fas ${icon} display-7 op-3 text-dark`} />
          </div>
          <div className="align-self-center">
            <h6 className="text-dark mt-2 mb-2">{title}</h6>
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
          <i className={`fas ${icon} display-7 op-3 text-dark`} />
        </div>
        <div className="align-self-center">
          <h6 className="text-dark mt-2 mb-2">{title}</h6>
          <h4 className={`mt-0 ${color}`}>{counter.count}</h4>
        </div>
      </div>
    </Col>
  );
}

export default TopCount;
