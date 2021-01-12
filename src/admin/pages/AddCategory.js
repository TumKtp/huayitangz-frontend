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
      console.log(data);
      setSuccess(`เพิ่ม ${data.newCate.name} เรียบร้อย`);
      setName("");
    } catch (e) {
      setError("ไม่สามารถเพิ่มประเภทได้");
    }
  };

  const renderForm = () => (
    <form className="was-validated">
      <div className="mb-3">
        <label htmlFor="validationCategory">ชื่อประเภท</label>
        <input
          className="form-control is-invalid"
          id="validationCategory"
          placeholder="เช่น ค่ารักษา หรือค่ายาสมุนไพร"
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
          เพิ่ม
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
    );

  const successMessage = () =>
    success && (
      <div
        className="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        <strong>สำเร็จ!</strong> {success}
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
        <div className="text-center display-4 mb-3">เพิ่มประเภทใหม่</div>
        {renderForm()}
      </div>
    </Base>
  );
}
