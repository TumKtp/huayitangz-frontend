import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import Card from "./components/Card";
import { getProducts } from "../controllers/productapi";
import { isAutheticated } from "../controllers/authapi";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const { user, token } = isAutheticated();
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

  // Fetch Products OnMount
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts(user, token);
        if (data.error) throw data.error;
        console.log(data);
        setProducts(data);
      } catch (e) {
        console.log(e);
        setError("Unable to get products");
      }
    }
    fetchData();
  }, []);

  return (
    <Base>
      <div className="container">
        <h2>All products</h2>
        {errorMessage()}
        <div class="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-sm-12 col-md-4 col-lg-3 col-xl-2">
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
