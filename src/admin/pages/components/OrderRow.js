import React, { Fragment, useEffect, useState } from "react";
import {
  isAdmin,
  isAutheticated,
  isDoctor,
} from "../../../controllers/authapi";
import { deleteOrder, updateOrderStatus } from "../../controllers/orderapi";
import ConfirmDialog from "./ConfirmDialog";

export default function OrderRow({ order, index, fetchFunction, allStatus }) {
  const { user, token } = isAutheticated();
  const [edit, setEdit] = useState(false);
  const [status, setStatus] = useState(order.status);

  const handleDelete = async (orderId) => {
    console.log(await deleteOrder(user, token, orderId));
    console.log("DELETE");
    fetchFunction();
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleStatus = (event) => {
    console.log(event.target.value);
    setStatus(event.target.value);
  };

  const handleSave = async (orderId) => {
    if (status === order.status) return setEdit(false);
    try {
      const data = await updateOrderStatus(user, token, orderId, { status });
      console.log(data);
      if (data.error) throw data.error;
      setEdit(false);
      fetchFunction();
    } catch (e) {
      console.log(e);
    }
  };

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

  return (
    <Fragment>
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{order.user.name}</td>
        <td>
          {order.patient.firstName} {order.patient.lastName}
        </td>
        <td>{order.patient.address}</td>
        <td>{order.patient.phoneNumber}</td>
        <td>
          {edit ? (
            <div className="form-row">
              <select className="custom-select" onChange={handleStatus}>
                {allStatus &&
                  allStatus.map((value, index) =>
                    value == order.status ? (
                      <option key={index} value={value} selected>
                        {value}
                      </option>
                    ) : (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    )
                  )}
              </select>
            </div>
          ) : (
            order.status
          )}
        </td>
        <td>{order.amount}</td>
        <td>
          <div className="d-flex justify-content-around">
            <button
              className="btn btn-light"
              data-toggle="collapse"
              href={`#multiCollapse${index}`}
              role="button"
            >
              <i class="fa fa-sort-desc fa-xs" aria-hidden="true" />
            </button>
            {edit ? (
              <button
                className="btn btn-warning"
                onClick={() => handleSave(order._id)}
              >
                <i class="fa fa-floppy-o" aria-hidden="true" />
              </button>
            ) : (
              <button className="btn btn-secondary" onClick={handleEdit}>
                <i class="fa fa-pencil fa-xs" aria-hidden="true" />
              </button>
            )}
            {isAdmin() && (
              <Fragment>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-toggle="modal"
                  data-target={"#modalOrder" + order._id}
                >
                  <i class="fa fa-trash fa-xs" aria-hidden="true" />
                </button>

                <ConfirmDialog
                  id={"modalOrder" + order._id}
                  title="ยืนยันการลบคำสั่งซื้อ"
                  desc={`ชื่อคนไข้: ${order.patient.firstName} ${order.patient.lastName}\nผู้สั่ง: ${order.user.name}\nราคา: ${order.amount}\nสถานะ: ${order.status}`}
                  confirmOnclick={() => handleDelete(order._id)}
                />
              </Fragment>
            )}
          </div>
        </td>
      </tr>
      <tr>
        <td colSpan="8" className="hiddenRow">
          <div className="collapse" id={`multiCollapse${index}`}>
            <div className="card-body">
              {renderIndividualOrder(order)}
              <h5 className="mt-2 d-flex ">
                <div className="pb-1 flex-grow-1">ยาจีนทั้งหมด</div>
                <div className="pb-1 pr-3 ">{order.herbPackage} ห่อ</div>
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
}
