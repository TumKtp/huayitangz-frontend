import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="main-footer m-3">
      <strong>
        Copyright © 2021 <Link to="/home">คลินิกฮัวอุยตึ๊ง</Link>.
      </strong>

      <div className="float-right d-none d-sm-inline-block">
        <b>Version</b> 0.1.0
      </div>
    </footer>
  );
}
