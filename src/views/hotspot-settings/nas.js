import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import nasService from "../../services/hotspot-settings/nas.service";

import nasTypes from "../../data/nas/nasType";

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

function NasTable() {
  const [data, setData] = useState([]);
  const [nasData, setNasData] = useState([]);

  const [alertMsg, setAlertMsg] = useState({
    color: "danger",
    text: "text-danger",
    icon: "fas fa-ban",
    msg: "Error occured while trying to request NAS. Network error!",
  });
  
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
    setVisible(false);
    getNasList();
  }, []);

  const getNasList = () => {
    nasService
      .getAll()
      .then((response) => {
        setNasData(response.data._embedded.nas);
      })
      .catch((error) => {
        setVisible(true);
      });
  };

  const getErrorMessage = (err) => {
    alertMsg.color = "danger";
    alertMsg.text = "text-danger";
    alertMsg.icon = "fas fa-ban";
    switch (err) {
      case 403:
        alertMsg.msg = "Something wrong happens with the NAS. Network problem!";
        break;
      case 500:
        alertMsg.msg = "NAS already exist!";
        break;
      default:
        alertMsg.msg =
          "Error occured while trying to request NAS. Network error!";
        break;
    }
    setAlertMsg(alertMsg);
  };

  const createItem = (data) => {
    nasService
      .create(data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "NAS saved successful!";
        setAlertMsg(alertMsg);
        getNasList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getNasList();
      });
  };

  const updateItem = (data) => {
    nasService
      .update(data.id, data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "NAS updated successful!";
        setAlertMsg(alertMsg);
        getNasList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getNasList();
      });
  };

  const deleteItem = (id) => {
    nasService
      .delete(id)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "NAS deleted successful!";
        setAlertMsg(alertMsg);
        getNasList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getNasList();
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = event.target.id.value;
    let name = event.target.nasName.value;
    let shortName = event.target.shortName.value;
    let type = event.target.nasType.value;
    let ports = event.target.ports.value;
    let secret = event.target.secret.value;
    let server = event.target.server.value;
    let community = event.target.community.value;
    let description = event.target.description.value;
    let item = {
      id: id,
      name: name,
      shortName: shortName,
      type: type,
      ports: ports,
      secret: secret,
      server: server,
      community: community,
      description: description,
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

  const dataNas = nasData.map((nas) => {
    return {
      id: nas.id,
      name: nas.name,
      shortName: nas.shortName,
      type: nas.type,
      ports: nas.ports,
      secret: nas.secret,
      server: nas.server,
      community: nas.community,
      description: nas.description,
      actions: (
        // we've added some custom button actions
        <div className="text-center">
          {/* use this button to add a edit kind of action */}
          <Button
            onClick={() => {
              let item = dataNas.find((o) => o.id === nas.id);
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
              let item = dataNas.find((o) => o.id === nas.id);
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
        <ModalHeader toggle={toggle.bind(null)}> Nas </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            <Row form>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="nasName">Name *</Label>
                  <Input
                    type="text"
                    name="nasName"
                    id="nasName"
                    required={true}
                    defaultValue={data.name}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="shortName">ShortName *</Label>
                  <Input
                    type="text"
                    name="shortName"
                    id="shortName"
                    required={true}
                    defaultValue={data.shortName}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="selectType">Type *</Label>
                  <Input
                    type="select"
                    name="nasType"
                    id="nasType"
                    required={true}
                    defaultValue={data.type}
                  >
                    <option value=""> -- Select Type -- </option>
                    {nasTypes.map((type, key) => {
                      return (
                        <option key={type.id} value={type.code}>
                          {type.name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="secret">Secret *</Label>
                  <Input
                    type="password"
                    name="secret"
                    id="secret"
                    required={true}
                    defaultValue={data.secret}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={12} md={4}>
                <FormGroup>
                  <Label for="ports">Ports</Label>
                  <Input
                    type="text"
                    name="ports"
                    id="ports"
                    defaultValue={data.ports}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={4}>
                <FormGroup>
                  <Label for="server">Server</Label>
                  <Input
                    type="text"
                    name="server"
                    id="server"
                    defaultValue={data.server}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={4}>
                <FormGroup>
                  <Label for="community">Community</Label>
                  <Input
                    type="text"
                    name="community"
                    id="community"
                    defaultValue={data.community}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={12} md={12}>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    defaultValue={data.description}
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
        <ModalHeader toggle={toggleDelete.bind(null)}> Nas </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmitDelete(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            <div>
              Do you want to delete this Nas? <b>{data.nasname}</b>
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
          <i className="mdi mdi-server-network display-7 mr-2"></i>List of Nas
        </CardTitle>
        <CardBody>
          <Button
            onClick={() => {
              let item = {
                id: "",
                name: "",
                shortName: "",
                type: "",
                ports: "",
                secret: "",
                server: "",
                community: "",
                description: "",
              };
              setModal(!modal);
              setData(item);
            }}
            className="btn"
            outline
            color="secondary"
            type="submit"
          >
            New Nas
          </Button>
          <br />
          <br />
          <ReactTable
            columns={[
              {
                Header: "Nas Name",
                accessor: "name",
              },
              {
                Header: "ShortName",
                accessor: "shortName",
              },
              {
                Header: "Type",
                accessor: "type",
              },
              {
                Header: "Secret",
                accessor: "secret",
                sortable: false,
              },
              {
                Header: "Ports",
                accessor: "ports",
                sortable: false,
              },
              {
                Header: "Server",
                accessor: "server",
              },
              {
                Header: "Community",
                accessor: "community",
                show: false,
              },
              {
                Header: "Description",
                accessor: "description",
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
            data={dataNas}
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

export default NasTable;
