import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import StarRating from "./StarRating";
import authHeader from "../services/auth-header";
import axiosInstance from './axiosInstance';

const API_URL = "http://localhost:8084/";

function RatingModal({ bookId, show, onHide }) {
  const [ratingValue, setRatingValue] = useState(0);
  const [error, setError] = useState(null);
  const [rated, setRated] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const rating = {
    value: ratingValue,
  };

  useEffect(() => {
    if(user){
      axios
      .get(API_URL + `ratings/getRating?userId=${user.id}&bookId=${bookId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.accessToken,
        },
      })
      .then((response) => {
        setRatingValue(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, []);

  const handleSubmit = async (starValue) => {
    try {
      setRatingValue(starValue);

      // User has not rated the book, submit the rating
      const response = await axios.post(
        API_URL + `ratings/newRating?userId=${user.id}&bookId=${bookId}`,
        { value: starValue },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.accessToken,
          },
        }
      );

      if (response.data) {
        console.log("Rating submitted successfully");
        onHide();
      } else {
        console.log("Error submitting rating");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="sm" className="modal-cont">
      <Modal.Body className="text-center">
        <StarRating
          value={ratingValue}
          onChange={setRatingValue}
          onSubmit={handleSubmit}
        />
        {ratingValue && <div>Your rating is: {ratingValue}</div>}
        {error && <div className="text-danger">{error}</div>}
      </Modal.Body>

    </Modal>
  );
}
export default RatingModal;
