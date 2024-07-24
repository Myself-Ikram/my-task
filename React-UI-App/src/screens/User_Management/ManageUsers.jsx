import React, { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import { Form, Modal } from "react-bootstrap";
import axios from "axios";
import { SERVER } from "../../config";
import DataTable from "react-data-table-component";
const emptyValue = {
  firstName: "",
  lastName: "",
  number: "",
  email: "",
  roles: [],
};
function ManageUsers() {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [modalHeader, setModalHeader] = useState("");
  const [currentItem, setCurrentItem] = useState(emptyValue);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  // Get Role
  const fetchRoles = async () => {
    await axios
      .get(`${SERVER}/roles`, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setRoles(res.data);
        }
      })
      .catch((err) => console.log(err.message));
  };
  // Get Users
  const fetchUsers = async () => {
    await axios
      .get(`${SERVER}/users`, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data);
        }
      })
      .catch((err) => console.log(err.message));
  };
  useEffect(() => {
    fetchRoles();
    fetchUsers();
  }, []);
  // Handle Change
  const handleChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.id]: e.target.value });
  };
  // Check box
  const handleCheckboxChange = (newItem) => {
    const items = currentItem?.roles;
    const isChecked = items.includes(newItem);
    if (isChecked) {
      setCurrentItem({
        ...currentItem,
        roles: items.filter((item) => item !== newItem),
      });
    } else {
      setCurrentItem({ ...currentItem, roles: [...items, newItem] });
    }
  };

  // Add user
  const handleSubmit = async () => {
    if (modalHeader === "Edit") {
      await axios
        .put(`${SERVER}/users/update/${currentItem?._id}`, currentItem, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 201) {
            setIsModal(false);
            setModalHeader("");
            setCurrentItem(emptyValue);
            fetchUsers();
          } else {
            console.log(res.data?.msg);
          }
        })
        .catch((err) => console.log(err.message));
    } else {
      await axios
        .post(`${SERVER}/users/add_new`, currentItem, { withCredentials: true })
        .then((res) => {
          if (res.status === 201) {
            fetchUsers();
            setModalHeader("");
            setIsModal(false);
            setCurrentItem(emptyValue);
          } else {
            console.log("error while adding");
          }
        })
        .catch((err) => console.log(err.message));
    }
  };
  //   Delete Role
  const deleteRole = async () => {
    await axios
      .delete(`${SERVER}/users/delete/${currentItem?._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          fetchUsers();
          setIsDeleteModal(false);
          setCurrentItem(emptyValue);
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div>
      {/* Header */}
      <PageHeader
        headerTitle="Manage Users"
        renderRight={() => {
          return (
            <div className="d-flex py-2 project-tab flex-wrap w-sm-100">
              <button
                type="button"
                className="btn btn-dark w-sm-100"
                onClick={() => {
                  setIsModal(true);
                  setModalHeader("Add User");
                  setCurrentItem(emptyValue);
                }}
              >
                <i className="icofont-plus-circle me-2 fs-6"></i>Add User
              </button>
            </div>
          );
        }}
      />
      {/* Body */}
      <DataTable
        columns={[
          {
            name: "First Name",
            cell: (row) => <>{row?.firstName}</>,
          },
          { name: "Last Name", cell: (row) => <>{row?.lastName}</> },
          { name: "Email", cell: (row) => <>{row?.email}</> },
          {
            name: "Number",
            cell: (row) => <>{row?.number ? row?.number : "NA"}</>,
          },
          {
            name: "Roles",
            cell: (row) => (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setCurrentItem(row);
                  setViewModal(true);
                }}
              >
                View
              </button>
            ),
          },
          {
            name: "Actions",
            cell: (row) => (
              <div
                className="btn-group"
                role="group"
                aria-label="Basic outlined example"
              >
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setCurrentItem(row);
                    setIsModal(true);
                    setModalHeader("Edit");
                  }}
                >
                  <i className="icofont-edit text-success"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary deleterow"
                  onClick={() => {
                    setIsDeleteModal(true);
                    setCurrentItem(row);
                  }}
                >
                  <i className="icofont-ui-delete text-danger"></i>
                </button>
              </div>
            ),
          },
        ]}
        data={users}
        pagination
        selectableRows={false}
        className="table myDataTable table-hover align-middle mb-0 d-row nowrap dataTable no-footer dtr-inline"
        highlightOnHover={true}
      />
      {/* Modal */}
      <Modal
        show={isModal}
        size="lg"
        onHide={() => {
          setIsModal(false);
          setModalHeader("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">{modalHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form */}
          <Form className="">
            {/* Inputs */}
            <div className="d-flex flex-wrap">
              <div className="mb-3 w-50 px-5">
                <label
                  htmlFor="exampleFormControlInput77"
                  className="form-label"
                >
                  First Name
                </label>
                <input
                  type="text"
                  value={currentItem?.firstName}
                  id="firstName"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter the first name"
                />
              </div>
              <div className="mb-3 w-50 px-5">
                <label
                  htmlFor="exampleFormControlInput77"
                  className="form-label"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  value={currentItem?.lastName}
                  id="lastName"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter the last name"
                />
              </div>
              <div className="mb-3 w-50 px-5">
                <label
                  htmlFor="exampleFormControlInput77"
                  className="form-label"
                >
                  Email
                </label>
                <input
                  type="text"
                  value={currentItem?.email}
                  id="email"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter the email"
                />
              </div>
              <div className="mb-3 w-50 px-5">
                <label
                  htmlFor="exampleFormControlInput77"
                  className="form-label"
                >
                  Mobile Number (Optional)
                </label>
                <input
                  type="text"
                  value={currentItem?.number}
                  maxLength={10}
                  id="number"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter the number"
                />
              </div>
              <div className="mb-3 px-5">
                <label
                  htmlFor="exampleFormControlInput77"
                  className="form-label fw-bold mt-3"
                >
                  Roles
                </label>
                <div className="d-flex flex-wrap gap-3">
                  {roles?.map((item) => (
                    <Form.Check
                      checked={currentItem?.roles?.includes(item?._id)}
                      onChange={(e) => handleCheckboxChange(e.target.value)}
                      value={item?._id}
                      label={item?.roleName}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary"
            disabled={
              currentItem?.firstName?.trim() === "" ||
              currentItem?.lastName?.trim() === "" ||
              currentItem?.email?.trim() === "" ||
              currentItem?.roles?.length === 0
            }
            onClick={handleSubmit}
          >
            {modalHeader !== "Edit" ? "Create" : "Submit"}
          </button>
        </Modal.Footer>
      </Modal>
      {/* Role Model */}
      <Modal
        show={viewModal}
        centered
        onHide={() => {
          setViewModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">My Roles</Modal.Title>
        </Modal.Header>
        <Modal.Body className="justify-content-center flex-column d-flex">
          <ul>
            {currentItem?.roles?.map((item) => (
              <li>{roles?.find((r) => r?._id === item)?.roleName}</li>
            ))}
          </ul>
        </Modal.Body>{" "}
      </Modal>
      {/* Delete Modal */}
      <Modal
        show={isDeleteModal}
        centered
        onHide={() => {
          setIsDeleteModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body className="justify-content-center flex-column d-flex">
          <i className="icofont-ui-delete text-danger display-2 text-center mt-2"></i>
          <p className="mt-4 fs-5 text-center">
            You can only delete this item Permanently
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-danger color-fff"
            onClick={deleteRole}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ManageUsers;
