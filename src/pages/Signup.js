import React, { useState } from "react";
import { isAutheticated, signup } from "../controllers/authapi";
import Base from "../core/Base";
import { useForm } from "react-hook-form";

export default function Signup() {
  const { user, token } = isAutheticated();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = async (formData) => {
    setError(false);
    setSuccess(false);
    try {
      if (formData.password != formData.confirmPassword)
        throw "Password doesn't match";

      const data = await signup(formData);
      if (data.error) throw data.error;
      console.log(data);
      // setValue("name", "");
      // setValue("description", "");
      // setValue("imageUrl", "");
      // setValue("category", "");
      // setValue("stock", "");
      // setValue("price", "");
      // setSuccess("Product created");
    } catch (e) {
      setError(e);
      console.log(e);
    }
  };
  const renderForm = () => (
    <form className="was-validated">
      <div className="mb-3">
        <label htmlFor="validationName">Name</label>
        <input
          type="text"
          className="form-control is-invalid"
          id="validationName"
          placeholder="Required example Name"
          required
          defaultValue={""}
          name="name"
          ref={register}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="validationEmail">Email</label>
        <input
          type="text"
          className="form-control is-invalid"
          id="validationEmail"
          placeholder="Required example Email"
          required
          defaultValue={""}
          name="email"
          ref={register}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="validationPassword">Password</label>
        <input
          className="form-control is-invalid"
          id="validationPassword"
          placeholder="Required example Password"
          required
          defaultValue={""}
          name="password"
          ref={register}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="validationconfirmPassword">Confirm Password</label>
        <input
          className="form-control is-invalid"
          id="validationconfirmPassword"
          placeholder="Required example confirmPassword"
          required
          defaultValue={""}
          name="confirmPassword"
          ref={register}
        />
      </div>
      <div className="d-flex flex-row-reverse">
        <button
          type="button"
          className="btn btn-outline-success mt-3 btn-lg col-2"
          onClick={handleSubmit(onSubmit)}
        >
          Create
        </button>
      </div>
    </form>
  );

  const errorMessage = () =>
    error && (
      <div
        className="alert alert-danger alert-dismissible fade show"
        role="alert"
      >
        <strong>Error!</strong> {error}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    );

  const successMessage = () =>
    success && (
      <div
        className="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        <strong>Done!</strong> {success}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    );

  return (
    <Base>
      <div className="container pt-5 px-5">
        {successMessage()}
        {errorMessage()}
        <p class="text-left font-weight-bold h3 mb-3">เพิ่มผู้ใช้งาน</p>
        {renderForm()}
      </div>
    </Base>
  );
}
