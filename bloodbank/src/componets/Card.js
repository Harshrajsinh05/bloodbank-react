import React from "react";
import user from "./user.jpeg";
import admin from "./hospital.jpeg";
import "./Card.css";

export const Card = () => {
  return (
    <div className="card-container">
      <div className="row">
        <div className="col-md-6">
          <div className="card card_c">
            <a href="/Signup/user">
              <img src={user} alt="user" className="card-image" />
              <p>User</p>
            </a>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card card_c">
            <a href="/Signup/admin">
              <img src={admin} alt="admin" className="card-image" />
              <p>Organization</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
