import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";
export const Home = () => {
  const [data, setData] = useState([]);
  async function print() {
    // Marking the function as async
    try {
      const response = await axios.get("http://localhost:5000/"); // Making the request and storing the response

      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    print();
  }, []);

  return (
    <>
      <div className="row">
        {data.map((item, index) => (
          <div className="col-md-4">
            <div className="card mb-4">
              <img
                src={`/images/${item.image}`}
                className="card-img-top"
                alt="card 1"
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.contact}</p>
                <p className="card-text">{item.address}</p>
                <Link
                  to={`/details/${encodeURIComponent(item.name)}`}
                  className="btn btn-primary"
                >
                  Go somewhere
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div></div>
    </>
  );
};
