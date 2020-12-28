import React from "react";

export default function Card({ product }) {
  return (
    <div className="card h-100 ">
      <img src={product.imageUrl} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <a href="#" className="btn btn-primary">
          {product.price}
        </a>
      </div>
    </div>
  );
}
