import React, { useEffect, useState } from "react";
import { isAutheticated } from "../../controllers/authapi";
import Base from "../../core/Base";
import { getAllOrders, getOrderStatus } from "../controllers/orderapi";
import OrderRow from "./components/OrderRow";

export default function ManageOrders() {
  const { user, token } = isAutheticated();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);
  const [fetch, setFetch] = useState(true);
  const [status, setStatus] = useState();
  const [radioValue, setRadioValue] = useState();
  const [textFilter, setTextFilter] = useState();

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    console.log("FETCH AGAIN");
    const fetchAllOrders = async () => {
      try {
        const data = await getAllOrders(user, token);
        if (data.error) throw data.error;
        setOrders(data);
        console.log("ALLORDER", data);
      } catch (e) {
        console.log(e);
        setError("Unable to get products");
      }
    };
    fetchAllOrders();
  }, [fetch]);

  const fetchFunction = () => {
    setFetch(!fetch);
  };
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

  const renderAllOrders = () => {
    console.log(orders[0]);
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
            <OrderRow
              order={order}
              index={index}
              fetchFunction={fetchFunction}
              allStatus={status}
            />
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
          <th scope="col">อื่นๆ</th>
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
