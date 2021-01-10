import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../../controllers/authapi";
import { getAllProducts } from "../../controllers/productapi";
import Base from "../../core/Base";
import { deleteProduct } from "../controllers/productapi";

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
        setError("Unable to get products");
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
          <th scope="col">Name</th>
          <th scope="col">Category</th>
          <th scope="col">Price</th>
          <th scope="col">Stock</th>
          <th scope="col">Actions</th>
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
                    <button type="button" className="btn btn-primary">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(product._id)}
                  >
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
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
        <div className="text-center display-4 mb-3 col-12">All products</div>
        {renderTable()}
      </div>
    </Base>
  );
}
