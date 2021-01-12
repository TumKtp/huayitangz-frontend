import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../../controllers/authapi";
import { deleteCategory, getCategories } from "../controllers/categoryapi";
import ConfirmDialog from "./components/ConfirmDialog";
import Base from "../../core/Base";

export default function ManageCategories() {
  const { user, token } = isAutheticated();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [fetch, setFetch] = useState(true);

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
    fetchCategories();
  }, [fetch]);

  const handleDelete = async (categoryId) => {
    await deleteCategory(user._id, token, categoryId);
    setFetch(!fetch);
  };

  const renderTable = () => (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">ชื่อประเภท</th>
          <th scope="col">วันที่เพิ่ม</th>
          <th scope="col">อื่นๆ</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category, index) => {
          return (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{category.name}</td>

              <td>{category.createdAt.slice(0, 10)}</td>
              <td>
                <div className="d-flex justify-content-around">
                  <Link to={`/admin/category/update/${category._id}`}>
                    <button type="button" className="btn btn-secondary">
                      <i class="fa fa-pencil" aria-hidden="true" />
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-toggle="modal"
                    data-target={"#modalCategory" + category._id}
                  >
                    <i class="fa fa-trash" aria-hidden="true" />
                  </button>

                  <ConfirmDialog
                    id={"modalCategory" + category._id}
                    title="ยืนยันการลบสินค้า"
                    desc={`ชื่อสินค้า: ${
                      category.name
                    }\nวันที่เพิ่ม: ${category.createdAt.slice(0, 10)}`}
                    confirmOnclick={() => handleDelete(category._id)}
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
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

  return (
    <Base>
      <div className="container pt-5 px-5 ">
        {errorMessage()}
        <div className="text-center display-4 mb-3 ">ประเภททั้งหมด</div>
        {renderTable()}
      </div>
    </Base>
  );
}
