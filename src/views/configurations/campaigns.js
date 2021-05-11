import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import campaignService from "../../services/configurations/campaigns.service";

import typeCodes from "../../data/campaigns/typeCampaign";

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
  Alert,
  Col,
  Row,
} from "reactstrap";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-table/react-table.css";

function TableCampaign() {
  const [data, setData] = useState([]);
  const [campaignData, setCampaignData] = useState([]);
  const [smsEmailTxt, setSmsEmailTxt] = useState(true);
  const [deferredOpt, setDeferredOpt] = useState(false);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [contentMsg, setContentMsg] = useState('');
  const [noSentMsg, setNoSentMsg] = useState(false);

//   const uploadImageCallBack = (file) => {
//     return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.open("POST", "https://api.imgur.com/3/image");
//       xhr.setRequestHeader("Authorization", "Client-ID XXXXX");
//       const data = new FormData();
//       data.append("image", file);
//       xhr.send(data);
//       xhr.addEventListener("load", () => {
//         const response = JSON.parse(xhr.responseText);
//         resolve(response);
//       });
//       xhr.addEventListener("error", () => {
//         const error = JSON.parse(xhr.responseText);
//         reject(error);
//       });
//     });
//   };

  const [alertMsg, setAlertMsg] = useState({
    color: "danger",
    text: "text-danger",
    icon: "fas fa-ban",
    msg: "Error occured while trying to request campaigns. Network error!",
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
    getCampaignList();
  }, []);

  const handleChangeSmsEmail = (event) => {
    setSmsEmailTxt(event.target.checked ? "SMS" : "Email");
  };

  const handleChangeDeferred = (event) => {
    setDeferredOpt(event.target.checked ? true : false);
  };

  const saveContent = (content) => {
    setContentMsg(JSON.stringify(('content state', convertToRaw(content))));
  }

  const onEditorStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    setEditorState(editorState);
    // console.log('content state', convertToRaw(contentState));
    saveContent(contentState);
};

  const getCampaignList = () => {
    campaignService
      .getAll()
      .then((response) => {
        setCampaignData(response.data);
      })
      .catch((error) => {
        setVisible(true);
      });
  };

  const getTypeName = (code = null) => {
    let typeName = "";
    let type = typeCodes.find((o) => o.code === code);
    if (type) {
      typeName = type.name;
    }
    return typeName;
  };

  const getErrorMessage = (err) => {
    alertMsg.color = "danger";
    alertMsg.text = "text-danger";
    alertMsg.icon = "fas fa-ban";
    switch (err) {
      case 403:
        alertMsg.msg =
          "Something wrong happens with the camapign. Network problem!";
        break;
      case 500:
        alertMsg.msg = "Campaign already exist!";
        break;
      default:
        alertMsg.msg =
          "Error occured while trying to request campaigns. Network error!";
        break;
    }
    setAlertMsg(alertMsg);
  };

  const createItem = (data) => {
    campaignService
      .create(data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Campaign saved successful!";
        setAlertMsg(alertMsg);
        getCampaignList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getCampaignList();
      });
  };

  const updateItem = (data) => {
    campaignService
      .update(data.id, data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Campaign updated successful!";
        setAlertMsg(alertMsg);
        getCampaignList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getCampaignList();
      });
  };

  const deleteItem = (id) => {
    campaignService
      .delete(id)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Campaign deleted successful!";
        setAlertMsg(alertMsg);
        getCampaignList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getCampaignList();
      });
  };

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = event.target.id.value;
    let name = event.target.name.value;
    let validDate = event.target.validDate.value;
    let smsEmail = event.target.smsEmail.checked;
    let message = contentMsg;
    let deferred = event.target.deferred.checked;
    let deferredDate = "1900-01-01T12:00:00.000Z";
    if (deferred) { 
        deferredDate = new Date(event.target.deferredDate.value+' '+event.target.deferredTime.value);
    }
    let percent = 0;
    let valueIn = 0;
    let type = event.target.typeCode.value;
    let item = {
      id: id,
      name: name,
      validDate: validDate,
      smsEmail: smsEmail,
      message: message,
      deferred: deferred,
      deferredDate: deferredDate,
      percent: percent,
      valueIn: valueIn,
      type: type,
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

  const dataCampaign = campaignData.map((campaign) => {
    return {
      id: campaign.id,
      name: campaign.name,
      validDate: campaign.validDate,
      smsEmail: campaign.smsEmail ? "Checked" : "",
      switchSmsEmail: (
        <div className="text-center">
          {campaign.smsEmail ? "SMS " : "Email "}
          {campaign.smsEmail ? (
            <i className="fas fa-comment"></i>
          ) : (
            <i className="fas fa-envelope"></i>
          )}
        </div>
      ),
      message: campaign.message,
      deferred: campaign.deferred ? "Checked" : "",
      switchDeferred: (
        <div className="text-center">
          <CustomInput
            type="switch"
            id="deferredSwitch"
            name="deferredSwitch"
            checked={campaign.deferred}
            disabled
          />
        </div>
      ),
      defDate: campaign.deferred ? (new Date(campaign.deferredDate)).toLocaleString() : "",
      deferredDate: campaign.deferred ? campaign.deferredDate : "",
      percent: campaign.percent,
      type: campaign.type,
      typeName: getTypeName(campaign.type),
      actions: (
        // we've added some custom button actions
        <div className="text-center">
          {/* use this button to add a edit kind of action */}
          <Button
            onClick={() => {
              let item = dataCampaign.find((o) => o.id === campaign.id);
              setSmsEmailTxt(item.smsEmail ? "SMS" : "Email");
              let rawContent = convertFromRaw(JSON.parse(item.message));
              setEditorState(EditorState.createWithContent(rawContent));
              setDeferredOpt(item.deferred);
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
              let item = dataCampaign.find((o) => o.id === campaign.id);
              setModalDelete(!modalDelete);
              setNoSentMsg(false);
            //   if (item.messages.length > 0) {
            //     setNoSentMsg(true);
            //   }
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
        <ModalHeader toggle={toggle.bind(null)}> Campaign - <span>{smsEmailTxt}</span></ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
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
                  <Label for="validDate">Valid Date *</Label>
                  <Input
                    type="date"
                    name="validDate"
                    id="validDate"
                    required={true}
                    defaultValue={data.validDate}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={12} md={4}>
                <FormGroup align="center">
                  <Label for="smsEmail">SMS/Email *</Label>
                  <CustomInput
                    type="switch"
                    id="smsEmail"
                    name="smsEmail"
                    className="custom-switch"
                    defaultChecked={data.smsEmail}
                    onChange={handleChangeSmsEmail}
                  ><span>{smsEmailTxt}</span></CustomInput>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="selectTypeCode">Type *</Label>
                  <Input
                    type="select"
                    name="typeCode"
                    id="typeCode"
                    required={true}
                    defaultValue={data.type}
                  >
                    <option value=""> -- Select Type -- </option>
                    {typeCodes.map((type) => {
                      return (
                        <option key={type.id} value={type.code}>
                          {type.name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row form></Row>
            <Row form>
              <Col sm={12} md={4}>
                <FormGroup align="center">
                  <Label for="deferred">Deferred *</Label>
                  <CustomInput
                    type="switch"
                    id="deferred"
                    name="deferred"
                    className="custom-switch"
                    defaultChecked={data.deferred}
                    onChange={handleChangeDeferred}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={5}>
                <FormGroup>
                  <Label for="deferredDate">Date *</Label>
                  <Input
                    type="date"
                    name="deferredDate"
                    id="deferredDate"
                    required={true}
                    defaultValue={formatDate((new Date(data.deferredDate)).toDateString())}
                    disabled={!deferredOpt}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <Label for="deferredTime">Time</Label>
                  <Input
                    type="time"
                    name="deferredTime"
                    id="deferredTime"
                    required={true}
                    defaultValue={(new Date(data.deferredDate)).toLocaleTimeString()}
                    disabled={!deferredOpt}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm={12} md={12}>
                <FormGroup>
                  <div className="editor">
                    <Label for="editor">Message *</Label>
                    <div className="editor">
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}                        
                        editorStyle={{border:"1px solid #f4f4f4", height:"250px"}}
                        toolbar={{
                          inline: { inDropdown: true },
                          list: { inDropdown: true },
                          textAlign: { inDropdown: true },
                          link: { inDropdown: true },
                          history: { inDropdown: true },
                        //   image: {
                        //     uploadCallback: uploadImageCallBack,
                        //     alt: { present: true, mandatory: true },
                        //   },                                                
                        }}
                      />
                    </div>
                  </div>
                  {/* <div>{JSON.stringify(convertToRaw(editorState.getCurrentContent()))}</div> */}
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
        <ModalHeader toggle={toggleDelete.bind(null)}> Campaign </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmitDelete(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            {!noSentMsg ? (
              <div>
                Do you want to delete this campaign? <b>{data.name}</b>
              </div>
            ) : (
              <div>
                You can not delete this campaign. <b>{data.name}</b> has
                messages sent.
              </div>
            )}
            <br />
            <FormGroup>
              <Button color="success" type="submit" disabled={noSentMsg}>
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
          <i className="mdi mdi-message display-7 mr-2"></i>List of Campaigns
        </CardTitle>
        <CardBody>
          <Button
            onClick={() => {
              let item = {
                id: "",
                name: "",
                validDate: Date.now(),
                smsEmail: true,
                message: "",
                deferred: false,
                deferredDate: new Date("1900-01-01"),
                percent: 0,
                valueIn: 0,
                type: "",
              };
              setSmsEmailTxt(item.smsEmail ? "SMS" : "Email");
              setDeferredOpt(item.deferred);
              setModal(!modal);
              setData(item);
            }}
            className="btn"
            outline
            color="secondary"
            type="submit"
          >
            New Campaign
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
                Header: "Valid Date",
                accessor: "validDate",
              },
              {
                Header: "SMS/Email",
                accessor: "switchSmsEmail",
              },
              {
                Header: "Type",
                accessor: "typeName",
              },
              {
                Header: "Effectiveness",
                accessor: "percent",
              },
              {
                Header: "Deferred",
                accessor: "switchDeferred",
              },
              {
                Header: "Deferred Date",
                accessor: "deferredDate",
                show: false,
              },
              {
                Header: "Deferred Date",
                accessor: "defDate",
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
            data={dataCampaign}
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

export default TableCampaign;
