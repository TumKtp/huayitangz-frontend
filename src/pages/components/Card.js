import React from "react";

export default function Card({ product }) {
  return (
    <div className="card">
      <img src="logo.png" className="card-img-top p-5" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">{product.description}</p>
        <a href="#" className="btn btn-primary">
          {product.price}asdasdas
        </a>
      </div>
    </div>
  );
}
