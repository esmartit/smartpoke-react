import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import limitationService from "../../services/hotspot-settings/limitations.service";

import bandwidthCodes from "../../data/limitations/bandwitdh";
import trafficCodes from "../../data/limitations/traffic";
import periodCodes from "../../data/limitations/period";
import sessionCodes from "../../data/limitations/session";

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

function LimitationTable() {
  const [data, setData] = useState([]);
  const [limitationData, setLimitationData] = useState([]);

  const [noTraffic, setNoTraffic] = useState(true);
  const [noPeriod, setNoPeriod] = useState(true);
  const [noSession, setNoSession] = useState(true);

  const [alertMsg, setAlertMsg] = useState({
    color: "danger",
    text: "text-danger",
    icon: "fas fa-ban",
    msg: "Error occured while trying to request limitations. Network error!",
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
      getLimitationList();
    }
  }, [loading]);

  const getLimitationList = () => {
    limitationService
      .getAll()
      .then((response) => {
        setLimitationData(response.data._embedded.limitationEntities);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(true);
        setVisible(true);
      });
  };

  const handleChangeTraffic = (event) => {
    let traffic = event.target.value;
    if (traffic !== "") setNoTraffic(false);
  };

  const handleChangePeriod = (event) => {
    let period = event.target.value;
    if (period !== "") setNoPeriod(false);
  };

  const handleChangeSession = (event) => {
    let session = event.target.value;
    if (session !== "") setNoSession(false);
  };

  const getErrorMessage = (err) => {
    alertMsg.color = "danger";
    alertMsg.text = "text-danger";
    alertMsg.icon = "fas fa-ban";
    switch (err) {
      case 403:
        alertMsg.msg =
          "Something wrong happens with the limitation. Network problem!";
        break;
      case 500:
        alertMsg.msg = "Limitation already exist!";
        break;
      default:
        alertMsg.msg =
          "Error occured while trying to request limitation. Network error!";
        break;
    }
    setAlertMsg(alertMsg);
  };

  const createItem = (data) => {
    limitationService
      .create(data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Limitation saved successful!";
        setAlertMsg(alertMsg);
        getLimitationList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getLimitationList();
      });
  };

  const updateItem = (data) => {
    limitationService
      .update(data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Limitation updated successful!";
        setAlertMsg(alertMsg);
        getLimitationList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getLimitationList();
      });
  };

  const deleteItem = (name) => {
    limitationService
      .delete(name)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Limitation deleted successful!";
        setAlertMsg(alertMsg);
        getLimitationList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getLimitationList();
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = event.target.id.value;
    let name = event.target.name.value;
    let maxUpload = event.target.maxUpload.value;
    let upload = event.target.upload.value;
    let maxDownload = event.target.maxDownload.value;
    let download = event.target.download.value;
    let maxTraffic = event.target.maxTraffic.value;
    let traffic = event.target.traffic.value;
    let urlRedirect = event.target.urlRedirect.value;
    let accessPeriod = event.target.accessPeriod.value;
    let period = event.target.period.value;
    let dailySession = event.target.dailySession.value;
    let session = event.target.session.value;
    let item = {
      name: name,
      maxUpload: { value: maxUpload, rate: upload },
      maxDownload: { value: maxDownload, rate: download },
      maxTraffic: { value: maxTraffic, traffic: traffic },
      urlRedirect: urlRedirect,
      accessPeriod: { value: accessPeriod, period: period },
      dailySession: { value: dailySession, period: session },
    };
    if (!maxTraffic) delete item.maxTraffic;
    if (!urlRedirect) delete item.urlRedirect;
    if (!accessPeriod) delete item.accessPeriod;
    if (!dailySession) delete item.dailySession;
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
    let name = event.target.name.value;
    deleteItem(name);
    setVisible(true);
    setModalDelete(!modalDelete);
  };

  const dataLimitation = limitationData.map((limitation) => {
    return {
      name: limitation.name,
      maxUpload: limitation.maxUpload.value,
      upload: limitation.maxUpload.rate,
      maxUploadCol: limitation.maxUpload.value + " " + limitation.maxUpload.rate,
      maxDownload: limitation.maxDownload.value,
      download: limitation.maxDownload.rate,
      maxDownloadCol: limitation.maxDownload.value + " " + limitation.maxDownload.rate,
      
      maxTraffic: limitation.maxTraffic ? limitation.maxTraffic.value : "",
      traffic: limitation.maxTraffic ? limitation.maxTraffic.traffic : "",
      maxTrafficCol: limitation.maxTraffic
        ? limitation.maxTraffic.value + " " + limitation.maxTraffic.traffic
        : "",
      urlRedirect: limitation.urlRedirect,
      accessPeriod: limitation.accessPeriod
        ? limitation.accessPeriod.value
        : "",
      period: limitation.accessPeriod ? limitation.accessPeriod.period : "",
      accessPeriodCol: limitation.accessPeriod
        ? limitation.accessPeriod.value + " " + limitation.accessPeriod.period
        : "",
      dailySession: limitation.dailySession
        ? limitation.dailySession.value
        : "",
      session: limitation.dailySession ? limitation.dailySession.period : "",
      dailySessionCol: limitation.dailySession
        ? limitation.dailySession.value + " " + limitation.dailySession.period
        : "",
      actions: (
        // we've added some custom button actions
        <div className="text-center">
          {/* use this button to add a edit kind of action */}
          <Button
            onClick={() => {
              let item = dataLimitation.find((o) => o.name === limitation.name);
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
              let item = dataLimitation.find((o) => o.name === limitation.name);
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
        <ModalHeader toggle={toggle.bind(null)}> Limitation </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.name} />
            <FormGroup>
              <Row>
                <Label sm={4} for="name">Name *</Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    required={true}
                    defaultValue={data.name}
                  />
                </Col>                
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label sm={4} for="maxUpload">
                  Max. Upload *
                </Label>
                <Col sm={3}>
                  <Input
                    type="text"
                    name="maxUpload"
                    id="maxUpload"
                    required={true}
                    defaultValue={data.maxUpload}
                  />
                </Col>
                <Col sm={5}>
                  <Input
                    type="select"
                    name="upload"
                    id="upload"
                    required={true}
                    defaultValue={data.upload}
                  >
                    <option value=""> -- Select Upload -- </option>
                    {bandwidthCodes.map((upload, key) => {
                      return (
                        <option key={upload.id} value={upload.code}>
                          {upload.name}
                        </option>
                      );
                    })}
                  </Input>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label sm={4} for="maxDowmload">
                  Max. Download *
                </Label>
                <Col sm={3}>
                  <Input
                    type="text"
                    name="maxDownload"
                    id="maxDownload"
                    required={true}
                    defaultValue={data.maxDownload}
                  />
                </Col>
                <Col sm={5}>
                  <Input
                    type="select"
                    name="download"
                    id="download"
                    required={true}
                    defaultValue={data.download}
                  >
                    <option value=""> -- Select Download -- </option>
                    {bandwidthCodes.map((download, key) => {
                      return (
                        <option key={download.id} value={download.code}>
                          {download.name}
                        </option>
                      );
                    })}
                  </Input>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label sm={4} for="maxTraffic">
                  Max. Traffic
                </Label>
                <Col sm={3}>
                  <Input
                    type="text"
                    name="maxTraffic"
                    id="maxTraffic"
                    onChange={handleChangeTraffic}
                    defaultValue={data.maxTraffic}
                  />
                </Col>
                <Col sm={5}>
                  <Input
                    type="select"
                    name="traffic"
                    id="traffic"
                    required={!noTraffic}
                    defaultValue={data.traffic}
                  >
                    <option value=""> -- Select Traffic -- </option>
                    {trafficCodes.map((traffic, key) => {
                      return (
                        <option key={traffic.id} value={traffic.code}>
                          {traffic.name}
                        </option>
                      );
                    })}
                  </Input>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label sm={4} for="urlRedirect">URL Redirect</Label>
                <Col sm={8}>
                  <Input
                    type="url"
                    name="urlRedirect"
                    id="urlRedirect"
                    defaultValue={data.urlRedirect}
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label sm={4} for="accessPeriod">
                  Access Period
                </Label>
                <Col sm={3}>
                  <Input
                    type="text"
                    name="accessPeriod"
                    id="accessPeriod"
                    onChange={handleChangePeriod}
                    defaultValue={data.accessPeriod}
                  />
                </Col>
                <Col sm={5}>
                  <Input
                    type="select"
                    name="period"
                    id="period"
                    required={!noPeriod}
                    defaultValue={data.period}
                  >
                    <option value=""> -- Select Period -- </option>
                    {periodCodes.map((period, key) => {
                      return (
                        <option key={period.id} value={period.code}>
                          {period.name}
                        </option>
                      );
                    })}
                  </Input>
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row>
                <Label sm={4} for="dailySession">
                  Daily Session
                </Label>
                <Col sm={3}>
                  <Input
                    type="text"
                    name="dailySession"
                    id="dailySession"
                    onChange={handleChangeSession}
                    defaultValue={data.dailySession}
                  />
                </Col>
                <Col sm={5}>
                  <Input
                    type="select"
                    name="session"
                    id="session"
                    required={!noSession}
                    defaultValue={data.session}
                  >
                    <option value=""> -- Select Session -- </option>
                    {sessionCodes.map((session, key) => {
                      return (
                        <option key={session.id} value={session.code}>
                          {session.name}
                        </option>
                      );
                    })}
                  </Input>
                </Col>
              </Row>
            </FormGroup>
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
        <ModalHeader toggle={toggleDelete.bind(null)}> Limitation </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmitDelete(event)}>
            <Input type="hidden" name="name" id="name" defaultValue={data.name} />
            <div>
              Do you want to delete this limitation? <b>{data.name}</b>
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
          <i className="mdi mdi-transit-transfer display-7 mr-2"></i>List of
          Limitations
        </CardTitle>
        <CardBody>
          <Button
            onClick={() => {
              let item = {
                id: "",
                name: "",
                maxUpload: "",
                upload: "MB",
                maxDownload: "",
                download: "MB",
                maxTraffic: "",
                traffic: "",
                urlRedirect: "",
                accessPeriod: "",
                period: "",
                dailySession: "",
                session: "",
              };
              setModal(!modal);
              setData(item);
            }}
            className="btn"
            outline
            color="secondary"
            type="submit"
          >
            New Limitation
          </Button>
          <br />
          <br />
          <ReactTable
            columns={[
              {
                Header: "Name",
                accessor: "name",
              },
              {
                Header: "Max. Upload",
                accessor: "maxUploadCol",
              },
              {
                Header: "Max. Download",
                accessor: "maxDownloadCol",
              },
              {
                Header: "Max. Traffic",
                accessor: "maxTrafficCol",
              },
              {
                Header: "URL Redirect",
                accessor: "urlRedirect",
                sortable: false,
              },
              {
                Header: "Access Period",
                accessor: "accessPeriodCol",
              },
              {
                Header: "Daily Session",
                accessor: "dailySessionCol",
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
            data={dataLimitation}
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

export default LimitationTable;
