import React, { useEffect, useState } from "react";
import Base from "../../core/Base";
import { isAutheticated } from "../../controllers/authapi";
import { getAllUsers } from "../controllers/authapi";

export default function ManageUsers() {
  const { user, token } = isAutheticated();
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const data = await getAllUsers(user, token);
        console.log(data);
        if (data.error) throw data.error;
        setUsers(data);
      } catch (e) {
        setError(e);
        console.log(e);
      }
    };
    fetchAllUsers();
  }, []);

  const renderTable = () => (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Created At</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          return (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
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
        <strong>เกิดข้อผิดพลาด!</strong> {error}
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
        <div className="text-center display-4 mb-3 col-12">All categories</div>
        {renderTable()}
      </div>
    </Base>
  );
}
