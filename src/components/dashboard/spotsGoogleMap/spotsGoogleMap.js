import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Card, CardBody, Col } from "reactstrap";

import spotService from "../../../services/configurations/spots.service";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 40.4316,
  lng: -3.70426,
};

const SpotsGoogleMap = () => {
  const [selected, setSelected] = useState({});
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

  const spotsList = spotData.map((spot) => {
    return {
      name: spot.name,
      location: { lat: spot.latitude, lng: spot.longitude },
    };
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBJzdmyF7qWV1UtCpmEvBt4GUEYMnshNWU",
  });

  const onSelect = (item) => {
    setSelected(item);
  };

  return isLoaded ? (
    <Col sm={12} md={12}>
      <Card>
        <CardBody>
          <h4 className="mb-4">Spots Location</h4>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            {/* Child components, such as markers, info windows, etc. */}
            {spotsList.map((item) => {
              return (
                <Marker
                  key={item.name}
                  position={item.location}
                  onMouseOver={() => onSelect(item)}
                />
              );
            })}
            {selected.location && (
              <InfoWindow
                position={selected.location}
                clickable={true}
                onCloseClick={() => setSelected({})}
              >
                <p>{selected.name}</p>
              </InfoWindow>
            )}
          </GoogleMap>
        </CardBody>
      </Card>
    </Col>
  ) : (
    <></>
  );
};

export default SpotsGoogleMap;
