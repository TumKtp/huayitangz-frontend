import React, { Fragment, useEffect, useState } from "react";
import { getOrderStatus } from "../admin/controllers/orderapi";
import { isAutheticated } from "../controllers/authapi";
import { getOrdersForUser } from "../controllers/orderapi";
import Base from "../core/Base";

export default function Orders() {
  const { user, token } = isAutheticated();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);
  const [radioValue, setRadioValue] = useState();
  const [textFilter, setTextFilter] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const data = await getOrdersForUser(user, token);
        if (data.error) throw data.error;
        setOrders(data);
        console.log("ALLORDER", data);
      } catch (e) {
        console.log(e);
        setError("Unable to get products");
      }
    };
    const fetchOrderStatus = async () => {
      try {
        const data = await getOrderStatus(user, token);
        if (data.error) throw data.error;
        setStatus(data);
      } catch (e) {
        console.log(e);
        setError("Unable to get order status");
      }
    };
    fetchOrderStatus();
    fetchAllOrders();
  }, []);

  const handleRadioFilter = (event) => {
    setRadioValue(event.target.value);
  };

  const handleTextFilter = (event) => {
    setTextFilter(event.target.value);
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
        placeholder="ค้นหาคำสั่งซื้อ"
        onChange={handleTextFilter}
      />
      <select className="form-control col-3" onChange={handleRadioFilter}>
        <option value="" selected>
          ทั้งหมด
        </option>
        {status &&
          status.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
      </select>
    </div>
  );
  const renderIndividualOrder = ({ products }) => {
    var lastCategory;
    return (
      <Fragment>
        {products.map(({ product, item_price }) => {
          if (lastCategory !== product.category.name) {
            lastCategory = product.category.name;
            return (
              <Fragment>
                <h5 className="mt-2">{product.category.name}</h5>
                <div className=" d-flex ">
                  <div className="pb-1  flex-grow-1 ">{product.name}</div>
                  <div className="pb-1  ">{item_price} บาท</div>
                </div>
              </Fragment>
            );
          }
          return (
            <div className=" d-flex ">
              <div className="pb-1  flex-grow-1  ">{product.name}</div>
              <div className="pb-1  ">{item_price} บาท</div>
            </div>
          );
        })}
      </Fragment>
    );
  };

  const renderAllOrders = () => {
    const filteredOrders = orders.filter(
      (order) =>
        (!radioValue || order.status == radioValue) &&
        (!textFilter ||
          order.user.name.includes(textFilter) ||
          order.patient.firstName.includes(textFilter) ||
          order.patient.lastName.includes(textFilter))
    );
    return (
      <tbody>
        {filteredOrders.map((order, index) => {
          return (
            <Fragment>
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{order.user.name}</td>
                <td>
                  {order.patient.firstName} {order.patient.lastName}
                </td>
                <td>{order.patient.address}</td>
                <td>{order.status}</td>
                <td>{order.amount}</td>
                <td>
                  <div className="d-flex justify-content-around">
                    <a
                      className="btn btn-light"
                      data-toggle="collapse"
                      href={`#multiCollapse${index}`}
                      role="button"
                    >
                      <i class="fa fa-sort-desc fa-xs" aria-hidden="true" />
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="7" className="hiddenRow">
                  <div className="collapse" id={`multiCollapse${index}`}>
                    <div className="card-body">
                      {renderIndividualOrder(order)}
                      <h5 className="mt-2 d-flex ">
                        <div className="pb-1 flex-grow-1">ยาจีนทั้งหมด</div>
                        <div className="pb-1 pr-3 ">
                          {order.herbPackage} ห่อ
                        </div>
                      </h5>
                      <hr></hr>
                      <h5 className="mt-2 d-flex font-weight-bold ">
                        <div className="pb-1 flex-grow-1">รวม</div>
                        <div className="pb-1 pr-3 ">{order.amount} บาท</div>
                      </h5>
                    </div>
                  </div>
                </td>
              </tr>
            </Fragment>
          );
        })}
      </tbody>
    );
  };

  const renderTable = () => (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">ผู้สั่ง</th>
          <th scope="col">ชื่อคนไข้</th>
          <th scope="col">ที่อยู่</th>
          <th scope="col">สถานะ</th>
          <th scope="col">ราคา</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      {renderAllOrders()}
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
        <div className="text-center display-4 mb-3 col-12">
          คำสั่งซื้อทั้งหมด
        </div>
        {renderFilter()}
        {renderTable()}
      </div>
    </Base>
  );
}
