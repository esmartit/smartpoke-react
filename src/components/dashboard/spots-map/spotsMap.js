import React from "react";
import { VectorMap } from "react-jvectormap";
import { Card, CardBody } from "reactstrap";

import "../../../views/maps/VectorMap.css";

var mapData = {
  ES: 540,
};

const SpotsMap = () => {
  return (
    <Card>
      <CardBody>
        <h4 className="mb-4">Spots Map</h4>
        <VectorMap
          map={"world_mill"}
          backgroundColor="transparent"
          zoomOnScroll={false}
          containerStyle={{
            width: "100%",
            height: "360px",
          }}
          containerClassName="map"
          regionStyle={{
            initial: {
              fill: "transparent",
              "fill-opacity": 0.9,
              stroke: "#67757c",
              "stroke-width": 1,
              "stroke-opacity": 0.5,
            },
          }}
          series={{
            regions: [
              {
                values: mapData,
                scale: ["#99ABB4", "#007BFF"],
                // scale: ["#EF5350", "#FFC107", "#28A745"],
              },
            ],
          }}
        />
      </CardBody>
    </Card>
  );
};

export default SpotsMap;
