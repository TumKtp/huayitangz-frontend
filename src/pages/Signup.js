import React, { useState } from "react";
import { isAutheticated, signup } from "../controllers/authapi";
import Base from "../core/Base";
import { useForm } from "react-hook-form";

export default function Signup() {
  const { user, token } = isAutheticated();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit } = useForm();

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
      setSuccess("User created");
    } catch (e) {
      setError(e);
      console.log(e);
    }
  };
  const renderForm = () => (
    <form className="was-validated">
      <div className="mb-3">
        <label htmlFor="validationName">ชื่อผู้ใช้งาน</label>
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
        <label htmlFor="validationEmail">อีเมล</label>
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
        <label htmlFor="validationPassword">รหัสผ่าน</label>
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
        <label htmlFor="validationconfirmPassword">ยืนยันรหัสผ่าน</label>
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
      <div className="mb-3">
        <label htmlFor="roleTag">ตำแหน่ง</label>
        <select
          className="custom-select"
          id="roleTag"
          required
          name="role"
          ref={register}
        >
          <option value="0">พนักงานทั่วไป</option>
          <option value="1">แพทย์</option>
          <option value="2">ผู้ดูแลระบบ</option>
        </select>
      </div>
      <div className="d-flex flex-row-reverse">
        <button
          type="button"
          className="btn btn-outline-success mt-3 btn-lg col-2"
          onClick={handleSubmit(onSubmit)}
        >
          ลงทะเบียน
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
        <div className="text-center display-4 mb-3  ">เพิ่มผู้ใช้งาน</div>
        {renderForm()}
      </div>
    </Base>
  );
}
