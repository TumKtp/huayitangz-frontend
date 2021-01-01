import React, { useState } from "react";
import { isAutheticated } from "../../controllers/authapi";
import Base from "../../core/Base";
import { createCategory } from "../controllers/categoryapi";

export default function AddCategory() {
  const { user, token } = isAutheticated();
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    setError(false);
    setName(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    setSuccess(false);

    //backend request fired
    try {
      const data = await createCategory(user._id, token, { name });
      if (data.error) throw data.error;
      setSuccess("Category created");
      setName("");
    } catch (e) {
      setError(e);
    }
  };

  const renderForm = () => (
    <form className="was-validated">
      <div className="mb-3">
        <label htmlFor="validationCategory">Category</label>
        <input
          className="form-control is-invalid"
          id="validationCategory"
          placeholder="Required example Category"
          required
          type="text"
          onChange={handleChange}
          value={name}
        />
      </div>
      <div className="d-flex">
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={onSubmit}
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
        <p class="text-left font-weight-bold h3 mb-3">Add category</p>
        {renderForm()}
      </div>
    </Base>
  );
}
