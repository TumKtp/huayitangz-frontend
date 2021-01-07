import { React, Fragment } from "react";
import { Link } from "react-router-dom";
import { isAdmin } from "../../controllers/authapi";
export default function Sidebar() {
  return (
    <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="sidebar-heading d-flex justify-content-center ">
        <Link to="/Home" className="text-decoration-none ">
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
        {isAdmin() && (
          <Fragment>
            <Link
              to="/admin/orders"
              className="list-group-item list-group-item-action bg-light"
            >
              Manage Orders
            </Link>
            <Link
              to="/admin/products"
              className="list-group-item list-group-item-action bg-light"
            >
              Manage Products
            </Link>
            <Link
              to="/admin/categories"
              className="list-group-item list-group-item-action bg-light"
            >
              Manage Categories
            </Link>
            <Link
              to="/admin/users"
              className="list-group-item list-group-item-action bg-light"
            >
              Manage Users
            </Link>
            <Link
              to="/admin/create/product"
              className="list-group-item list-group-item-action bg-light"
            >
              Add Product
            </Link>
            <Link
              to="/admin/create/category"
              className="list-group-item list-group-item-action bg-light"
            >
              Add Category
            </Link>
          </Fragment>
        )}

        <Link
          to="/stock"
          className="list-group-item list-group-item-action bg-light"
        >
          Stock
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
