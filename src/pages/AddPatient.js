import React, { useState } from "react";
import { isAutheticated, signup } from "../controllers/authapi";
import Base from "../core/Base";
import { useForm } from "react-hook-form";
import { createPatient } from "../controllers/patientapi";

export default function AddPatient() {
  const { user, token } = isAutheticated();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = async (formData) => {
    setError(false);
    setSuccess(false);
    try {
      const data = await createPatient(user, token, formData);
      if (data.error) throw data.error;
      console.log(data);
      // setValue("name", "");
      // setValue("description", "");
      // setValue("imageUrl", "");
      // setValue("category", "");
      // setValue("stock", "");
      // setValue("price", "");
      setSuccess("Patient created");
    } catch (e) {
      setError(e);
      console.log(e);
    }
  };

  const renderForm = () => (
    <form className="was-validated">
      <div className="mb-3">
        <label htmlFor="validationFirstName">FirstName</label>
        <input
          type="text"
          className="form-control is-invalid"
          id="validationFirstName"
          placeholder="ชื่อจริง"
          required
          defaultValue={""}
          name="firstName"
          ref={register}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="validationLastName">LastName</label>
        <input
          type="text"
          className="form-control is-invalid"
          id="validationLastName"
          placeholder="นามสกุล"
          required
          defaultValue={""}
          name="lastName"
          ref={register}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="validationAddress">Address</label>
        <input
          className="form-control is-invalid"
          id="validationAddress"
          placeholder="Required example Address"
          required
          defaultValue={""}
          name="address"
          ref={register}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="validationPhoneNumber">PhoneNumber</label>
        <input
          className="form-control is-invalid"
          id="validationPhoneNumber"
          placeholder="Required example PhoneNumber"
          required
          defaultValue={""}
          name="phoneNumber"
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
        <p class="text-left font-weight-bold h3 mb-3">เพิ่มคนไข้</p>
        {renderForm()}
      </div>
    </Base>
  );
}
