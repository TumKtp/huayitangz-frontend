import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { signin, authenticate, isAutheticated } from "../controllers/authapi";

const Signin = () => {
  const [values, setValues] = useState({
    email: "t@a.com",
    password: "tum",
    error: false,
    isLoading: false,
    didRedirect: false,
  });

  const { email, password, error, isLoading, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, isLoading: true });
    try {
      const data = await signin({ email, password });
      console.log(data);
      if (data.error) throw data.error;
      authenticate(data);
      setValues({
        ...values,
        didRedirect: true,
      });
    } catch (e) {
      console.log("signin request failed");
      console.log(e);
      setValues({ ...values, error: e, isLoading: false });
    }
  };

  const performRedirect = () => {
    if (didRedirect || isAutheticated()) {
      return <Redirect to="/home" />;
    }
  };

  const loadingMessage = () => {
    return (
      isLoading && (
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
            <div className="alert alert-info">Loading....</div>
          </div>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <strong>เกิดข้อผิดพลาด!</strong> {error}
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      )
    );
  };

  const signInForm = () => {
    return (
      <div className="container d-flex justify-content-center align-items-center mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
            <div className="card shadow">
              <img src="logo.png" className="card-img-top p-4" alt="Logo" />
              <div className="card-body">
                <h5 className=" text-dark">Login</h5>
                <form>
                  <div className="form-group">
                    <label className="text-dark">Email</label>
                    <input
                      onChange={handleChange("email")}
                      value={email}
                      className="form-control"
                      type="email"
                    />
                  </div>

                  <div className="form-group">
                    <label className="text-dark">Password</label>
                    <input
                      onChange={handleChange("password")}
                      value={password}
                      className="form-control"
                      type="password"
                    />
                  </div>
                  <button
                    onClick={onSubmit}
                    className="btn btn-success btn-block"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      <p className="text-dark text-center">{JSON.stringify(values)}</p>
    </div>
  );
};

export default Signin;
