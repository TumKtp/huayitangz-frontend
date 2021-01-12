import React, { useEffect, useState, Fragment } from "react";
import Base from "../core/Base";
import Card from "./components/Card";
import { getAllProducts } from "../controllers/productapi";
import { isAutheticated } from "../controllers/authapi";
import { createOrder } from "../controllers/orderapi";
import { getAllPatients } from "../controllers/patientapi";
import { getCategories } from "../admin/controllers/categoryapi";

export default function Home() {
  const { user, token } = isAutheticated();
  const [error, setError] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [success, setSuccess] = useState(false);
  const [patients, setPatients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [herbPackage, setHerbPackage] = useState(0);
  const [radioValue, setRadioValue] = useState();
  const [textFilter, setTextFilter] = useState();

  console.log(cart);
  useEffect(() => {
    const fetchAllPatients = async () => {
      try {
        const data = await getAllPatients(user, token);
        if (data.error) throw data.error;
        setPatients(data);
        console.log(data);
      } catch (e) {
        console.log(e);
        setError("โหลดข้อมูลคนไข้ไม่สำเร็จ");
      }
    };
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

    fetchAllPatients();
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await getAllProducts(user, token);
        if (data.error) throw data.error;
        setProducts(data);
        // console.log(data);
      } catch (e) {
        console.log(e);
        setError("โหลดข้อมูลสินค้าไม่สำเร็จ");
      }
    };
    fetchAllProducts();
  }, [fetch]);

  // All Functions
  const selectPatient = (event) => {
    setError(false);
    setPatientId(event.target.value);
  };

  const handleChange = (event) => {
    const value = parseInt(event.target.value);
    // If input form empty
    if (Number.isNaN(value)) {
      console.log("EMPTY");
      setHerbPackage(0);
    }
    // If there is a number in input form
    else if (!Number.isNaN(value) && value >= 0) {
      setHerbPackage(value);
    }
  };

  const handleAddition = () => {
    let value = herbPackage + 1;
    if (Number.isNaN(herbPackage)) value = 1;
    if (value >= 0) setHerbPackage(value);
  };

  const handleSubtraction = () => {
    let value = herbPackage - 1;
    if (Number.isNaN(herbPackage)) value = 0;
    if (value >= 0) setHerbPackage(value);
  };

  const addToCart = (count, product, price, name, categoryName) => {
    const newCart = [...cart];
    const foundIndex = newCart.findIndex((item) => item.product === product);
    // Chech whether there is a same product in cart or not
    if (foundIndex !== -1) {
      // Is product count = 0 or not
      if (count === 0) newCart.splice(foundIndex, 1);
      else newCart[foundIndex] = { count, product, price, name, categoryName };
      setCart([...newCart]);
    } else {
      // Only non-zero count can be added
      if (count != 0)
        setCart([...newCart, { count, product, price, name, categoryName }]);
    }
  };

  const placeOrder = async () => {
    setError(false);
    setSuccess(false);
    const order = {
      cart,
      patient: patientId,
      herbPackage,
    };
    try {
      if (patientId.length === 0)
        return setError("โปรดเลือกชื่อคนไข้ในคำสั่งซื้อ");
      const data = await createOrder(user, token, order);
      if (data.error) throw data.error;
      console.log(data);
      setFetch(!fetch);
      setSuccess("ส่งคำสั่งซื้อเรียบร้อย");
    } catch (e) {
      console.log(e);
      setError(e.errorTH ? e.errorTH : "ไม่สามารถส่งคำสั่งซื้อได้");
    }
  };

  const sortCart = () => {
    cart.sort((a, b) => {
      if (a.categoryName < b.categoryName) {
        return -1;
      }
      return 1;
    });
  };

  const handleRadioFilter = (event) => {
    setRadioValue(event.target.value);
  };

  const handleTextFilter = (event) => {
    setTextFilter(event.target.value);
  };

  // Rendering Function

  const renderInputspinner = () => (
    <div className="m-2">
      <label htmlFor="categoryId">จำนวนห่อ</label>
      <div className="input-group ">
        {herbPackage === 0 ? (
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
          value={herbPackage}
          min="0"
        />
        <div className="input-group-append" onClick={handleAddition}>
          <button className="btn btn-success">+</button>
        </div>
      </div>
    </div>
  );

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
              {renderItemsInCart()}{" "}
              <h5 className="mt-2 d-flex ">
                <div className="pb-1 flex-grow-1">ยาจีนทั้งหมด</div>
                <div className="pb-1 pr-3 ">{herbPackage} ห่อ</div>
              </h5>
              <hr />
              <h5 className="mt-2 d-flex font-weight-bold ">
                <div className="pb-1 flex-grow-1">รวม</div>
                <div className="pb-1 pr-3 ">
                  {cart
                    .reduce(function (a, b) {
                      return (
                        a +
                        (b.categoryName == "ยาสมุนไพร"
                          ? b.count * b.price * herbPackage
                          : b.count * b.price)
                      );
                    }, 0)
                    .toFixed(1)}{" "}
                  บาท
                </div>
              </h5>
              <hr />
            </div>
            <div className="mt-3">
              <label htmlFor="categoryId">ชื่อคนไข้</label>
              <select
                className="custom-select"
                id="categoryId"
                required
                onChange={selectPatient}
                value={patientId}
              >
                <option value="">Choose...</option>
                {patients &&
                  patients.map((patient, index) => (
                    <option key={index} value={patient._id}>
                      {patient.firstName} {patient.lastName}
                    </option>
                  ))}
              </select>
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
              // data-dismiss="modal"
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCartCard = () => (
    <div className="card border-secondary mb-3 mt-3">
      {/* cart Card Header */}
      <div className="card-header h5">ตะกร้าสินค้า</div>
      {/* cart Card Body */}
      <div className="card-body text-secondary">
        {cart.length != 0 ? (
          renderItemsInCart()
        ) : (
          <div>ยังไม่มีสินค้าในตะกร้า</div>
        )}
      </div>
      {/* cart Card Footer */}
      {cart.length != 0 && (
        <div class="card-footer bg-transparent border-secondary">
          <div className="row justify-content-between card-subtitle">
            {renderInputspinner()}
          </div>
          <div className="row justify-content-between card-subtitle">
            <div className="m-2">รวม</div>
            <div className="m-2">
              {cart
                .reduce(function (a, b) {
                  return (
                    a +
                    (b.categoryName == "ยาสมุนไพร"
                      ? b.count * b.price * herbPackage
                      : b.count * b.price)
                  );
                }, 0)
                .toFixed(1)}{" "}
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
      )}
    </div>
  );

  const renderAllProducts = () => {
    // If radioValue or textFilter is empty return true
    // but if it's not empty, filter it.
    const filteredProducts = products.filter(
      (product) =>
        (!radioValue || product.category.name == radioValue) &&
        (!textFilter || product.name.includes(textFilter))
    );
    return (
      <div className="row">
        {filteredProducts.map((product, _) => {
          return (
            <div
              key={product._id}
              className="col-sm-12 col-md-4 col-lg-3  mb-4 "
            >
              <div className="cnt-block equal-hight">
                <Card
                  product={product}
                  addToCart={addToCart}
                  initCount={
                    cart && cart.find((item) => item.product === product._id)
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderItemsInCart = () => {
    var lastCategory;
    sortCart();
    return (
      <Fragment>
        {cart.map((item, index) => {
          if (lastCategory !== item.categoryName) {
            lastCategory = item.categoryName;
            return (
              <Fragment>
                <h5>{item.categoryName}</h5>
                <div className="card-subtitle text-muted d-flex bd-highlight">
                  <div className="py-1 flex-grow-1 bd-highlight">
                    {item.name}
                  </div>
                  <div className="py-1 bd-highlight">
                    {(item.count * item.price).toFixed(1)} บาท
                    {/* {cart.count} {"AAA"}
              {cart.price} */}
                  </div>
                </div>
              </Fragment>
            );
          }
          return (
            <div className="card-subtitle text-muted d-flex bd-highlight">
              <div className="py-1 flex-grow-1 bd-highlight ">{item.name}</div>
              <div className="py-1 bd-highlight">
                {(item.count * item.price).toFixed(1)} บาท
                {/* {cart.count} {"AAA"}
              {cart.price} */}
              </div>
            </div>
          );
        })}
      </Fragment>
    );
  };

  const renderFilter = () => (
    <div className="input-group row justify-content-md-center mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">
          <i class="fa fa-search" aria-hidden="true" />
        </span>
      </div>
      <input
        type="text"
        className="form-control col-6"
        placeholder="ค้นหาสินค้า"
        onChange={handleTextFilter}
      />
      <select className="form-control col-3" onChange={handleRadioFilter}>
        <option value="" selected>
          ทั้งหมด
        </option>
        {categories &&
          categories.map((category, index) => (
            <option value={category.name}>{category.name}</option>
          ))}
      </select>
    </div>
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

  const successMessage = () =>
    success && (
      <div
        className="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        <strong>สำเร็จ!</strong> {success}
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
      {/* <h2>All products</h2> */}
      <div className="row pt-3">
        <div className="col-lg-10 col-md-12">
          {successMessage()}
          {errorMessage()}
          <div className="text-center display-4 my-3">สินค้าทั้งหมด</div>
          {renderFilter()}
          {renderAllProducts()}
        </div>
        {/* Right Sidebar */}
        <div className="col-lg-2"> {renderCartCard()}</div>

        {/* Confirmation Modal */}
        {confirmPlacingOrderModal()}
      </div>
    </Base>
  );
}
