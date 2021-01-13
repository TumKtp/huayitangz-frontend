import React, { useState } from "react";
import { isAutheticated } from "../controllers/authapi";
import Base from "../core/Base";
import { useForm } from "react-hook-form";
import { createPatient } from "../controllers/patientapi";

export default function AddPatient() {
  const { user, token } = isAutheticated();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (formData) => {
    setError(false);
    setSuccess(false);
    try {
      const data = await createPatient(user, token, formData);
      if (data.error) throw data.error;
      console.log(data);
      setSuccess("เพิ่มข้อมูคนไข้ใหม่เรียบร้อย");
    } catch (e) {
      setError("เพิ่มข้อมูลคนไข้ไม่สำเร็จ");
      console.log(e);
    }
  };

  const renderForm = () => (
    <form className="was-validated">
      <div className="mb-3">
        <label htmlFor="validationFirstName">ชื่อจริง</label>
        <input
          type="text"
          className="form-control is-invalid"
          id="validationFirstName"
          placeholder="โปรดใส่คำนำหน้า และชื่อ"
          required
          defaultValue={""}
          name="firstName"
          ref={register}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="validationLastName">นามสกุล</label>
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
        <label htmlFor="validationAddress">ที่อยูู่</label>
        <input
          className="form-control is-invalid"
          id="validationAddress"
          placeholder="ที่อยู่"
          required
          defaultValue={""}
          name="address"
          ref={register}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="validationPhoneNumber">เบอร์มือถือ</label>
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
        <div className="text-center display-4 mb-3  ">เพิ่มคนไข้</div>

        {renderForm()}
      </div>
    </Base>
  );
}
