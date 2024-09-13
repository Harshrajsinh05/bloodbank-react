import React from "react";
import { useState } from "react";
import axios from "axios";
import "./AdminUpdate.css"; // Import the CSS file

export const AdminUpdate = () => {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [bloodgroup, setBloodgroup] = useState({ type: "", left: "" });

  const handleSignup = async (e) => {
    e.preventDefault();
    const organizationname = sessionStorage.getItem("organizationname");
    if (!organizationname) {
      alert("No organization associated with this admin.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/adminupdate",
        {
          organizationname,
          email,
          contact,
          address,
          bloodgroup,
        }
      );
      if (response.data.message) {
        alert(response.data.message);
        setEmail("");
        setContact("");
        setAddress("");
        setBloodgroup({ type: "", left: "" });
      } else {
        alert("Failed to update admin.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("No data updated.");
    }
  };

  return (
    <div className="form-container">
      <h2>Update Admin Information</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Blood Group Type (e.g., A, B, AB, O)"
          value={bloodgroup.type}
          onChange={(e) =>
            setBloodgroup({ ...bloodgroup, type: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Enter Left Amount (e.g., 200, 250)"
          value={bloodgroup.left}
          onChange={(e) =>
            setBloodgroup({ ...bloodgroup, left: e.target.value })
          }
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};
