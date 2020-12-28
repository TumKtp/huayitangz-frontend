import React, { useEffect, useState } from "react";
import { isAutheticated } from "../../controllers/authapi";
import Base from "../../core/Base";
import { updateCategory, getCategory } from "../controllers/categoryapi";

export default function UpdateCategory({ match }) {
  const { user, token } = isAutheticated();
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const fetchCategory = async (categoryId) => {
      try {
        const data = await getCategory(categoryId);
        if (data.error) throw data.error;
        setName(data.name);
      } catch (e) {
        setError(e);
        console.log(e);
      }
    };
    fetchCategory(match.params.categoryId);
  }, []);

  const handleChange = (event) => {
    setError(false);
    setName(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    setSuccess(false);
    try {
      const data = await updateCategory(
        user._id,
        token,
        match.params.categoryId,
        { name }
      );
      if (data.error) throw data.error;
      setSuccess("Category updated");
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
          Update
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
        {errorMessage()}
        {successMessage()}
        <div className="text-center display-4 mb-3 col-12">Update category</div>
        {renderForm()}
      </div>
    </Base>
  );
}
