import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import deviceService from "../../services/bigdata-settings/devices.service";

import typeCodes from "../../data/devices/typesData";

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

function DeviceTable() {
  const [data, setData] = useState([]);
  const [deviceData, setDeviceData] = useState([]);

  const [alertMsg, setAlertMsg] = useState({
    color: "danger",
    text: "text-danger",
    icon: "fas fa-ban",
    msg: "Error occured while trying to request devices. Network error!",
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
      getDeviceList();
    }
  }, [loading]);

  const getDeviceList = () => {
    deviceService
      .getAll()
      .then((response) => {
        setDeviceData(response.data);
        setLoading(false);
      })
      .catch((err) => {
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
          "Something wrong happens with the device. Network problem!";
        break;
      case 500:
        alertMsg.msg = "Device already exist!";
        break;
      default:
        alertMsg.msg =
          "Error occured while trying to request devices. Network error!";
        break;
    }
    setAlertMsg(alertMsg);
  };

  const createItem = (data) => {
    deviceService
      .create(data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Device saved successful!";
        setAlertMsg(alertMsg);
        getDeviceList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getDeviceList();
      });
  };

  const updateItem = (data) => {
    deviceService
      .update(data.id, data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Device updated successful!";
        setAlertMsg(alertMsg);
        getDeviceList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getDeviceList();
      });
  };

  const deleteItem = (id) => {
    deviceService
      .delete(id)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Device deleted successful!";
        setAlertMsg(alertMsg);
        getDeviceList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getDeviceList();
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = event.target.id.value;
    let deviceType = event.target.deviceType.value;
    let deviceMac = event.target.deviceMac.value;
    let item = {
      id: id,
      type: deviceType,
      device: deviceMac,
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

  const dataDevice = deviceData.map((device) => {
    return {
      id: device.id,
      type: device.type,
      device: device.device,
      actions: (
        // we've added some custom button actions
        <div className="text-center">
          {/* use this button to add a edit kind of action */}
          <Button
            onClick={() => {
              let item = dataDevice.find((o) => o.id === device.id);
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
              let item = dataDevice.find((o) => o.id === device.id);
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
        <ModalHeader toggle={toggle.bind(null)}> Value </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            <Row form>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="selectType">Type *</Label>
                  <Input
                    type="select"
                    name="deviceType"
                    id="deviceType"
                    required={true}
                    defaultValue={data.type}
                  >
                    <option value=""> -- Select Type -- </option>
                    {typeCodes.map((typeCode) => {
                      return (
                        <option key={typeCode.id} value={typeCode.name}>
                          {typeCode.name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="value">Device MAC</Label>
                  <Input
                    type="text"
                    name="deviceMac"
                    id="deviceMac"
                    defaultValue={data.device}
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
        <ModalHeader toggle={toggleDelete.bind(null)}> Device </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmitDelete(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            <div>
              Do you want to delete this device? <b>{data.name}</b>
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
          <i className="mdi mdi-responsive display-7 mr-2"></i>List of Devices
        </CardTitle>
        <CardBody>
          <Button
            onClick={() => {
              let item = {
                id: "",
                type: "",
                device: "",
              };          
              setModal(!modal);
              setData(item);
            }}
            className="btn"
            outline
            color="secondary"
            type="submit"
          >
            New Device
          </Button>
          <br />
          <br />
          <ReactTable
            columns={[
              {
                Header: "Device MAC",
                accessor: "device",
              },
              {
                Header: "Type",
                accessor: "type",
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
            data={dataDevice}
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

export default DeviceTable;
