import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import "./css/Review.css";
import StarRating from "./StarRating";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import ReviewList from "./ReviewList";

const API_URL = "http://localhost:8084/";

const ReviewPage = ({ onSubmit, bookId }) => {
  const [content, setContent] = useState("");
  const [ratingValue, setRatingValue] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const [error, setError] = useState("");
  const [showContent, setShowContent] = useState(false);
  const editorRef = useRef(null);

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote"],
      [{ align: [] }],
      ["clean"],
    ],
    
    // Добавляем опцию цитирования
  };

  useEffect(() => {
    if (user) {
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
      } else {
        console.log("Error submitting rating");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const handleChange = (value) => {
    setContent(value);
  };
  const requestBody = {
    content: content,
    value: ratingValue,
    datePost: new Date()
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        API_URL + `reviews/newReview?userId=${user.id}&bookId=${bookId}`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.accessToken,
          },
        }
      );

      if (response.data) {
        console.log("Rating submitted successfully");
      } else {
        console.log("Error submitting rating");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <>
      <div className="write d-flex align-items-center">
        <h6 className="mx-2 my-2 review-label" onClick={toggleContent}>
          Write a review
          <FontAwesomeIcon
            className="mx-3"
            icon={showContent ? faChevronUp : faChevronDown}
          />
        </h6>
      </div>
      <Collapse in={showContent}>
        <Form onSubmit={handleSubmit} className="w-100">
          <div>
            <StarRating
              value={ratingValue}
              onChange={setRatingValue}
              onSubmit={handleSubmit}
            />
          </div>
          <Form.Group controlId="formReviewInput">
            <div className="quill-container">
              <ReactQuill
                ref={editorRef}
                value={content}
                onChange={handleChange}
                placeholder="Write a review..."
                modules={modules}
                className="quill-editor"
              />
              <Button
                variant="btn btn-dark my-4 py-1"
                type="submit"
                onClick={handleSend}
              >
                Submit
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Collapse>
      <div className="mx-2">
        <ReviewList bookId={bookId}/>
      </div>
    </>
  );
};

export default ReviewPage;
