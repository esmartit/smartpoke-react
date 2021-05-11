import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import treeTableHOC from "react-table/lib/hoc/treeTable";
import spotService from "../../services/configurations/spots.service";
import customerService from "../../services/hotspot-settings/customers.service";

import genderCodes from "../../data/gender/gender";

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
  CustomInput,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Alert,
  Col,
  Row,
} from "reactstrap";
import "react-tagsinput/react-tagsinput.css";
import "react-table/react-table.css";

const TreeTable = treeTableHOC(ReactTable);

function CustomerTable() {
  const [spotCode, setSpotCode] = useState("");
  const [spotData, setSpotData] = useState([]);

  const [data, setData] = useState([]);
  const [customerData, setCustomerData] = useState([]);

  const [alertMsg, setAlertMsg] = useState({
    color: "danger",
    text: "text-danger",
    icon: "fas fa-ban",
    msg: "Error occured while trying to request customers. Network error!",
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
    getSpotList();
    getCustomerList();
  }, []);

  const getSpotName = (code = null) => {
    let spotName = "";
    let spot = spotData.find((o) => o.id === code);
    if (spot) {
      spotName = spot.name;
    }
    return spotName;
  };

  const getSpotList = () => {
    spotService
      .getAll()
      .then((response) => {
        setSpotData(response.data);
      })
      .catch((error) => {
        setVisible(true);
      });
  };

  const getCustomerList = () => {
    customerService
      .getAll()
      .then((response) => {
        setCustomerData(response.data);
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
        alertMsg.msg =
          "Something wrong happens with the customer. Network problem!";
        break;
      case 500:
        alertMsg.msg = "Customer already exist!";
        break;
      default:
        alertMsg.msg =
          "Error occured while trying to request customers. Network error!";
        break;
    }
    setAlertMsg(alertMsg);
  };

  const createItem = (data) => {
    customerService
      .create(data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Customer saved successful!";
        setAlertMsg(alertMsg);
        getCustomerList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getCustomerList();
      });
  };

  const updateItem = (data) => {
    customerService
      .update(data.id, data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Customer updated successful!";
        setAlertMsg(alertMsg);
        getCustomerList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getCustomerList();
      });
  };

  const deleteItem = (id) => {
    customerService
      .delete(id)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Customer deleted successful!";
        setAlertMsg(alertMsg);
        getCustomerList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getCustomerList();
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = event.target.id.value;
    let username = event.target.userName.value;
    let firstName = event.target.firstName.value;
    let lastName = event.target.lastName.value;
    let mobilePhone = event.target.mobilePhone.value;
    let email = event.target.email.value;
    let birthDate = event.target.birthDate.value;
    let gender = event.target.genderCode.value;
    let zipCode = event.target.zipCode.value;
    let membership = event.target.memberShip.checked;
    let communication = event.target.communication.checked;
    let item = {
      id: id,
      username: username,
      firstName: firstName,
      lastName: lastName,
      mobilePhone: mobilePhone,
      email: email,
      birthDate: birthDate,
      gender: gender,
      zipCode: zipCode,
      membership: membership,
      communication: communication,
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

  const dataCustomer = customerData.map((customer) => {
    return {
      id: customer.id,
      spotId: customer.hotspot.spot,
      spotName: getSpotName(customer.hotspot.spot),
      hotSpotId: customer.hotspot.id,
      hotSpotName: customer.hotspot.name,
      username: customer.username,
      firstName: customer.firstName,
      lastName: customer.lastName,
      mobilePhone: customer.mobilePhone,
      email: customer.email,
      birthDate: customer.birthDate,
      age: new Date().getFullYear() - new Date(customer.birthDate).getFullYear(),
      gender: customer.gender,
      zipCode: customer.zipCode,
      membership: customer.membership ? "Checked" : "",
      communication: customer.communication ? "Checked" : "",
      actions: (
        // we've added some custom button actions
        <div className="text-center">
          {/* use this button to add a edit kind of action */}
          <Button
            onClick={() => {
              let item = dataCustomer.find((o) => o.id === customer.id);
              setModal(!modal);
              setSpotCode(item.spotId);
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
              let item = dataCustomer.find((o) => o.id === customer.id);
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
        <ModalHeader toggle={toggle.bind(null)}> Customer </ModalHeader>
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
                    // onChange={handleChangeSpot}
                    disabled={spotCode}
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
                  <Label for="selectHotSpot">HotSpot *</Label>
                  <Input
                    type="select"
                    name="hotSpotId"
                    id="hotSpotId"
                    required={true}
                    defaultValue={data.hotSpotId}
                    disabled={spotCode}
                  >
                    <option value=""> -- Select HotSpot -- </option>
                    {spotCode
                      ? spotData
                          .find(({ id }) => id === spotCode)
                          .hotspots.map((hotspot) => (
                            <option key={hotspot.id} value={hotspot.id}>
                              {hotspot.name}
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
                  <Label for="userName">Userame * </Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ti-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="userName"
                      id="userName"
                      required={true}
                      defaultValue={data.username}
                      disabled={spotCode}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="firstName">First Name *</Label>
                  <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    required={true}
                    defaultValue={data.firstName}
                    disabled={spotCode}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="lastName">Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    required={true}
                    defaultValue={data.lastName}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="mobilePhone">Mobile Phone *</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ti-mobile"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="mobilePhone"
                      id="mobilePhone"
                      required={true}
                      defaultValue={data.mobilePhone}
                      disabled={spotCode}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="email">Email *</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ti-email"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      required={true}
                      defaultValue={data.email}
                      disabled={spotCode}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="birthDate">Date of Birth</Label>
                  <Input
                    type="date"
                    name="birthDate"
                    id="birthDate"
                    required={true}
                    defaultValue={data.birthDate}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="selectGenderCode">Gender</Label>
                  <Input
                    type="select"
                    name="genderCode"
                    id="genderCode"
                    required={true}
                    defaultValue={data.gender}
                  >
                    <option value=""> -- Select Gender -- </option>
                    {genderCodes.map((genCodes) => {
                      return (
                        <option key={genCodes.id} value={genCodes.code}>
                          {genCodes.name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={12} md={4}>
                <FormGroup>
                  <Label for="zipCode">ZipCode</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ti-home"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="zipCode"
                      id="zipCode"
                      required={true}
                      defaultValue={data.zipCode}
                    />
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col sm={12} md={4}>
                <FormGroup>
                  <Label for="memberShip">Membership</Label>
                  <br />
                  <CustomInput
                    type="switch"
                    id="memberShip"
                    name="memberShip"
                    className="custom-switch"
                    defaultChecked={data.membership}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={4}>
                <FormGroup>
                  <Label for="communication">Communication</Label>
                  <br />
                  <CustomInput
                    type="switch"
                    id="communication"
                    name="communication"
                    className="custom-switch"
                    defaultChecked={data.communication}
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
        <ModalHeader toggle={toggleDelete.bind(null)}> Customer </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmitDelete(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            <div>
              Do you want to delete this customer?{" "}
              <b>
                {data.username} - {data.firstName}
              </b>
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
          <i className="mdi mdi-account-multiple display-7 mr-2"></i>List of
          Customers
        </CardTitle>
        <CardBody>
          <TreeTable
            columns={[
              {
                Header: "Username",
                accessor: "username",
              },
              {
                Header: "First Name",
                accessor: "firstName",
              },
              {
                Header: "Lasst Name",
                accessor: "lastName",
              },
              {
                Header: "Mobile",
                accessor: "mobilePhone",
              },
              {
                Header: "Email",
                accessor: "email",
              },
              {
                Header: "Birth Date",
                accessor: "birthDate",
              },
              {
                Header: "Age",
                accessor: "age",
              },
              {
                Header: "Gender",
                accessor: "gender",
              },
              {
                Header: "ZipCode",
                accessor: "zipCode",
              },
              // {
              //   Header: "Spot Id",
              //   accessor: "spotId",
              //   show: false,
              // },
              {
                Header: "Spot Name",
                accessor: "spotName",
                show: false,
              },
              // {
              //   Header: "HotSpot Id",
              //   accessor: "hotSpotName",
              //   show: false,
              // },
              {
                Header: "HotSpot Name",
                accessor: "hotSpotName",
                show: false,
              },
              {
                Header: "Membership",
                accessor: "membership",
                show: false,
              },
              {
                Header: "Communication",
                accessor: "communication",
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
            SubComponent={(row) => {
              // a SubComponent just for the final detail
              const columns = [
                {
                  Header: "Property",
                  accessor: "property",
                  width: 200,
                  Cell: (ci) => {
                    return `${ci.value}:`;
                  },
                  style: {
                    backgroundColor: "#DDD",
                    textAlign: "right",
                    fontWeight: "bold",
                  },
                },
                { Header: "Value", accessor: "value" },
              ];
              const rowData = Object.keys(row.original).map((key) => {
                return {
                  property: key,
                  value: row.original[key].toString(),
                };
              });
              return (
                <div style={{ padding: "10px" }}>
                  <ReactTable
                    data={rowData}
                    columns={columns}
                    pageSize={rowData.length}
                    showPagination={false}
                  />
                </div>
              );
            }}
            showPaginationBottom={true}
            className="-striped -highlight"
            data={dataCustomer}
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

export default CustomerTable;
