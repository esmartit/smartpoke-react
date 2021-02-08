import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import brandService from "../../services/maintenances/brands.service";

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

function BrandTable() {
  const [data, setData] = useState([]);
  const [brandData, setBrandData] = useState([]);

  const [alertMsg, setAlertMsg] = useState({
    color: "danger",
    text: "text-danger",
    icon: "fas fa-ban",
    msg: "Error occured while trying to request brands. Network error!",
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
      getBrandList();
    }
  }, [loading]);

  const getBrandList = () => {
    brandService
      .getAll()
      .then((response) => {
        setBrandData(response.data);
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
          "Something wrong happens with the brand. Network problem!";
        break;
      case 500:
        alertMsg.msg = "Brand already exist!";
        break;
      default:
        alertMsg.msg =
          "Error occured while trying to request brands. Network error!";
        break;
    }
    setAlertMsg(alertMsg);
  };

  const createItem = (data) => {
    brandService
      .create(data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Brand saved successful!";
        setAlertMsg(alertMsg);
        getBrandList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getBrandList();
      });
  };

  const updateItem = (data) => {
    brandService
      .update(data.id, data)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Brand updated successful!";
        setAlertMsg(alertMsg);
        getBrandList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getBrandList();
      });
  };

  const deleteItem = (id) => {
    brandService
      .delete(id)
      .then((response) => {
        alertMsg.color = "success";
        alertMsg.text = "text-success";
        alertMsg.icon = "fas fa-check-circle";
        alertMsg.msg = "Brand deleted successful!";
        setAlertMsg(alertMsg);
        getBrandList();
      })
      .catch((error) => {
        getErrorMessage(error.response.status);
        getBrandList();
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = event.target.id.value;
    let name = event.target.name.value;
    let item = { 
      id: id, 
      name: name };
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

  const dataBrand = brandData.map((brand) => {
    return {
      id: brand.id,
      name: brand.name,
      actions: (
        // we've added some custom button actions
        <div className="text-center">
          {/* use this button to add a edit kind of action */}
          <Button
            onClick={() => {
              let item = dataBrand.find((o) => o.id === brand.id);
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
              let item = dataBrand.find((o) => o.id === brand.id);
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
        <ModalHeader toggle={toggle.bind(null)}> Brand </ModalHeader>
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
        <ModalHeader toggle={toggleDelete.bind(null)}> Brand </ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => handleSubmitDelete(event)}>
            <Input type="hidden" name="id" id="id" defaultValue={data.id} />
            <div>
              Do you want to delete this brand? <b>{data.name}</b>
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
          <i className="mdi mdi-check-circle display-7 mr-2"></i>List of Brands
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
            New Brand
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
            data={dataBrand}
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

export default BrandTable;
