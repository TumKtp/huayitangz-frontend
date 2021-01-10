import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { isAutheticated } from "../../controllers/authapi";
import Base from "../../core/Base";
import { getCategories } from "../controllers/categoryapi";
import { updateProduct, getProduct } from "../controllers/productapi";

export default function UpdateProduct({ match }) {
  const { user, token } = isAutheticated();
  const { register, handleSubmit, setValue } = useForm();
  const [categories, setCategories] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        if (data.error) throw data.error;
        setCategories(data);
      } catch (e) {
        setError("โหลดข้อมูลประเภทสินค้าไม่สำเร็จ");
        console.log(e);
      }
    };

    const fetchProduct = async (productId) => {
      try {
        const data = await getProduct(user._id, token, productId);
        if (data.error) throw data.error;
        console.log(data);
        setValue("name", data.name);
        setValue("description", data.description);
        setValue("imageUrl", data.imageUrl);
        setValue("category", data.category._id);
        setValue("stock", data.stock);
        setValue("price", data.price);
      } catch (e) {
        setError("โหลดข้อมูลสินค้าไม่สำเร็จ");
        console.log(e);
      }
    };
    fetchCategories();
    fetchProduct(match.params.productId);
  }, []);

  const onSubmit = async (formData) => {
    setError(false);
    setSuccess(false);
    try {
      console.log(formData);
      const data = await updateProduct(
        user._id,
        token,
        match.params.productId,
        formData
      );
      if (data.error) throw data.error;
      // setValue("name", "");
      // setValue("description", "");
      // setValue("imageUrl", "");
      // setValue("category", "");
      // setValue("stock", "");
      // setValue("price", "");
      setSuccess("Product updated");
    } catch (e) {
      setError("อัพเดทข้อมูลไม่สำเร็จ");
      console.log(e);
    }
  };

  const renderForm = () => (
    <form className="was-validated">
      <div className="mb-3">
        <label htmlFor="validationName">ชื่อสินค้า</label>
        <input
          type="text"
          className="form-control is-invalid"
          id="validationName"
          placeholder="เช่น ชาเบะเก๊ ค่าแม๊ะ หรือค่าฝังเข็ม"
          required
          name="name"
          ref={register}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="validationTextarea">คำอธิบายเพิมเติม (ไม่จำเป็น)</label>
        <textarea
          className="form-control is-invalid"
          id="validationTextarea"
          name="description"
          ref={register}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="validationImageUrl">ลิ้งค์รูปภาพ</label>
        <input
          className="form-control is-invalid"
          id="validationImageUrl"
          placeholder="เช่น https://res.cloudinary.com/image/HuayitangZ.jpg"
          required
          name="imageUrl"
          ref={register}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="categoryId">ประเภทของสินค้า</label>
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
              สต๊อก
            </span>
          </div>
          <input
            type="number"
            className="form-control is-invalid"
            aria-describedby="validatedInputGroupPrepend"
            required
            name="stock"
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
          ยืนยัน
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
        {errorMessage()}
        {successMessage()}
        <div className="text-center display-4 mb-3 col-12">แก้ไขสินค้า</div>
        {renderForm()}
      </div>
    </Base>
  );
}
