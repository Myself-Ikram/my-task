import React, { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import { Form, Modal } from "react-bootstrap";
import menuData from "../../components/Data/menu.json";
import axios from "axios";
import { SERVER } from "../../config";
export default function ManageRoles() {
  const [menu, setMenu] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentItem, setCurrentItem] = useState();
  const [modalHeader, setModalHeader] = useState("");
  // Formatting menus / fetch roles
  useEffect(() => {
    fetchRoles();
    const formattedMenu = [
      ...menuData?.menu?.map((i) => ({
        name: i?.name,
        children: i?.children?.map((c) => ({ name: c?.name, status: true })),
      })),
    ];
    setMenu(formattedMenu);
  }, [menuData]);
  //Access Change
  const handleAccessCheck = (e, m, sm) => {
    const changedMenu = currentItem?.menusAccess?.map((p) =>
      p?.name === m?.name
        ? {
            ...p,
            children: p?.children?.map((pm) =>
              pm?.name === sm?.name ? { ...pm, status: e.target.checked } : pm
            ),
          }
        : p
    );
    setCurrentItem({ ...currentItem, menusAccess: changedMenu });
  };
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

  // Add/Update Role
  const handleSubmit = async () => {
    if (modalHeader !== "View") {
      await axios
        .post(`${SERVER}/roles/add_new`, currentItem, { withCredentials: true })
        .then((res) => {
          if (res.status === 201) {
            setIsModal(false);
            setModalHeader("");
            setCurrentItem();
            fetchRoles();
          } else {
            console.log(res.data?.msg);
          }
        })
        .catch((err) => console.log(err.message));
    } else {
      await axios
        .put(`${SERVER}/roles/update/${currentItem?._id}`, currentItem, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 201) {
            setIsModal(false);
            setModalHeader("");
            setCurrentItem();
            fetchRoles();
          } else {
            console.log(res.data?.msg);
          }
        })
        .catch((err) => console.log(err.message));
    }
  };
  //   Delete Role
  const deleteRole = async () => {
    await axios
      .delete(`${SERVER}/roles/delete/${currentItem?._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          fetchRoles();
          setIsDeleteModal(false);
          setCurrentItem();
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div>
      {/* Header */}
      <PageHeader
        headerTitle="Manage Roles"
        renderRight={() => {
          return (
            <div className="d-flex py-2 project-tab flex-wrap w-sm-100">
              <button
                type="button"
                className="btn btn-dark w-sm-100"
                onClick={() => {
                  setIsModal(true);
                  setModalHeader("Add Role");
                  setIsUpdate(true);
                  setCurrentItem({ roleName: "", menusAccess: menu });
                }}
              >
                <i className="icofont-plus-circle me-2 fs-6"></i>Add Role
              </button>
            </div>
          );
        }}
      />
      {/* Body */}
      <div className="d-flex flex-wrap gap-5">
        {roles?.map((item) => (
          <div className="bg-white p-3 shadow-lg rounded w-25">
            <p className="m-0">Role Name:</p>
            <p className="fw-bold">{item?.roleName}</p>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-dark w-sm-100"
                onClick={() => {
                  setIsModal(true);
                  setModalHeader("View");
                  setIsUpdate(false);
                  setCurrentItem(item);
                }}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
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
          {/* Update btn */}
          {modalHeader === "View" && (
            <div className="d-flex gap-2 justify-content-end">
              <button
                onClick={() => setIsUpdate(!isUpdate)}
                className="btn btn-primary"
              >
                {!isUpdate ? "Edit" : "Cancel"}
              </button>
              <button
                type="button"
                className="btn btn-outline-danger w-sm-100"
                onClick={() => {
                  setIsModal(false);
                  setIsDeleteModal(true);
                }}
              >
                <i class="bi bi-trash"></i>
              </button>{" "}
            </div>
          )}
          {/* Form */}
          <Form>
            {/* Input */}
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput77" className="form-label">
                Name
              </label>
              {isUpdate ? (
                <input
                  type="text"
                  value={currentItem?.roleName}
                  onChange={(e) =>
                    setCurrentItem({ ...currentItem, roleName: e.target.value })
                  }
                  className="form-control"
                  id="exampleFormControlInput77"
                  placeholder="Enter the role name"
                />
              ) : (
                <p className="h5 fw-bold">{currentItem?.roleName}</p>
              )}
            </div>
            {/* Access */}
            <p className="h">Permissions Assigned</p>
            {currentItem?.menusAccess?.map((m, idx) => (
              <div className="my-3">
                <p className="fw-bold">
                  {idx + 1}. {m?.name}
                </p>
                <div className="d-flex flex-wrap gap-3">
                  {m?.children?.map((sm) =>
                    isUpdate ? (
                      <Form.Check
                        checked={sm?.status}
                        onChange={(e) => handleAccessCheck(e, m, sm)}
                        label={sm?.name}
                        name="group1 "
                      />
                    ) : (
                      <div className="d-flex gap-2">
                        {sm?.status ? (
                          <i class="bi bi-check-square-fill text-success"></i>
                        ) : (
                          <i class="bi bi-file-x text-danger"></i>
                        )}
                        {sm?.name}
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {isUpdate && (
            <button
              type="button"
              className="btn btn-primary"
              disabled={currentItem?.roleName?.trim() === ""}
              onClick={handleSubmit}
            >
              {modalHeader !== "View" ? "Create" : "Submit"}
            </button>
          )}
        </Modal.Footer>
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
          <Modal.Title className="fw-bold">Delete Role</Modal.Title>
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
