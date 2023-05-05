import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import "./css/Book.css";
const API_URL = "http://localhost:8084/";

const NewBookList = () => {
  const [editions, setEditions] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      const response = await axios.get(API_URL + "books/latest");
      setEditions(response.data);
    }
    fetchBooks();
  });
  return (
    <div>
      <h4>Latest Books</h4> <div className="latest-block">
      <div className="card-columns">
        {editions.map((edition) => (
          <Card key={edition.id} className="card-style my-3" >
            <Card.Img
              className="card-image"
              variant="top"
              src={`http://localhost:8084${edition.imageUrl}`}
            />
            <Card.Body className="card-body">
              <Card.Title className="overflow-text">{edition.title}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
      </div>
    </div>
  );
};

export default NewBookList;
