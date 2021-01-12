import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../../controllers/authapi";
import { getAllProducts } from "../../controllers/productapi";
import Base from "../../core/Base";
import { deleteProduct } from "../controllers/productapi";
import ConfirmDialog from "./components/ConfirmDialog";

export default function MagageProducts() {
  const { user, token } = isAutheticated();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [fetch, setFetch] = useState(true);

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
  }, [fetch]);

  const handleDelete = async (productId) => {
    await deleteProduct(user, token, productId);
    setFetch(!fetch);
  };

  const renderTable = () => (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">ชื่อสินค้า</th>
          <th scope="col">ประเภท</th>
          <th scope="col">ราคา</th>
          <th scope="col">สต๊อกสินค้า</th>
          <th scope="col">อื่นๆ</th>
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
              <td>
                <div className="d-flex justify-content-around">
                  <Link to={`/admin/product/update/${product._id}`}>
                    <button type="button" className="btn btn-secondary">
                      <i class="fa fa-pencil" aria-hidden="true" />
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-toggle="modal"
                    data-target={"#modalProduct" + product._id}
                  >
                    <i class="fa fa-trash" aria-hidden="true" />
                  </button>
                  <ConfirmDialog
                    id={"modalProduct" + product._id}
                    title="ยืนยันการลบสินค้า"
                    desc={`ชื่อสินค้า: ${product.name}\nประเภทสินค้า: ${product.category.name}\nราคาสินค้า: ${product.price}\nสต๊อก: ${product.stock}`}
                    confirmOnclick={() => handleDelete(product._id)}
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
        <div className="text-center display-4 mb-3 ">สินค้าทั้งหมด</div>
        {renderTable()}
      </div>
    </Base>
  );
}
