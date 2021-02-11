import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import spotService from "../../services/configurations/spots.service";
import sensorService from "../../services/bigdata-settings/sensors.service";

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
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import "react-table/react-table.css";

function SensorTable() {
  const [spotCode, setSpotCode] = useState("");
  const [spotData, setSpotData] = useState([]);

  const [sliderIn, setSliderIn] = useState(-50);
  const [sliderLimit, setSliderLimit] = useState(-60);
  const [sliderOut, setSliderOut] = useState(-70);
  const [sensorTags, setSensorTags] = useState([]);

  const [data, setData] = useState([]);
  const [sensorData, setSensorData] = useState([]);

  const [alertMsg, setAlertMsg] = useState({
    color: "danger",
    text: "text-danger",
    icon: "fas fa-ban",
    msg: "Error occured while trying to request sensors. Network error!",
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
      getSpotList();
      getSensorList();
    }
  }, [loading]);

  const getSpotList = () => {
    spotService
      .getAll()
      .then((response) => {
        setSpotData(response.data);
      })
      .catch((error) => {
        setLoading(true);
        setVisible(true);
      });
  };

  const getSensorList = () => {
    sensorService
      .getAll()
      .then((response) => {
        setSensorData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(true);
        setVisible(true);
      });
  };

  const handleChangeSpot = (event) => {
    setSpotCode(event.target.value);
  };

  const handleChangePwrIn = (event) => {
    setSliderIn(event.target.value);
  };

  const handleChangePwrLimit = (event) => {
    setSliderLimit(event.target.value);
  };

  const handleChangePwrOut = (event) => {
    setSliderOut(event.target.value);
  };

  const handleSensorTags = (tags) => {
    setSensorTags(tags);
  };

  const getErrorMessage = (err) => {
    alertMsg.color = "danger";
    alertMsg.text = "text-danger";
    alertMsg.icon = "fas fa-ban";
    switch (err) {
      case 403:
        alertMsg.msg =
          "Something wrong happens with the sensor. Network problem!";
        break;
      case 500:
        alertMsg.msg = "Sensor Type already exist!";
        break;
      default:
        alertMsg.msg =
          "Error occured while trying to request sensors. Network error!";
        break;
    }
    setAlertMsg(alertMsg);
  };

  const createItem = (data) => {
    sensorService
      .create(data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Sensor saved successful!";
        setAlertMsg(alertMsg);
        getSensorList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getSensorList();
      });
  };

  const updateItem = (data) => {
    sensorService
      .update(data.id, data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Sensor updated successful!";
        setAlertMsg(alertMsg);
        getSensorList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getSensorList();
      });
  };

  const deleteItem = (id) => {
    sensorService
      .delete(id)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Sensor deleted successful!";
        setAlertMsg(alertMsg);
        getSensorList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getSensorList();
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = event.target.id.value;
    let spotId = event.target.spotId.value;
    let zoneId = event.target.zoneId.value;
    let sensorId = event.target.sensorId.value;
    let location = event.target.location.value;
    let pwrIn = event.target.pwrIn.value;
    let pwrLimit = event.target.pwrLimit.value;
    let pwrOut = event.target.pwrOut.value;
    let apMac = event.target.apMac.value;
    let serialNumber = event.target.serialNumber.value;
    let tags = sensorTags;
    let item = {
      id: id,
      spot: spotId,
      zone: zoneId,
      sensorId: sensorId,
      location: location,
      pwrIn: pwrIn,
      pwrLimit: pwrLimit,
      pwrOut: pwrOut,
      apMac: apMac,
      serialNumber: serialNumber,
      tags: tags,
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

  const dataSensor = sensorData.map((sensor) => {
    return {
      id: sensor.id,
      spotId: sensor.spot.id,
      spotName: sensor.spot.name,
      zoneId: sensor.zone.id,
      zoneName: sensor.zone.name,
      sensorId: sensor.sensorId,
      location: sensor.location,
      pwrIn: sensor.pwrIn,
      pwrLimit: sensor.pwrLimit,
      pwrOut: sensor.pwrOut,
      apMac: sensor.apMac,
      serialNumber: sensor.serialNumber,
      tags: sensor.tags,
      actions: (
        // we've added some custom button actions
        <div className="text-center">
          {/* use this button to add a edit kind of action */}
          <Button
            onClick={() => {
              let item = dataSensor.find((o) => o.id === sensor.id);
              setModal(!modal);
              setSpotCode(item.spotId);
              setSliderIn(item.pwrIn);
              setSliderLimit(item.pwrLimit);
              setSliderOut(item.pwrOut);
              setSensorTags(item.tags);
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
              let item = dataSensor.find((o) => o.id === sensor.id);
              setModalDelete(!modalDelete);
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
        <ModalHeader toggle={toggle.bind(null)}> Sensor </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            <Row form>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="selectSpot">Spot *</Label>
                  <Input
                    type="select"
                    name="spotId"
                    id="spotId"
                    required={true}
                    defaultValue={data.spotId}
                    onChange={handleChangeSpot}
                  >
                    <option value=""> -- Select Spot -- </option>
                    {spotData.map((spot, key) => {
                      return (
                        <option key={spot.id} value={spot.id}>
                          {spot.name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="selectZone">Zone *</Label>
                  <Input
                    type="select"
                    name="zoneId"
                    id="zoneId"
                    required={true}
                    defaultValue={data.zoneId}
                    disabled={!spotCode}
                  >
                    <option value=""> -- Select Zone -- </option>
                    {spotCode
                      ? spotData
                          .find(({ id }) => id === spotCode)
                          .zones.map((zone) => (
                            <option key={zone.id} value={zone.id}>
                              {zone.name}
                            </option>
                          ))
                      : []}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="sensorId">Sensor Id *</Label>
                  <Input
                    type="text"
                    name="sensorId"
                    id="sensorId"
                    required={true}
                    defaultValue={data.sensorId}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="location">Location *</Label>
                  <Input
                    type="text"
                    name="location"
                    id="location"
                    required={true}
                    defaultValue={data.location}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={12} md={4}>
                <FormGroup>
                  <Label for="pwrIn">
                    <h4>
                      IN <b>{sliderIn}</b>
                    </h4>
                  </Label>
                  <Input
                    type="range"
                    name="pwrIn"
                    id="pwrIn"
                    min={-99}
                    max={-2}
                    tooltip="true"
                    value={sliderIn}
                    onChange={handleChangePwrIn}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={4}>
                <FormGroup>
                  <Label for="pwrLimit">
                    <h4>
                      LIMIT <b>{sliderLimit}</b>
                    </h4>
                  </Label>
                  <Input
                    type="range"
                    name="pwrLimit"
                    id="pwrLimit"
                    min={-99}
                    max={-2}
                    tooltip="true"
                    value={sliderLimit}
                    onChange={handleChangePwrLimit}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={4}>
                <FormGroup>
                  <Label for="pwrOut">
                    <h4>
                      Out <b>{sliderOut}</b>
                    </h4>
                  </Label>
                  <Input
                    type="range"
                    name="pwrOut"
                    id="pwrOut"
                    min={-99}
                    max={-2}
                    tooltip="true"
                    value={sliderOut}
                    onChange={handleChangePwrOut}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="apMac">AP Mac *</Label>
                  <Input
                    type="text"
                    name="apMac"
                    id="apMac"
                    required={true}
                    defaultValue={data.apMac}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="serialNumber">Serial Number</Label>
                  <Input
                    type="text"
                    name="serialNumber"
                    id="serialNumber"
                    defaultValue={data.serialNumber}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={12}>
                <FormGroup>
                  <Label for="sensorTags">Tags *</Label>
                  <TagsInput
                    value={sensorTags}
                    onChange={(sensortags) => handleSensorTags(sensortags)}
                    tagProps={{
                      className:
                        "react-tagsinput-tag bg-info text-white rounded",
                    }}
                  />
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
        <ModalHeader toggle={toggleDelete.bind(null)}> Sensor </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmitDelete(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            <div>
              Do you want to delete this sensor?
              <div>
                <b>Sensor: {data.sensorId}</b>
              </div>
              <div>
                <b>Location: {data.location}</b>
              </div>
            </div>
            <br />
            <FormGroup>
              <Button color="success" type="submit">
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
          <i className="mdi mdi-access-point display-7 mr-2"></i>List of Sensors
        </CardTitle>
        <CardBody>
          <Button
            onClick={() => {
              let item = {
                id: "",
                spot: "",
                zone: "",
                sensorId: "",
                location: "",
                pwrIn: -50,
                pwrLimit: -60,
                pwrOut: -70,
                apMac: "",
                serialNumber: "",
                tags: [],
              };
              setSpotCode(item.spotId);
              setSliderIn(item.pwrIn);
              setSliderLimit(item.pwrLimit);
              setSliderOut(item.pwrOut);
              setSensorTags(item.tags);
              setModal(!modal);
              setData(item);
            }}
            className="btn"
            outline
            color="secondary"
            type="submit"
          >
            New Sensor
          </Button>
          <br />
          <br />
          <ReactTable
            columns={[
              {
                Header: "Spot Id",
                accessor: "spotId",
                show: false,
              },
              {
                Header: "Spot Name",
                accessor: "spotName",
              },
              {
                Header: "Zone Id",
                accessor: "zoneId",
                show: false,
              },
              {
                Header: "Zone Name",
                accessor: "zoneName",
              },
              {
                Header: "Sensor Id",
                accessor: "sensorId",
              },
              {
                Header: "Location",
                accessor: "location",
              },
              {
                Header: "Pwr IN",
                accessor: "pwrIn",
              },
              {
                Header: "Pwr LIMIT",
                accessor: "pwrLimit",
              },
              {
                Header: "Pwr Out",
                accessor: "pwrOut",
              },
              {
                Header: "AP Mac",
                accessor: "apMac",
              },
              {
                Header: "Serial Number",
                accessor: "serialNumber",
                show: false,
              },
              {
                Header: "Tags",
                accessor: "tags",
                show: false,
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
            data={dataSensor}
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

export default SensorTable;
