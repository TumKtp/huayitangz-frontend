import { React, Fragment } from "react";
import { Link } from "react-router-dom";
import { isAdmin, isDoctor } from "../../controllers/authapi";
export default function Sidebar() {
  return (
    <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="sidebar-heading d-flex justify-content-center ">
        <Link to="/home" className="text-decoration-none ">
          <img
            style={{ width: "100px" }}
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="Logo"
            className="img-thumbnail rounded-circle "
          />
          {/* <div className="">huayitangz</div> */}
        </Link>
      </div>
      <div className="list-group list-group-flush">
        <Link
          to="/home"
          className="list-group-item list-group-item-action bg-light"
        >
          หน้าหลัก
        </Link>
        {isDoctor() && (
          <Link
            to="/admin/orders"
            className="list-group-item list-group-item-action bg-light"
          >
            จัดการคำสั่งซื้อ
          </Link>
        )}
        {isAdmin() && (
          <Fragment>
            <Link
              to="/admin/products"
              className="list-group-item list-group-item-action bg-light"
            >
              จัดการสินค้า
            </Link>
            <Link
              to="/admin/categories"
              className="list-group-item list-group-item-action bg-light"
            >
              จัดการประเภท
            </Link>
            <Link
              to="/admin/users"
              className="list-group-item list-group-item-action bg-light"
            >
              จัดการผู้ใช้งาน
            </Link>
            <Link
              to="/admin/create/product"
              className="list-group-item list-group-item-action bg-light"
            >
              เพิ่มสินค้า
            </Link>
            <Link
              to="/admin/create/category"
              className="list-group-item list-group-item-action bg-light"
            >
              เพิ่มประเภทของสินค้า
            </Link>
          </Fragment>
        )}

        <Link
          to="/stock"
          className="list-group-item list-group-item-action bg-light"
        >
          สต๊อกสินค้า
        </Link>
        <Link
          to="/orders"
          className="list-group-item list-group-item-action bg-light"
        >
          รายการที่สั่ง
        </Link>
      </div>
    </div>
  );
}
