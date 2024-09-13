import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./SignupAdmin.css"; // Import CSS file

function SignupAdmin() {
  const [organizationname, setorganizationname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/signupadmin",
        {
          organizationname,
          username,
          email,
          password,
        }
      );
      if (response.data.message) {
        alert("Admin signed up successfully.");
        setorganizationname("");
        setUsername("");
        setEmail("");
        setPassword("");
      } else if (response.data.uname_error) {
        alert(response.data.uname_error);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Organization name not found.");
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Admin Sign Up</h1>
      <form className="signup-form" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Organization Name"
          value={organizationname}
          onChange={(e) => setorganizationname(e.target.value)}
          className="signup-input"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="signup-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signup-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signup-input"
        />
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      <div className="login-link-container">
        Already have an account?{" "}
        <Link to={"/login/admin"} className="login-link">
          Log in
        </Link>
      </div>
    </div>
  );
}

export default SignupAdmin;
