import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import countryService from "../../../services/maintenances/countries.service";
import stateService from "../../../services/maintenances/states.service";
import zipcodeService from "../../../services/maintenances/zipcodes.service";

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

function ZipCodeTable() {
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);

  const [data, setData] = useState([]);
  const [zipcodeData, setZipCodeData] = useState([]);
  const [noSpot, setNoSpot] = useState(false);

  const [alertMsg, setAlertMsg] = useState({
    color: "danger",
    text: "text-danger",
    icon: "fas fa-ban",
    msg: "Error occured while trying to request zipcodes. Network error!",
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
      getCountryList();
      getStateList();
      getZipCodeList();
    }
  }, [loading]);

  const handleChangeCountry = (event) => {
    setCountryCode(event.target.value);
  };

  const handleChangeState = (event) => {
    setStateCode(event.target.value);
  };

  const getCountryInfo = (code = null, opt = null) => {
    let data = "";
    let country = stateData.find((o) => o.id === code);
    if (country) {
      data = country.country.id;
      if (opt !== "id") {
        data = country.country.name;
      }
    }
    return data;
  };

  const getStateName = (code = null) => {
    let stateName = "";
    let state = stateData.find((o) => o.id === code);
    if (state) {
      stateName = state.name;
    }
    return stateName;
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

  const getZipCodeList = () => {
    zipcodeService
      .getAll()
      .then((response) => {
        setZipCodeData(response.data);
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
          "Something wrong happens with the zipcode. Network problem!";
        break;
      case 500:
        alertMsg.msg = "Zipcode already exist!";
        break;
      default:
        alertMsg.msg =
          "Error occured while trying to request zipcodes. Network error!";
        break;
    }
    setAlertMsg(alertMsg);
  };

  const createItem = (data) => {
    zipcodeService
      .create(data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "ZipCode saved successful!";
        setAlertMsg(alertMsg);
        getZipCodeList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getZipCodeList();
      });
  };

  const updateItem = (data) => {
    zipcodeService
      .update(data.id, data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "ZipCode updated successful!";
        setAlertMsg(alertMsg);
        getZipCodeList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getZipCodeList();
      });
  };

  const deleteItem = (id) => {
    zipcodeService
      .delete(id)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "ZipCode deleted successful!";
        setAlertMsg(alertMsg);
        getZipCodeList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getZipCodeList();
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = event.target.id.value;
    let cityId = event.target.cityId.value;
    let zipCode = event.target.zipCode.value;
    let location = event.target.location.value;
    let item = {
      id: id,
      city: cityId,
      zipCode: zipCode,
      location: location,
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

  const dataZipCode = zipcodeData.map((zipcode) => {
    return {
      id: zipcode.id,
      countryId: getCountryInfo(zipcode.city.state, "id"),
      countryName: getCountryInfo(zipcode.city.state, "name"),
      stateId: zipcode.city.state,
      stateName: getStateName(zipcode.city.state),
      cityId: zipcode.city.id,
      cityName: zipcode.city.name,
      zipCode: zipcode.zipCode,
      location: zipcode.location,
      spots: zipcode.spots,
      actions: (
        // we've added some custom button actions
        <div className="text-center">
          {/* use this button to add a edit kind of action */}
          <Button
            onClick={() => {
              let item = dataZipCode.find((o) => o.id === zipcode.id);
              setModal(!modal);
              setCountryCode(item.countryId);
              setStateCode(item.stateId);
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
              let item = dataZipCode.find((o) => o.id === zipcode.id);
              setModalDelete(!modalDelete);
              setNoSpot(false);
              if (item.spots.length > 0) {
                setNoSpot(true);
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
        <ModalHeader toggle={toggle.bind(null)}> ZipCode </ModalHeader>
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
                  <Label for="zipCode">Zip Code *</Label>
                  <Input
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    required={true}
                    defaultValue={data.zipCode}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12}>
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
        <ModalHeader toggle={toggleDelete.bind(null)}> ZipCode </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmitDelete(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            {!noSpot ? (
              <div>
                Do you want to delete this zipcode? <b>{data.zipCode} - {data.location}</b>
              </div>
            ) : (
              <div>
                You can not delete this zipcode. <b>{data.zipCode} - {data.location}</b> has spots
                associated.
              </div>
            )}
            <br />
            <FormGroup>
              <Button color="success" type="submit" disabled={noSpot}>
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
          <i className="mdi mdi-map display-7 mr-2"></i>List of ZipCodes
        </CardTitle>
        <CardBody>
          <Button
            onClick={() => {
              let item = {
                id: "",
                cityId: "",
                zipCode: "",
                location: "",
              };
              setModal(!modal);
              setCountryCode("");
              setStateCode("");
              setData(item);
            }}
            className="btn"
            outline
            color="secondary"
            type="submit"
          >
            New ZipCode
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
                accessor: "cityId",
                show: false,
              },
              {
                Header: "City Name",
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
            data={dataZipCode}
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

export default ZipCodeTable;
