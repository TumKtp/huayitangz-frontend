import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { isAutheticated } from "../../controllers/authapi";
import Base from "../../core/Base";
import { getCategories } from "../controllers/categoryapi";
import { createProduct } from "../controllers/productapi";
export default function AddProduct() {
  const { user, token } = isAutheticated();
  const { register, handleSubmit, setValue } = useForm();
  const [categories, setCategories] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      if (data.error) throw data.error;
      setCategories(data);
    } catch (e) {
      setError(e);
      console.log(e);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const onSubmit = async (formData) => {
    setError(false);
    setSuccess(false);
    try {
      console.log(formData);
      const data = await createProduct(user, token, formData);
      if (data.error) throw data.error;
      console.log(data);
      // setValue("name", "");
      // setValue("description", "");
      // setValue("imageUrl", "");
      // setValue("category", "");
      // setValue("stock", "");
      // setValue("price", "");
      setSuccess("Product created");
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
        <label htmlFor="validationTextarea">Description</label>
        <textarea
          className="form-control is-invalid"
          id="validationTextarea"
          placeholder="Required example textarea"
          required
          defaultValue={""}
          name="description"
          ref={register}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="validationImageUrl">ImageUrl</label>
        <input
          className="form-control is-invalid"
          id="validationImageUrl"
          placeholder="Required example ImageUrl"
          required
          defaultValue={""}
          name="imageUrl"
          ref={register}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="categoryId">Category</label>
        <select
          className="custom-select"
          id="categoryId"
          required
          name="category"
          ref={register}
        >
          <option value="">Choose...</option>
          {categories &&
            categories.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      <div className="mb-3 row">
        <div className="input-group is-invalid col-6">
          <div className="input-group-prepend">
            <span className="input-group-text" id="validatedInputGroupPrepend">
              stock
            </span>
          </div>
          <input
            type="number"
            className="form-control is-invalid"
            aria-describedby="validatedInputGroupPrepend"
            required
            name="stock"
            min="0"
            ref={register}
          />
        </div>
        <div className="input-group is-invalid col-6">
          <div className="input-group-prepend">
            <span className="input-group-text" id="validatedInputGroupPrepend">
              ราคา
            </span>
          </div>
          <input
            type="number"
            className="form-control is-invalid"
            aria-describedby="validatedInputGroupPrepend"
            required
            name="price"
            ref={register}
          />
        </div>
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
        {errorMessage()}
        {successMessage()}
        <p className="text-left font-weight-bold h3 mb-3">Add product</p>
        {renderForm()}
      </div>
    </Base>
  );
}
