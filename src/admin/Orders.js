import React, { useEffect, useState } from "react";
import { isAutheticated } from "../controllers/authapi";
import Base from "../core/Base";
import { getAllOrders } from "./controllers/orderapi";
import { Link } from "react-router-dom";

export default function Orders() {
  const { user, token } = isAutheticated();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const data = await getAllOrders(user, token);
        if (data.error) throw data.error;
        setOrders(data);
        console.log(data);
      } catch (e) {
        console.log(e);
        setError("Unable to get products");
      }
    };
    fetchAllOrders();
  }, []);

  const renderTable = () => (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">ผู้สั่ง</th>
          <th scope="col">ชื่อคนไข้</th>
          <th scope="col">ที่อยู่</th>
          <th scope="col">สถานะ</th>
          <th scope="col">ราคา</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => {
          return (
            <tr>
              <th scope="row">{index}</th>
              <td>{order.user.name}</td>
              <td>{order.user.name}</td>
              <td>{order.address}</td>
              <td>{order.status}</td>
              <td>{order.amount}</td>
              <td>
                <div className="d-flex justify-content-around">
                  <button type="button" className="btn btn-primary">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  </button>

                  <button type="button" className="btn btn-danger">
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
        <div className="text-center display-4 mb-3 col-12">All products</div>
        {renderTable()}
      </div>
    </Base>
  );
}
