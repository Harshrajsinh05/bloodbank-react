import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Details.css"; // Custom CSS file

export const Details = () => {
  const [data, setData] = useState(null);
  const { name } = useParams();
  console.log("Name parameter:", name);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:5000/details/${name}`
        );
        console.log("API Response:", response.data);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [name]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const bloodgroup = data.bloodgroup;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={`/images/${data.image}`}
            alt={data.name}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h1>{data.name}</h1>
          <p>
            <strong>Contact:</strong> {data.contact}
          </p>
          <p>
            <strong>Address:</strong> {data.address}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Available in ml </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(bloodgroup).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
