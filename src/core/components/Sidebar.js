import { React, Fragment } from "react";
import { Link } from "react-router-dom";
import { isAdmin } from "../../controllers/authapi";
export default function Sidebar() {
  return (
    <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="sidebar-heading">
        <Link to="/Home" className="brand-link">
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            style={{ opacity: ".8", height: "100px", width: "100px" }}
            alt="Logo"
          />
          <span className="sidebar-heading">HuayitangZI</span>
        </Link>
      </div>
      <div className="list-group list-group-flush">
        {isAdmin() && (
          <Fragment>
            <Link
              to="/admin/create/product"
              className="list-group-item list-group-item-action bg-light"
            >
              Add Product
            </Link>

            <Link
              to="/admin/create/product"
              className="list-group-item list-group-item-action bg-light"
            >
              Add Category
            </Link>
            <Link
              to="/admin/create/product"
              className="list-group-item list-group-item-action bg-light"
            >
              Manage Products
            </Link>
            <Link
              to="/admin/create/product"
              className="list-group-item list-group-item-action bg-light"
            >
              Manage Categories
            </Link>
          </Fragment>
        )}

        <Link
          href="#"
          className="list-group-item list-group-item-action bg-light"
        >
          Orders
        </Link>
        <Link
          href="#"
          className="list-group-item list-group-item-action bg-light"
        >
          Stock
        </Link>
      </div>
    </div>
  );
}
