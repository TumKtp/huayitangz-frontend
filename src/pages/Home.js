import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import Card from "./components/Card";
import { getAllProducts } from "../controllers/productapi";
import { isAutheticated } from "../controllers/authapi";
import { createOrder } from "../controllers/orderapi";

export default function Home() {
  const { user, token } = isAutheticated();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await getAllProducts(user, token);
        if (data.error) throw data.error;
        setProducts(data);
        // console.log(data);
      } catch (e) {
        console.log(e);
        setError("Unable to get products");
      }
    };
    fetchAllProducts();
  }, []);

  // All Functions
  const addToCart = (count, product, price, name) => {
    const newCart = [...cart];
    const foundIndex = newCart.findIndex((item) => item.product === product);
    // Chech whether there is a same product in cart or not
    if (foundIndex !== -1) {
      // Is product count = 0 or not
      if (count === 0) newCart.splice(foundIndex, 1);
      else newCart[foundIndex] = { count, product, price, name };
      setCart([...newCart]);
    } else {
      // Only non-zero count can be added
      if (count != 0) setCart([...newCart, { count, product, price, name }]);
    }
  };

  const placeOrder = async () => {
    const order = {
      cart: cart,
      address: "ASDADS",
    };
    try {
      const data = await createOrder(user, token, order);
      if (data.error) throw data.error;
      console.log(data);
      setSuccess("ส่งคำสั่งซื้อเรียบร้อย");
    } catch (e) {
      setError(e);
    }
  };

  // Rendering Function

  const confirmPlacingOrderModal = () => (
    <div
      className="modal fade"
      id="confirmPlacingOrderModal"
      tabIndex={-1}
      aria-labelledby="confirmPlacingOrderModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <h5 className="modal-title" id="confirmPlacingOrderModalLabel">
              ยืนยันคำสั่งซื้อ
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          {/* Modal Body */}
          <div className="modal-body">
            <div className="text-secondary">
              <h5>ทั้งหมด {cart.length} ชนิด</h5>
              {cart.map((item, index) => {
                return (
                  <div className="card-subtitle text-muted d-flex bd-highlight">
                    <div className="p-2 flex-grow-1 bd-highlight">
                      {item.name}
                    </div>
                    <div className="p-2 bd-highlight">
                      {item.count * item.price} บาท
                      {/* {cart.count} {"AAA"}
                  {cart.price} */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Modal Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={placeOrder}
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCartCard = () => (
    <div className="col-lg-2 ">
      <div
        className="card border-secondary mb-3 mt-3"
        style={{ maxWidth: "18rem" }}
      >
        {/* cart Card Header */}
        <div className="card-header">ตะกร้าสินค้า</div>
        {/* cart Card Body */}
        <div className="card-body text-secondary">
          <h5 className="card-title">ทั้งหมด {cart.length} ชนิด</h5>
          {cart.map((item, index) => {
            return (
              <div className="card-subtitle text-muted d-flex bd-highlight">
                <div className="p-2 flex-grow-1 bd-highlight">{item.name}</div>
                <div className="p-2 bd-highlight">
                  {item.count * item.price} บาท
                  {/* {cart.count} {"AAA"}
                  {cart.price} */}
                </div>
              </div>
            );
          })}
        </div>
        {/* cart Card Footer */}
        <div class="card-footer bg-transparent border-secondary">
          <div className="row justify-content-between card-subtitle">
            <div className="m-2">รวม</div>
            <div className="m-2">
              {cart.reduce(function (a, b) {
                // console.log("HERE");

                // console.log(b.count, b.price);
                // console.log("-------");
                return a + b.count * b.price;
              }, 0)}{" "}
              บาท
            </div>
          </div>
          <div className="row justify-content-end">
            <button
              type="button"
              class="btn btn-success mr-2"
              data-toggle="modal"
              data-target="#confirmPlacingOrderModal"
            >
              สั่งซื้อ
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAllProducts = () => (
    <div className="row">
      {products.map((product, index) => {
        return (
          <div key={index} className="col-sm-12 col-md-4 col-lg-3  mb-4 ">
            <div className="cnt-block equal-hight">
              <Card product={product} addToCart={addToCart} />
            </div>
          </div>
        );
      })}
    </div>
  );

  const errorMessage = () =>
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
    );

  const successMessage = () =>
    success && (
      <div
        className="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        <strong>Done!</strong> {success}
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

  // TODO: delete debug
  const debugCart = () => {
    if (cart) {
      console.log("cart");
      console.log(cart);
    }
  };

  return (
    <Base>
      {/* <h2>All products</h2> */}
      <div className="row pt-3 ">
        <div className="col-lg-10 col-md-12">
          {successMessage()}
          {errorMessage()}
          <div className="text-center display-4 mb-3 col-12">สินค้าทั้งหมด</div>

          {renderAllProducts()}
        </div>
        {/* Right Sidebar */}
        {renderCartCard()}
        {confirmPlacingOrderModal()}
      </div>
      {/* {debugCart()} */}
    </Base>
  );
}
