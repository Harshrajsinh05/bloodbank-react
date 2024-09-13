import React from "react";
import update from "./update.jpg";
import "./Admin.css";

export const Admin = () => {
  const organizationname = sessionStorage.getItem("organizationname");
  return (
    <div className="card-container">
      <div className="row">
        <div className="col-md-6">
          <div className="card card_a">
            <a href="/admin/update">
              <img src={update} alt="user" className="card-image" />
              <p>Update</p>
            </a>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card card_a">
            <a href="/admin/data">
              <img src={update} alt="admin" className="card-image" />
              <p>Check</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
