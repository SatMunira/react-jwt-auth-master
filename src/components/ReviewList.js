import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "react-bootstrap";
import "./css/Review.css";
import StarRating from "./StarRating";

const API_URL = "http://localhost:8084/";

const ReviewList = ({ bookId }) => {
  const [reviewList, setReviewList] = useState([]);
  useEffect(() => {
    axios
      .get(API_URL + `reviews/getReviews?bookId=${bookId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setReviewList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const createMarkup = (content) => ({ __html: content });
  return (
    <>
      <div>
        {reviewList.length === 0 ? (
          <p>No reviews available.</p>
        ) : (
          <div>
            {reviewList.map((review) => (
              <div key={review.id} className="flex-review">
                <Image
                  src={`http://localhost:8084/images/user.jpg`}
                  alt="Circle Image"
                  className="user-image"
                  roundedCircle
                />
                <div >
                  <div className="my-2">
                    <StarRating value={review.rating.value} />
                  </div>
                  <div className="mx-2">
                    <div>
                      <div className="user-weight">{review.user.username}</div>
                    </div>
                    <div className="date-post"> {review.datePost}</div>
                    <div
                      style={{ color: "rgb(30, 25, 21)" }}
                      dangerouslySetInnerHTML={createMarkup(review.content)}
                    />
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewList;
