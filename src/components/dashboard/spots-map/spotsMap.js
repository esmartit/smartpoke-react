import React, { useState, useEffect } from "react";
// import React from "react";
import { VectorMap } from "react-jvectormap";
import { Card, CardBody } from "reactstrap";
// import sseClient from "./sseSpotMap";

import "../../../views/maps/VectorMap.css";

const timeZone = process.env.REACT_APP_TIME_ZONE;
const urlBase = process.env.REACT_APP_BASE_URL;

function SpotsMap() {
  const restApi = urlBase + "/today-countries/?resourcePath=/sensor-activity/today-countries/?timezone=" + timeZone;
  // const data = sseClient.useEventSource(restApi);

  const [data, updateData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    let seSpotMap = new EventSource(restApi);
    seSpotMap.onmessage = function logEvents(event) {
      if (isMounted) {
        updateData(JSON.parse(event.data));
        // let eventData = JSON.parse(event.data);
        // for (let i=0; i < eventData.length; i++) { 
        //     let name = eventData[i].name;
        //     let value = eventData[i].value;
        //     spotMap[name] = value
        // }
      }
      // updateData(spotMap);
    };

    seSpotMap.onerror = () => {
      seSpotMap.close();
    };
    return () => {
      isMounted = false;
      seSpotMap.close();
    };
  });

  const spotMap = data.map((spot) => {
    return {
      [spot.name]: spot.value,
    };
  });


  return (
    <Card>
      <CardBody>
        <h4 className="mb-4">Spots Map</h4>
        <VectorMap
          map={"world_mill"}
          backgroundColor="transparent"
          zoomOnScroll={false}
          markerStyle={{
            initial: {
              fill: "#FFF",
              stroke: "#383f47",
            },
          }}
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
                values: spotMap,
                scale: ["#99ABB4", "#007BFF"],
              },
            ],
          }}
        />
      </CardBody>
    </Card>
  );
};

export default SpotsMap;
