import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import GoogleImg from "../../assets/images/google.svg";
import axios from "axios";
import { SERVER } from "../../config.js";
import { Modal } from "react-bootstrap";

function SignIn() {
  const his = useHistory();
  axios.defaults.withCredentials = true;
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [isModal, setIsModal] = useState(false);
  const [roles, setRoles] = useState([]);
  const [userId, setUserId] = useState("");
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.id]: e.target.value });
  };
  const handleSubmit = async () => {
    await axios
      .post(`${SERVER}/login`, details)
      .then((res) => {
        if (res.status === 201) {
          alert("Successfully loggedin");
          setRoles(res.data?.roles);
          setUserId(res.data?.userId);
          setIsModal(true);
        } else {
          alert(res.data?.msg);
        }
      })
      .catch((err) => {
        console.log(err?.message);
      });
  };
  const handleSelectRole = async (role) => {
    setIsModal(false);
    await axios
      .post(`${SERVER}/login/select_role`, { role, userId })
      .then((res) => {
        if (res.status === 201) {
          localStorage.setItem("isLogin", "true");
          localStorage.setItem("roleId", res.data?.role?._id);
          const stringifiedObject = JSON.stringify(res.data?.role?.menusAccess);
          localStorage.setItem("menus", stringifiedObject);
          his.push("/template/my-task/react/");
        }
      });
  };
  return (
    <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
      <div
        className="w-100 p-3 p-md-5 card border-0 bg-dark text-light"
        style={{ maxWidth: "32rem" }}
      >
        <form className="row g-1 p-3 p-md-4">
          <div className="col-12 text-center mb-1 mb-lg-5">
            <h1>Sign in</h1>
            <span>Free access to our dashboard.</span>
          </div>
          <div className="col-12 text-center mb-4">
            <a className="btn btn-lg btn-outline-secondary btn-block" href="#!">
              <span className="d-flex justify-content-center align-items-center">
                <img
                  className="avatar xs me-2"
                  src={GoogleImg}
                  alt="Imag Description"
                />
                Sign in with Google
              </span>
            </a>
            <span className="dividers text-muted mt-4">OR</span>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <label className="form-label">Email address</label>
              <input
                type="email"
                id="email"
                value={details?.email}
                onChange={handleChange}
                className="form-control form-control-lg"
                placeholder="name@example.com"
              />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <div className="form-label">
                <span className="d-flex justify-content-between align-items-center">
                  Password
                  <Link className="text-secondary" to="password-reset">
                    Forgot Password?
                  </Link>
                </span>
              </div>
              <input
                type="password"
                id="password"
                onChange={handleChange}
                value={details?.password}
                className="form-control form-control-lg"
                placeholder="***************"
              />
            </div>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" for="flexCheckDefault">
                Remember me
              </label>
            </div>
          </div>
          <div className="col-12 text-center mt-4">
            <button
              type="button"
              disabled={details?.email === "" || details?.password === ""}
              onClick={handleSubmit}
              className="btn btn-lg btn-block btn-light lift text-uppercase"
              atl="signin"
            >
              SIGN IN
            </button>
          </div>
          <div className="col-12 text-center mt-4">
            <span className="text-muted">
              Don't have an account yet?{" "}
              <Link to="sign-up" className="text-secondary">
                Sign up here
              </Link>
            </span>
          </div>
        </form>
      </div>
      {/* Select Role */}
      <Modal
        show={isModal}
        centered
        onHide={() => {
          setIsModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Select Role</Modal.Title>
        </Modal.Header>
        <Modal.Body className="justify-content-center flex-column d-flex">
          <div className="d-flex flex-row flex-wrap gap-3">
            {roles?.map((item) => (
              <button
                className="btn btn-outline-success"
                onClick={() => handleSelectRole(item)}
              >
                {item?.roleName}
              </button>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SignIn;
