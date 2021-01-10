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

  return (
    <div>
      {loadingMessage()}
      {errorMessage()}

      {performRedirect()}
      <div
        style={{ minHeight: "100vh" }}
        className="d-flex align-items-center container"
      >
        <div className="card">
          <div className="row" style={{ minHeight: "80vh" }}>
            <div className="col-md-6 d-flex align-items-center">
              {/* <img
                src={process.env.PUBLIC_URL + "/logo.png"}
                style={{ maxWidth: "100%" }}
              /> */}
              <div
                id="carouselIndicators"
                className="carousel slide"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  <li
                    data-target="#carouselIndicators"
                    data-slide-to={0}
                    className="active"
                  />
                  <li data-target="#carouselIndicators" data-slide-to={1} />
                  <li data-target="#carouselIndicators" data-slide-to={2} />
                </ol>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={process.env.PUBLIC_URL + "/carousel1.jpg"}
                      className="d-block w-100 card-img"
                      style={{
                        objectFit: "cover",
                        minHeight: "80vh",
                      }}
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={process.env.PUBLIC_URL + "/carousel2.jpg"}
                      className="d-block w-100 card-img"
                      style={{
                        objectFit: "cover",
                        minHeight: "80vh",
                      }}
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={process.env.PUBLIC_URL + "/carousel3.jpg"}
                      className="d-block w-100 card-img"
                      style={{
                        objectFit: "cover",
                        minHeight: "80vh",
                      }}
                    />
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselIndicators"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselIndicators"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <div className="card-body">
                <div class="d-flex justify-content-center">
                  <img
                    src={process.env.PUBLIC_URL + "/logo.png"}
                    className="mb-3"
                    style={{
                      width: "300px",
                      height: "300px",
                    }}
                  />
                </div>

                <div className="card-title display-4 d-flex justify-content-center">
                  ยินดีต้อนรับ
                </div>
                <form>
                  <div className="form-group row justify-content-center">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <i class="fa fa-user" aria-hidden="true" />
                      </div>
                    </div>
                    <input
                      onChange={handleChange("email")}
                      value={email}
                      className="form-control col-12 col-md-10 col-lg-7"
                      type="email"
                      placeholder="อีเมล"
                    />
                  </div>

                  <div className="form-group row justify-content-center">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <i class="fa fa-key" aria-hidden="true" />
                      </div>
                    </div>
                    <input
                      onChange={handleChange("password")}
                      value={password}
                      className="form-control col-12 col-md-10 col-lg-7"
                      type="password"
                      placeholder="รหัสผ่าน"
                    />
                  </div>
                  <div className="row justify-content-center">
                    <button
                      onClick={onSubmit}
                      className="btn btn-success btn-block  col-12 col-md-12 col-lg-8"
                    >
                      เข้าสู่ระบบ
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
