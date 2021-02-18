import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import countryService from "../../../services/maintenances/countries.service";
import cityService from "../../../services/maintenances/cities.service";

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

function CityTable() {
  const [countryCode, setCountryCode] = useState("");
  const [countryData, setCountryData] = useState([]);

  const [data, setData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [noZipCode, setNoZipCode] = useState(false);
  const [noSpot, setNoSpot] = useState(false);

  const [alertMsg, setAlertMsg] = useState({
    color: "danger",
    text: "text-danger",
    icon: "fas fa-ban",
    msg: "Error occured while trying to request cities. Network error!",
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
    getCountryList();
    getCityList();
  }, []);

  const handleChangeCountry = (event) => {
    setCountryCode(event.target.value);
  };

  const getCountryName = (code = null) => {
    let countryName = "";
    let country = countryData.find((o) => o.id === code);
    if (country) {
      countryName = country.name;
    }
    return countryName;
  };

  const getCountryList = () => {
    countryService
      .getAll()
      .then((response) => {
        setCountryData(response.data);
      })
      .catch((error) => {
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
          "Something wrong happens with the city. Network problem!";
        break;
      case 500:
        alertMsg.msg = "City already exist!";
        break;
      default:
        alertMsg.msg =
          "Error occured while trying to request cities. Network error!";
        break;
    }
    setAlertMsg(alertMsg);
  };

  const createItem = (data) => {
    cityService
      .create(data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "City saved successful!";
        setAlertMsg(alertMsg);
        getCityList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getCityList();
      });
  };

  const updateItem = (data) => {
    cityService
      .update(data.id, data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "City updated successful!";
        setAlertMsg(alertMsg);
        getCityList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getCityList();
      });
  };

  const deleteItem = (id) => {
    cityService
      .delete(id)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "City deleted successful!";
        setAlertMsg(alertMsg);
        getCityList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getCityList();
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = event.target.id.value;
    let stateId = event.target.stateId.value;
    let cityCode = event.target.cityCode.value;
    let name = event.target.name.value;
    let item = {
      id: id,
      state: stateId,
      cityCode: cityCode,
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

  const dataCity = cityData.map((city) => {
    return {
      id: city.id,
      countryId: city.state.country,
      countryName: getCountryName(city.state.country),
      stateId: city.state.id,
      stateName: city.state.name,
      cityCode: city.cityCode,
      name: city.name,
      zipcodes: city.zipcodes,
      spots: city.spots,
      actions: (
        // we've added some custom button actions
        <div className="text-center">
          {/* use this button to add a edit kind of action */}
          <Button
            onClick={() => {
              let item = dataCity.find((o) => o.id === city.id);
              setModal(!modal);
              setCountryCode(item.countryId);
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
              let item = dataCity.find((o) => o.id === city.id);
              setModalDelete(!modalDelete);
              setNoZipCode(false);
              setNoSpot(false);
              if (item.zipcodes.length > 0 || item.spots.length > 0) {
                setNoSpot(true);
                setNoZipCode(true);
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
        <ModalHeader toggle={toggle.bind(null)}> City </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
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
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="cityCode">City Code *</Label>
                  <Input
                    type="text"
                    name="cityCode"
                    id="cityCode"
                    required={true}
                    defaultValue={data.cityCode}
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
        <ModalHeader toggle={toggleDelete.bind(null)}> City </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmitDelete(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            {!noSpot || !noZipCode ? (
              <div>
                Do you want to delete this city? <b>{data.name}</b>
              </div>
            ) : (
              <div>
                You can not delete this city. <b>{data.name}</b> has zipcodes and/or
                spots associated.
              </div>
            )}
            <br />
            <FormGroup>
              <Button
                color="success"
                type="submit"
                disabled={noSpot || noZipCode}
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
          <i className="mdi mdi-map display-7 mr-2"></i>List of Cities
        </CardTitle>
        <CardBody>
          <Button
            onClick={() => {
              let item = {
                id: "",
                state: "",
                cityCode: "",
                name: "",
              };
              setModal(!modal);
              setCountryCode("");
              setData(item);
            }}
            className="btn"
            outline
            color="secondary"
            type="submit"
          >
            New City
          </Button>
          <br />
          <br />
          <ReactTable
            columns={[
              {
                Header: "Country Code",
                accessor: "countryId",
                show: false,
              },
              {
                Header: "Country Name",
                accessor: "countryName",
              },
              {
                Header: "State Code",
                accessor: "stateId",
                show: false,
              },
              {
                Header: "State Name",
                accessor: "stateName",
              },
              {
                Header: "City Code",
                accessor: "cityCode",
              },
              {
                Header: "City Name",
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
            data={dataCity}
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

export default CityTable;
