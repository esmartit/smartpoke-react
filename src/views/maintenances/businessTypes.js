import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import businessTypeService from "../../services/maintenances/businessTypes.service";

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
} from "reactstrap";
import "react-table/react-table.css";

function BusinessTable() {
  const [data, setData] = useState([]);
  const [businessTypeData, setBusinessTypeData] = useState([]);
  const [noSpot, setNoSpot] = useState(false);

  const [alertMsg, setAlertMsg] = useState({
    color: "danger",
    text: "text-danger",
    icon: "fas fa-ban",
    msg: "Error occured while trying to request business types. Network error!",
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
    getBusinessTypeList();
  }, []);

  const getBusinessTypeList = () => {
    businessTypeService
      .getAll()
      .then((response) => {
        setBusinessTypeData(response.data);
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
          "Something wrong happens with the business type. Network problem!";
        break;
      case 500:
        alertMsg.msg = "Business Type already exist!";
        break;
      default:
        alertMsg.msg =
          "Error occured while trying to request business types. Network error!";
        break;
    }
    setAlertMsg(alertMsg);
  };

  const createItem = (data) => {
    businessTypeService
      .create(data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Business type saved successful!";
        setAlertMsg(alertMsg);
        getBusinessTypeList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getBusinessTypeList();
      });
  };

  const updateItem = (data) => {
    businessTypeService
      .update(data.id, data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Business type updated successful!";
        setAlertMsg(alertMsg);
        getBusinessTypeList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getBusinessTypeList();
      });
  };

  const deleteItem = (id) => {
    businessTypeService
      .delete(id)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Business type deleted successful!";
        setAlertMsg(alertMsg);
        getBusinessTypeList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getBusinessTypeList();
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = event.target.id.value;
    let name = event.target.name.value;
    let item = { 
      id: id, 
      name: name 
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

  const dataBusinessType = businessTypeData.map((business) => {
    return {
      id: business.id,
      name: business.name,
      spots: business.spots,
      actions: (
        // we've added some custom button actions
        <div className="text-center">
          {/* use this button to add a edit kind of action */}
          <Button
            onClick={() => {
              let item = dataBusinessType.find((o) => o.id === business.id);
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
              let item = dataBusinessType.find((o) => o.id === business.id);
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
        <ModalHeader toggle={toggle.bind(null)}> Business Type </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
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
        <ModalHeader toggle={toggleDelete.bind(null)}>
          {" "}
          Business Type{" "}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmitDelete(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            {!noSpot ? (
              <div>
                Do you want to delete this business type? <b>{data.name}</b>
              </div>
            ) : (
              <div>
                You can not delete this business type. <b>{data.name}</b> has
                spots associated.
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
          <i className="mdi mdi-briefcase display-7 mr-2"></i>List of Business
          Types
        </CardTitle>
        <CardBody>
          <Button
            onClick={() => {
              let item = {
                id: "",
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
            New Business Type
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
                Header: "Actions",
                accessor: "actions",
                sortable: false,
                filterable: false,
              },
            ]}
            defaultPageSize={10}
            showPaginationBottom={true}
            className="-striped -highlight"
            data={dataBusinessType}
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

export default BusinessTable;
