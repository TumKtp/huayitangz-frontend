import { React } from "react";
import { Link, useLocation } from "react-router-dom";

import { isAdmin, signout } from "../../controllers/authapi";

export default function Header({ toggleSidebar }) {
  const realPath = useLocation().pathname;
  return (
    <nav className="navbar navbar-light bg-light navbar-expand-lg border-bottom ">
      <a class="navbar-brand" href="/home">
        <i
          className="fa fa-bars mr-3"
          aria-hidden="true"
          onClick={toggleSidebar}
          style={{ cursor: "pointer" }}
        />
        Huayitang 𝕫
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          {isAdmin() && (
            <li
              className={"nav-item " + (realPath === "/signup" ? "active" : "")}
            >
              <Link className="nav-link" to="/signup">
                เพิ่มผู้ใช้
              </Link>
            </li>
          )}
          <li
            className={
              "nav-item " + (realPath === "/create/patient" ? "active" : "")
            }
          >
            <Link to="/create/patient" className="nav-link">
              เพิ่มคนไข้
            </Link>
          </li>
          <li className={"nav-item " + (realPath === "/" ? "active" : "")}>
            <Link to="/" className="nav-link" onClick={signout}>
              ออกจากระบบ
            </Link>
          </li>
          {/* <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="navbarDropdown"
            >
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </li> */}
        </ul>
      </div>
    </nav>
  );
}
