import { React, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { isAdmin, isDoctor } from "../../controllers/authapi";
export default function Sidebar() {
  const realPath = useLocation().pathname;

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
          className={
            "list-group-item list-group-item-action " +
            (realPath === "/home" ? "list-group-item-light active" : "bg-light")
          }
        >
          หน้าหลัก
        </Link>
        {isDoctor() && (
          <Link
            to="/admin/orders"
            className={
              "list-group-item list-group-item-action " +
              (realPath === "/admin/orders"
                ? "list-group-item-light active"
                : "bg-light")
            }
          >
            จัดการคำสั่งซื้อ
          </Link>
        )}
        {isAdmin() && (
          <Fragment>
            <Link
              to="/admin/products"
              className={
                "list-group-item list-group-item-action " +
                (realPath === "/admin/products"
                  ? "list-group-item-light active"
                  : "bg-light")
              }
            >
              จัดการสินค้า
            </Link>
            <Link
              to="/admin/categories"
              className={
                "list-group-item list-group-item-action " +
                (realPath === "/admin/categories"
                  ? "list-group-item-light active"
                  : "bg-light")
              }
            >
              จัดการประเภท
            </Link>
            <Link
              to="/admin/users"
              className={
                "list-group-item list-group-item-action " +
                (realPath === "/admin/users"
                  ? "list-group-item-light active"
                  : "bg-light")
              }
            >
              จัดการผู้ใช้งาน
            </Link>
            <Link
              to="/admin/create/product"
              className={
                "list-group-item list-group-item-action " +
                (realPath === "/admin/create/product"
                  ? "list-group-item-light active"
                  : "bg-light")
              }
            >
              เพิ่มสินค้า
            </Link>
            <Link
              to="/admin/create/category"
              className={
                "list-group-item list-group-item-action " +
                (realPath === "/admin/create/category"
                  ? "list-group-item-light active"
                  : "bg-light")
              }
            >
              เพิ่มประเภทของสินค้า
            </Link>
          </Fragment>
        )}

        <Link
          to="/stock"
          className={
            "list-group-item list-group-item-action " +
            (realPath === "/stock"
              ? "list-group-item-light active"
              : "bg-light")
          }
        >
          สต๊อกสินค้า
        </Link>
        <Link
          to="/orders"
          className={
            "list-group-item list-group-item-action " +
            (realPath === "/orders"
              ? "list-group-item-light active"
              : "bg-light")
          }
        >
          รายการที่สั่ง
        </Link>
      </div>
    </div>
  );
}
