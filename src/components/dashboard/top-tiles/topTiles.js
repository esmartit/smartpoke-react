import React, { useState, useEffect } from "react";
import { Col } from "reactstrap";

import "./topTiles.css";

function TopCount({ restApi, title, color, icon }) {
  const [counter, updateCounter] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let sseCounter = new EventSource(restApi);
    sseCounter.onmessage = function logEvents(event) {
      if (isMounted) updateCounter(JSON.parse(event.data));
    };
    sseCounter.onerror = () => {
      sseCounter.close();
    }
    return () => {
      isMounted = false;
      sseCounter.close();
    };
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
