import React, { useState } from "react";

export default function Card({ product, addToCart }) {
  const [count, setCount] = useState(0);

  const handleChange = (event) => {
    // setCount(event.target.value);
    // console.log(event.target.value);
    const value = parseInt(event.target.value);
    // If input form empty
    if (Number.isNaN(value)) {
      console.log("EMPTY");
      addToCart(0, product._id, product.price, product.name);
    }
    // If there is a number in input form
    else if (!Number.isNaN(value) && value >= 0) {
      addToCart(value, product._id, product.price, product.name);
    }
    // Option : Input cant empty
    // if (Number.isNaN(value)) {
    //   setCount(0);
    // } else setCount(value);
    setCount(value);
  };

  const handleAddition = () => {
    let value = count + 1;
    if (Number.isNaN(count)) {
      value = 1;
    }
    if (value >= 0) {
      addToCart(value, product._id, product.price, product.name);
      setCount(value);
    }
  };

  const handleSubtraction = () => {
    let value = count - 1;
    if (Number.isNaN(count)) {
      value = 0;
    }

    if (value >= 0) {
      addToCart(value, product._id, product.price, product.name);
      setCount(value);
    }
  };

  const renderInputspinner = () => (
    <div className="input-group ">
      {count === 0 ? (
        <div className="input-group-prepend" onClick={handleSubtraction}>
          <button className="btn btn-danger" disabled>
            -
          </button>
        </div>
      ) : (
        <div className="input-group-prepend" onClick={handleSubtraction}>
          <button className="btn btn-danger">-</button>
        </div>
      )}
      <input
        type="number"
        className="form-control"
        onChange={handleChange}
        value={count}
        min="0"
      />
      <div className="input-group-append" onClick={handleAddition}>
        <button className="btn btn-success">+</button>
      </div>
    </div>
  );

  return (
    <div className="card h-100 ">
      <img src={product.imageUrl} className="card-img-top" alt="..." />
      <div class="card-body">
        <h5 className="card-title">{product.name}</h5>
        <h6 class="card-subtitle text-muted mb-2">{product.category.name}</h6>
        {/* <span className="card-text"></span> */}
        <p class="card-text">
          ราคา {product.price}บาท / 1g <br />
          เหลือ {product.stock}g
        </p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">{renderInputspinner()}</li>
        <li class="list-group-item">
          ทั้งหมด{" "}
          {Number.isNaN(product.price * count) ? 0 : product.price * count} บาท
        </li>
        {/* <p className="text-dark text-center">{JSON.stringify(count)}</p> */}
      </ul>
    </div>
  );
}
