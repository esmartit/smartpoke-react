import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import spotService from "../../services/configurations/spots.service";
import businessTypeService from "../../services/maintenances/businessTypes.service";
import countryService from "../../services/maintenances/countries.service";
import stateService from "../../services/maintenances/states.service";
import cityService from "../../services/maintenances/cities.service";

import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Col,
  Row,
} from "reactstrap";

import "react-table/react-table.css";

function SpotTable() {
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [cityCode, setCityCode] = useState("");

  const [businessTypeData, setBusinessTypeData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);

  const [data, setData] = useState([]);
  const [spotData, setSpotData] = useState([]);
  const [noZone, setNoZone] = useState(false);
  const [noSensor, setNoSensor] = useState(false);
  const [noHotSpot, setNoHotSpot] = useState(false);

  const [alertMsg, setAlertMsg] = useState({
    color: "danger",
    text: "text-danger",
    icon: "fas fa-ban",
    msg: "Error occured while trying to request spots. Network error!",
  });
  const [loading, setLoading] = useState(true);

  // For Dismiss Button with Alert
  const [visible, setVisible] = useState(true);
  const onDismiss = () => {
    setVisible(false);
  };

  // For Open/Close Modal Create - Update
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  // For Open/Close Modal Delete
  const [modalDelete, setModalDelete] = useState(false);
  const toggleDelete = () => {
    setModalDelete(!modalDelete);
  };

  useEffect(() => {
    if (loading) {
      setVisible(false);
      getBusinessTypeList();
      getCountryList();
      getStateList();
      getCityList();
      getSpotList();
    }
  }, [loading]);

  const handleChangeCountry = (event) => {
    setCountryCode(event.target.value);
  };

  const handleChangeState = (event) => {
    setStateCode(event.target.value);
  };

  const handleChangeCity = (event) => {
    setCityCode(event.target.value);
  };

  const getBusinessTypeList = () => {
    businessTypeService
      .getAll()
      .then((response) => {
        setBusinessTypeData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(true);
        setVisible(true);
      });
  };

  const getCountryList = () => {
    countryService
      .getAll()
      .then((response) => {
        setCountryData(response.data);
      })
      .catch((error) => {
        setLoading(true);
        setVisible(true);
      });
  };

  const getStateList = () => {
    stateService
      .getAll()
      .then((response) => {
        setStateData(response.data);
      })
      .catch((error) => {
        setLoading(true);
        setVisible(true);
      });
  };

  const getCityList = () => {
    cityService
      .getAll()
      .then((response) => {
        setCityData(response.data);
      })
      .catch((error) => {
        setLoading(true);
        setVisible(true);
      });
  };

  const getSpotList = () => {
    spotService
      .getAll()
      .then((response) => {
        setSpotData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(true);
        setVisible(true);
      });
  };

  const getErrorMessage = (err) => {
    alertMsg.color = "danger";
    alertMsg.text = "text-danger";
    alertMsg.icon = "fas fa-ban";
    switch (err) {
      case 403:
        alertMsg.msg =
          "Something wrong happens with the spot. Network problem!";
        break;
      case 500:
        alertMsg.msg = "Spot already exist!";
        break;
      default:
        alertMsg.msg =
          "Error occured while trying to request spots. Network error!";
        break;
    }
    setAlertMsg(alertMsg);
  };

  const createItem = (data) => {
    spotService
      .create(data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Spot saved successful!";
        setAlertMsg(alertMsg);
        getSpotList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getSpotList();
      });
  };

  const updateItem = (data) => {
    spotService
      .update(data.id, data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Spot updated successful!";
        setAlertMsg(alertMsg);
        getSpotList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getSpotList();
      });
  };

  const deleteItem = (id) => {
    spotService
      .delete(id)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Spot deleted successful!";
        setAlertMsg(alertMsg);
        getSpotList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getSpotList();
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = event.target.id.value;
    let spotId = event.target.spotId.value;
    let name = event.target.name.value;
    let businessTypeId = event.target.businessTypeId.value;
    let latitude = event.target.latitude.value;
    let longitude = event.target.longitude.value;
    let countryId = event.target.countryId.value;
    let stateId = event.target.stateId.value;
    let cityId = event.target.cityId.value;
    let zipCode = event.target.zipCode.value;
    let item = {
      id: id,
      spotId: spotId,
      name: name,
      businessType: businessTypeId,
      latitude: latitude,
      longitude: longitude,
      country: countryId,
      state: stateId,
      city: cityId,
      zipCode: zipCode,
    };
    if (!id) {
      createItem(item);
    } else {
      updateItem(item);
    }
    setVisible(true);
    setModal(!modal);
  };

  const handleSubmitDelete = (event) => {
    event.preventDefault();
    let id = event.target.id.value;
    deleteItem(id);
    setVisible(true);
    setModalDelete(!modalDelete);
  };

  const dataSpot = spotData.map((spot) => {
    return {
      id: spot.id,
      spotId: spot.spotId,
      name: spot.name,
      businessTypeId: spot.businessType.id,
      businessTypeName: spot.businessType.name,
      latitude: spot.latitude,
      longitude: spot.longitude,
      countryId: spot.country.id,
      countryName: spot.country.name,
      stateId: spot.state.id,
      stateName: spot.state.name,
      cityId: spot.city.id,
      cityName: spot.city.name,
      zipCodeId: spot.zipcode.id,
      zipCode: spot.zipcode.zipCode,
      location: spot.zipcode.location,
      zones: spot.zones,
      sensors: spot.sensors,
      hotspots: spot.hotspots,
      actions: (
        // we've added some custom button actions
        <div className="text-center">
          {/* use this button to add a edit kind of action */}
          <Button
            onClick={() => {
              let item = dataSpot.find((o) => o.id === spot.id);
              setModal(!modal);
              setCountryCode(item.countryId);
              setStateCode(item.stateId);
              setCityCode(item.cityId);
              setData(item);
            }}
            color="inverse"
            size="sm"
            round="true"
            icon="true"
          >
            <i className="fa fa-edit" />
          </Button>
          {/* use this button to remove the data row */}
          <Button
            onClick={() => {
              let item = dataSpot.find((o) => o.id === spot.id);
              setModalDelete(!modalDelete);
              setNoZone(false);
              setNoSensor(false);
              setNoHotSpot(false);
              if (item.zones.length > 0 || 
                  item.sensors.length > 0 || 
                  item.hotspots.lenght > 0) {
                setNoZone(true);
                setNoSensor(true);
                setNoHotSpot(true);
              }
              setData(item);
            }}
            className="ml-1"
            color="inverse"
            size="sm"
            round="true"
            icon="true"
          >
            <i className="fa fa-trash-alt" />
          </Button>
        </div>
      ),
    };
  });

  return (
    <React.Fragment>
      {/*--------------------------------------------------------------------------------*/}
      {/* Modal to Create/Update Item*/}
      {/*--------------------------------------------------------------------------------*/}
      <Modal isOpen={modal} toggle={toggle.bind(null)}>
        <ModalHeader toggle={toggle.bind(null)}> Spot </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            <Row form>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="spotId">Spot Id *</Label>
                  <Input
                    type="text"
                    name="spotId"
                    id="spotId"
                    required={true}
                    defaultValue={data.spotId}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="name">Spot Name *</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    required={true}
                    defaultValue={data.name}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="selectBusinessType">Business Type *</Label>
                  <Input
                    type="select"
                    name="businessTypeId"
                    id="businessTypeId"
                    required={true}
                    defaultValue={data.businessTypeId}
                  >
                    <option value=""> -- Select Business Type -- </option>
                    {businessTypeData.map((businessType, key) => {
                      return (
                        <option key={businessType.id} value={businessType.id}>
                          {businessType.name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <Label for="latitude">Latitude</Label>
                  <Input
                    type="text"
                    name="latitude"
                    id="latitude"
                    defaultValue={data.latitude}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <Label for="longitude">Longitude</Label>
                  <Input
                    type="text"
                    name="longitude"
                    id="longitude"
                    defaultValue={data.longitude}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="selectCountry">Country *</Label>
                  <Input
                    type="select"
                    name="countryId"
                    id="countryId"
                    required={true}
                    defaultValue={data.countryId}
                    onChange={handleChangeCountry}
                  >
                    <option value=""> -- Select Country -- </option>
                    {countryData.map((country, key) => {
                      return (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="selectState">State *</Label>
                  <Input
                    type="select"
                    name="stateId"
                    id="stateId"
                    required={true}
                    defaultValue={data.stateId}
                    onChange={handleChangeState}
                    disabled={!countryCode}
                  >
                    <option value=""> -- Select State -- </option>
                    {countryCode
                      ? countryData
                          .find(({ id }) => id === countryCode)
                          .states.map((state) => (
                            <option key={state.id} value={state.id}>
                              {state.name}
                            </option>
                          ))
                      : []}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="selectCity">City *</Label>
                  <Input
                    type="select"
                    name="cityId"
                    id="cityId"
                    required={true}
                    defaultValue={data.cityId}
                    onChange={handleChangeCity}
                    disabled={!stateCode}
                  >
                    <option value=""> -- Select City -- </option>
                    {stateCode
                      ? stateData
                          .find(({ id }) => id === stateCode)
                          .cities.map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.name}
                            </option>
                          ))
                      : []}
                  </Input>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="selectZipCode">ZipCode *</Label>
                  <Input
                    type="select"
                    name="zipCode"
                    id="zipCode"
                    required={true}
                    defaultValue={data.zipCodeId}
                    disabled={!cityCode}
                  >
                    <option value=""> -- Select ZipCode -- </option>
                    {cityCode
                      ? cityData
                          .find(({ id }) => id === cityCode)
                          .zipcodes.map((zipcode) => (
                            <option key={zipcode.id} value={zipcode.id}>
                              {zipcode.zipCode} - {zipcode.location}
                            </option>
                          ))
                      : []}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Button color="success" type="submit">
                Save
              </Button>
              <Button
                color="secondary"
                className="ml-1"
                onClick={toggle.bind(null)}
              >
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>

      {/*--------------------------------------------------------------------------------*/}
      {/* Modal to Delete Item*/}
      {/*--------------------------------------------------------------------------------*/}
      <Modal isOpen={modalDelete} toggle={toggleDelete.bind(null)}>
        <ModalHeader toggle={toggleDelete.bind(null)}> Spot </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmitDelete(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            {!noSensor || !noZone || !noHotSpot ? (
              <div>
                Do you want to delete this spot? <b>{data.name}</b>
              </div>
            ) : (
              <div>
                You can not delete this spot. <b>{data.name}</b> has zones
                and/or sensors and/or hotspots associated.
              </div>
            )}
            <br />
            <FormGroup>
              <Button
                color="success"
                type="submit"
                disabled={noSensor || noZone || noHotSpot}
              >
                Delete
              </Button>
              <Button
                color="secondary"
                className="ml-1"
                onClick={toggleDelete.bind(null)}
              >
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>

      {/*--------------------------------------------------------------------------------*/}
      {/* Start Action table*/}
      {/*--------------------------------------------------------------------------------*/}
      <Card>
        {visible ? (
          <Alert
            color={alertMsg.color}
            isOpen={visible}
            toggle={onDismiss.bind(null)}
          >
            <div className="d-flex">
              <div className="stats">
                <h4 className={`mt-0 ${alertMsg.text}`}>{alertMsg.msg}</h4>
              </div>
              <div className="stats-icon text-left ml-auto">
                <i className={`${alertMsg.icon} display-7 op-3 text-dark`}></i>
              </div>
            </div>
          </Alert>
        ) : (
          ""
        )}
        <CardTitle className="mb-0 p-3 border-bottom bg-light">
          <i className="mdi mdi-map-marker display-7 mr-2"></i>List of Spots
        </CardTitle>
        <CardBody>
          <Button
            onClick={() => {
              let item = {
                id: "",
                spotId: "",
                name: "",
                businessType: "",
                latitude: 0.0,
                longitude: 0.0,
                country: "",
                state: "",
                city: "",
                zipCode: "",
              };
              setModal(!modal);
              setCountryCode("");
              setStateCode("");
              setCityCode("");
              setData(item);
            }}
            className="btn"
            outline
            color="secondary"
            type="submit"
          >
            New Spot
          </Button>
          <br />
          <br />
          <ReactTable
            columns={[
              {
                Header: "Spot Id",
                accessor: "spotId",
              },
              {
                Header: "Name",
                accessor: "name",
              },
              {
                Header: "BusinessType Code",
                accessor: "businessTypeId",
                show: false,
              },
              {
                Header: "Business Type",
                accessor: "businessTypeName",
              },
              {
                Header: "Latitude",
                accessor: "latitude",
                show: false,
              },
              {
                Header: "Longitude",
                accessor: "longitude",
                show: false,
              },
              {
                Header: "Country Code",
                accessor: "countryId",
                show: false,
              },
              {
                Header: "Country",
                accessor: "countryName",
              },
              {
                Header: "State Code",
                accessor: "stateId",
                show: false,
              },
              {
                Header: "State",
                accessor: "stateName",
              },
              {
                Header: "City Code",
                accessor: "cityId",
                show: false,
              },
              {
                Header: "City",
                accessor: "cityName",
              },
              {
                Header: "ZipCode",
                accessor: "zipCode",
              },
              {
                Header: "Location",
                accessor: "location",
              },
              {
                Header: "Actions",
                accessor: "actions",
                sortable: false,
                filterable: false,
              },
            ]}
            defaultPageSize={10}
            showPaginationBottom={true}
            className="-striped -highlight"
            data={dataSpot}
            filterable
          />
        </CardBody>
      </Card>
      {/*--------------------------------------------------------------------------------*/}
      {/* End Action table*/}
      {/*--------------------------------------------------------------------------------*/}
    </React.Fragment>
  );
}

export default SpotTable;
