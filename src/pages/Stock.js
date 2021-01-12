import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { getAllProducts } from "../controllers/productapi";
import { isAutheticated } from "../controllers/authapi";

export default function Stock() {
  const { user, token } = isAutheticated();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await getAllProducts(user, token);
        if (data.error) throw data.error;
        setProducts(data);
      } catch (e) {
        console.log(e);
        setError("โหลดข้อมูลไม่สำเร็จ");
      }
    };
    fetchAllProducts();
  }, []);

  const renderTable = () => (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">ชื่อสินค้า</th>
          <th scope="col">ประเภท</th>
          <th scope="col">ราคา</th>
          <th scope="col">สต๊อกสินค้า</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => {
          return (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{product.name}</td>
              <td>{product.category.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
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
        <div className="text-center display-4 mb-3 ">สินค้าทั้งหมด</div>
        {renderTable()}
      </div>
    </Base>
  );
}
