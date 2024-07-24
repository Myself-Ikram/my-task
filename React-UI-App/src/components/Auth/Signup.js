import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { SERVER } from "../../config.js";
import axios from "axios";
function Signup() {
  const his = useHistory();
  const [details, setDetails] = useState({
    email: "",
    password: "",
    re_password: "",
    accept: false,
  });
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.id]: e.target.value });
  };
  const handleSubmit = async () => {
    if (details?.password !== details?.re_password) {
      return alert("Password doesnt match");
    }
    if (!details?.accept) {
      return alert("Please accept the terms!");
    }
    await axios
      .post(`${SERVER}/login/set_password`, details)
      .then((res) => {
        if (res.status === 201) {
          alert(res.data?.msg);
          his.push("/template/my-task/react/sign-in");
        } else {
          alert(res.data?.msg);
        }
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
      <div
        className="w-100 p-3 p-md-5 card border-0 bg-dark text-light"
        style={{ maxWidth: "32rem" }}
      >
        <form className="row g-1 p-3 p-md-4">
          <div className="col-12 text-center mb-1 mb-lg-5">
            <h1>Create your account</h1>
            <span>Free access to our dashboard.</span>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <label className="form-label">Registered Email</label>
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
              <label className="form-label">Password</label>
              <input
                type="text"
                id="password"
                value={details?.password}
                onChange={handleChange}
                className="form-control form-control-lg"
                placeholder="8+ characters required"
              />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <label className="form-label">Confirm password</label>
              <input
                type="text"
                id="re_password"
                onChange={handleChange}
                value={details?.re_password}
                className="form-control form-control-lg"
                placeholder="8+ characters required"
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
                onChange={(e) =>
                  setDetails({ ...details, accept: e.target.checked })
                }
                checked={details?.accept}
              />
              <label className="form-check-label" for="flexCheckDefault">
                I accept the{" "}
                <a
                  href="#!"
                  title="Terms and Conditions"
                  className="text-secondary"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <div className="col-12 text-center mt-4">
            <button
              type="button"
              to="sign-in"
              className="btn btn-lg btn-block btn-light lift text-uppercase"
              alt="SIGNUP"
              onClick={handleSubmit}
            >
              SIGN UP
            </button>
          </div>
          <div className="col-12 text-center mt-4">
            <span className="text-muted">
              Already have an account?{" "}
              <Link to="sign-in" title="Sign in" className="text-secondary">
                Sign in here
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
