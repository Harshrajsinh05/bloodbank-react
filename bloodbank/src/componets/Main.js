import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { Home } from "./Home";
import { Contact_us } from "./Contact_us";
import "./Main.css"; // Custom CSS file for additional styling
import { Details } from "./Details";
import { Card } from "./Card";
import SignupUser from "./SignupUser";
import SignupAdmin from "./SignupAdmin";
import LoginUser from "./LoginUser";
import LoginAdmin from "./LoginAdmin";
import { Admin } from "./Admin";
import { AdminUpdate } from "./AdminUpdate";
import { AdminData } from "./AdminData";
function Main() {
  return (
    <div className="container mt-4">
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              MyApp
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Signup">
                    Signup
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact_us />} />
          <Route path="/Signup" element={<Card />} />
          <Route path="/details/:name" element={<Details />} />
          <Route path="/Signup/admin" element={<SignupAdmin />} />
          <Route path="/Signup/user" element={<SignupUser />} />
          <Route path="/login/user" element={<LoginUser />} />
          <Route path="/login/admin" element={<LoginAdmin />} />
          <Route path="/admin/:username" element={<Admin />} />
          <Route path="/admin/update" element={<AdminUpdate />} />
          <Route path="/admin/data" element={<AdminData />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Main;
