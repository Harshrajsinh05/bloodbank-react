import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./SignupUser.css"; // Import CSS file

function SignupUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/signupuser",
        {
          username,
          email,
          password,
        }
      );
      console.log(response.data);
      if (response.data.message) {
        alert("User signed up successfully.");
        setUsername("");
        setEmail("");
        setPassword("");
      } else if (response.data.uname_error) {
        alert(response.data.uname_error);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert(error);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      <form className="signup-form" onSubmit={handleSignup}>
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
        <Link to={"/login/user"} className="login-link">
          Log in
        </Link>
      </div>
    </div>
  );
}

export default SignupUser;
