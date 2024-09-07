import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const Details = () => {
  const [data, setData] = useState(null);
  const { name } = useParams(); // Get the name from the URL

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:5000/details/${name}`
        );
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [name]);

  return (
    <div>
      {data ? (
        <div>
          <h1>{data.name}</h1>
          <img src={`/images/${data.image}`} alt={data.name} />
          <p>Contact: {data.contact}</p>
          <p>Address: {data.address}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
