import { React } from "react";
import { Link, useLocation } from "react-router-dom";

import { isAdmin, signout } from "../../controllers/authapi";

export default function Header({ toggleSidebar }) {
  const realPath = useLocation().pathname;
  const currentTab = (path) => {
    if (realPath === path) {
      return { color: "#20639B" };
    } else {
      return { color: "#000000" };
    }
  };
  return (
    <nav className="navbar  navbar-expand-lg navbar-light bg-light border-bottom ">
      <div className="navbar-brand">
        {/* <img
          src={process.env.PUBLIC_URL + "/logo.png"}
          style={{ cursor: "pointer", width: "30px" }}
          className="d-inline-block align-top mr-2"
          onClick={toggleSidebar}
        /> */}
        <i
          className="fa fa-bars mr-3"
          aria-hidden="true"
          onClick={toggleSidebar}
          style={{ cursor: "pointer" }}
        ></i>
        <Link
          style={currentTab("/home")}
          to="/home"
          className="text-decoration-none"
        >
          Huayitang 𝕫
        </Link>
      </div>

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
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signup"
                style={currentTab("/signup")}
              >
                Signup
              </Link>
            </li>
          )}
          <li className="nav-item">
            <Link
              to="/create/patient"
              className="nav-link"
              style={currentTab("/create/patient")}
            >
              New Patient
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={signout}>
              Signout
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

    // <nav className="main-header navbar navbar-expand navbar-white navbar-light">
    //   {/* Left navbar links */}
    //   <ul className="navbar-nav">
    //     <li className="nav-item">
    //       <Link className="nav-link" data-widget="pushmenu" role="button">
    //         <i className="fas fa-bars" />
    //       </Link>
    //     </li>

    //     <li className="nav-item d-none d-sm-inline-block">
    //       <Link to="/Home" className="nav-link">
    //         Home
    //       </Link>
    //     </li>
    //     <li className="nav-item d-none d-sm-inline-block">
    //       <Link to="/Cart" className="nav-link">
    //         Cart
    //       </Link>
    //     </li>
    //   </ul>

    //   {/* Right navbar links */}
    //   <ul className="navbar-nav ml-auto">
    //     <li className="nav-item">
    //       <Link to="/Signup" className="nav-link">
    //         Signup
    //       </Link>
    //     </li>
    //     <li className="nav-item">
    //       <Link to="/" className="nav-link" onClick={signout}>
    //         Signout
    //       </Link>
    //     </li>
    //     <li className="nav-item">
    //       <Link className="nav-link" data-widget="fullscreen" role="button">
    //         <i className="fas fa-expand-arrows-alt" />
    //       </Link>
    //     </li>
    //   </ul>
    // </nav>
  );
}
