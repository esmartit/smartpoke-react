import React, { useState, useEffect } from "react";
import { VectorMap } from "react-jvectormap";
import { Card, CardBody } from "reactstrap";
import sseClient from "./sseSpotMap";
import spotService from "../../../services/configurations/spots.service";

import "../../../views/maps/VectorMap.css";

const timeZone = process.env.REACT_APP_TIME_ZONE || "Europe/Madrid";
const urlBase = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

const restApi =
  urlBase +
  "/today-countries/?resourcePath=/sensor-activity/today-countries/?timezone=" +
  timeZone;

const SpotsMap = () => {
  const [spotData, setSpotData] = useState([]);

  useEffect(() => {
    getSpotList();
  }, []);

  const getSpotList = () => {
    spotService
      .getAll()
      .then((response) => {
        setSpotData(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  function getMarkers() {
    const markers = {};
    for (let i=0; i < spotData.length; i++) {
      let latitude = spotData[i].latitude;
      let longitude = spotData[i].longitude;
      let name = spotData[i].name;

      markers[i] = {
        "latLng": [latitude, longitude],
        "name": name
      };
    };
    return markers;
  }
  const markers = getMarkers();
  const data = sseClient.useEventSource(restApi);

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
            markers: [
              {
                attribute: "r",
                scale: [5],
                value: [100],
                normalizeFunction: "polynomial",
              },
            ],
            regions: [
              {
                values: data,
                scale: ["#99ABB4", "#007BFF"],
              },
            ],
          }}
          markers={[
            markers,
          ]}
        />
      </CardBody>
    </Card>
  );
};

export default SpotsMap;
