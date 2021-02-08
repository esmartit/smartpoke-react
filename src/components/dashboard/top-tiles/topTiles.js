import React from "react";
import { Col } from "reactstrap";

import topTilesService from "../../../services/home/toptiles.service";

import "./topTiles.css";

function TopCount({ api, title, color, icon }) {
  const data = topTilesService.useEventSource(api);

  if (!data) {
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
          <h4 className={`mt-0 ${color}`}>{data.count}</h4>
        </div>
      </div>
    </Col>
  );
}

export default TopCount;
