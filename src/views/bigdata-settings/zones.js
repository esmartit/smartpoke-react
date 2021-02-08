import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import spotService from "../../services/configurations/spots.service";
import zoneService from "../../services/bigdata-settings/zones.service";

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

function ZoneTable() {
  const [spotData, setSpotData] = useState([]);

  const [data, setData] = useState([]);
  const [zoneData, setZoneData] = useState([]);
  const [noSensor, setNoSensor] = useState(false);

  const [alertMsg, setAlertMsg] = useState({
    color: "danger",
    text: "text-danger",
    icon: "fas fa-ban",
    msg: "Error occured while trying to request zones. Network error!",
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
      getZoneList();
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

  const getZoneList = () => {
    zoneService
      .getAll()
      .then((response) => {
        setZoneData(response.data);
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
          "Something wrong happens with the zone. Network problem!";
        break;
      case 500:
        alertMsg.msg = "Zone already exist!";
        break;
      default:
        alertMsg.msg =
          "Error occured while trying to request zones. Network error!";
        break;
    }
    setAlertMsg(alertMsg);
  };

  const createItem = (data) => {
    zoneService
      .create(data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Zone saved successful!";
        setAlertMsg(alertMsg);
        getZoneList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getZoneList();
      });
  };

  const updateItem = (data) => {
    zoneService
      .update(data.id, data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Zone updated successful!";
        setAlertMsg(alertMsg);
        getZoneList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getZoneList();
      });
  };

  const deleteItem = (id) => {
    zoneService
      .delete(id)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Zone deleted successful!";
        setAlertMsg(alertMsg);
        getZoneList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getZoneList();
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = event.target.id.value;
    let spotId = event.target.spotId.value;
    let name = event.target.name.value;
    let item = {
      id: id,
      spot: spotId,
      name: name,
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

  const dataZone = zoneData.map((zone) => {
    return {
      id: zone.id,
      spotId: zone.spot.id,
      spotName: zone.spot.name,
      name: zone.name,
      sensors: zone.sensors,
      actions: (
        // we've added some custom button actions
        <div className="text-center">
          {/* use this button to add a edit kind of action */}
          <Button
            onClick={() => {
              let item = dataZone.find((o) => o.id === zone.id);
              setModal(!modal);
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
              let item = dataZone.find((o) => o.id === zone.id);
              setModalDelete(!modalDelete);
              setNoSensor(false);
              if (item.sensors.length > 0) {
                setNoSensor(true);
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
        <ModalHeader toggle={toggle.bind(null)}> Zone </ModalHeader>
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
                  <Label for="name">Name *</Label>
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
        <ModalHeader toggle={toggleDelete.bind(null)}> Zone </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmitDelete(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            {!noSensor ? (
              <div>
                Do you want to delete this zone? <b>{data.name}</b>
              </div>
            ) : (
              <div>
                You can not delete this zone. <b>{data.name}</b> has sensors
                associated.
              </div>
            )}
            <br />
            <FormGroup>
              <Button color="success" type="submit" disabled={noSensor}>
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
          <i className="mdi mdi-radar display-7 mr-2"></i>List of Zones
        </CardTitle>
        <CardBody>
          <Button
            onClick={() => {
              let item = {
                id: "",
                spot: "",
                name: "",
              };          
              setModal(!modal);
              setData(item);
            }}
            className="btn"
            outline
            color="secondary"
            type="submit"
          >
            New Zone
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
                Header: "Zone Name",
                accessor: "name",
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
            data={dataZone}
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

export default ZoneTable;
