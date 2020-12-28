import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import Card from "./components/Card";
import { getAllProducts } from "../controllers/productapi";
import { isAutheticated } from "../controllers/authapi";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const { user, token } = isAutheticated();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await getAllProducts(user, token);
        if (data.error) throw data.error;
        setProducts(data);
        console.log(data);
      } catch (e) {
        console.log(e);
        setError("Unable to get products");
      }
    };
    fetchAllProducts();
  }, []);

  const errorMessage = () => {
    return (
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
      )
    );
  };

  return (
    <Base>
      <div className="container">
        <h2>All products</h2>
        {errorMessage()}
        <div class="row">
          {products.map((product, index) => {
            return (
              <div
                key={index}
                className="col-sm-12 col-md-4 col-lg-3 col-xl-2 mb-4"
              >
                <div className="cnt-block equal-hight">
                  <Card product={product} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
