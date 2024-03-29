import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./css/BookInfo.css";
import { Button, Image } from "react-bootstrap";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RatingModal from "./RatingModal";
import ReviewPage from "./ReviewPage";
import CommentForm from "./CommentForm";
import Dropdown from "react-bootstrap/Dropdown";
import authHeader from "../services/auth-header";


const API_URL = "http://localhost:8084/";

const BookInfo = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const [showRateModal, setShowRateModal] = useState(false);
  const [avgRating, setAvgRating] = useState("");
  const [showDrop, setShowDrop] = useState(false);
  const [listTypes, setListTypes] = useState([]);
  const [selectedListType, setSelectedListType] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleShowModal = () => {
    setShowRateModal(true);
  };

  const handleChangeDropdown = () => {
    setShowDrop(!showDrop);
  };
  const handleCloseModal = () => {
    setShowRateModal(false);
  };

  const createBookHandler = async (e, type) => {
    e.preventDefault();

    await axios
      .post(
        API_URL + "api/booklists/add",
        {
          listType: type,
          startDate: new Date(),
          book: {
            id: book.id,
          },
          user: {
            id: user.id,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.accessToken,
          },
        }
      )
      .then((response) => {
        console.log("Book added to list successfully:", response.data);
        // Reset form inputs
      })
      .catch((error) => {
        console.error("Error adding book to list: ", error);
      });
  };

  useEffect(() => {
    async function fetchLists() {
      await axios
        .get(`http://localhost:8084/api/booklists/listtypes`)
        .then((response) => {
          setListTypes(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchLists();
  }, []);

  useEffect(() => {
    // Check if the user exists
    if (user && user.id) {
      // User exists, fetch the data
      function fetchLists() {
        axios
          .get(
            `http://localhost:8084/api/booklists/getType?userId=${user.id}&bookId=${id}`
          )
          .then((response) => {
            setSelectedListType(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      
      // Call the fetchLists function
      fetchLists();
    }
  }, [user, id]);
  
  useEffect(() => {
    async function fetchBooks() {
      await axios
        .get(`http://localhost:8084/books/book/${id}`)
        .then((response) => {
          setBook(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchBooks();
  }, []);
  useEffect(() => {
    async function fetchBooks() {
      await axios
        .get(`http://localhost:8084/ratings/getAvgRating?bookId=${id}`)
        .then((response) => {
          console.log(response.data);
          setAvgRating(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchBooks();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleListTypeSelect = (listType) => {
    setSelectedListType(listType);
  };
  return (
    <>
      {book ? (
        <div style={{ height: "1000px" }}>
          <div
            className="media-background"
            style={{
              backgroundImage: `url(http://localhost:8084${book.imageUrl})`,
            }}
          ></div>

          <div className="container container-responsive">
            <div className="media-container">
              <div className="media-sidebar">
                <div className="section">
                  <div className="media-sidebar__cover">
                    <Image
                      className="image-preview"
                      src={`http://localhost:8084${book.editions[0].imageUrl}`}
                      alt="Your image"
                      fluid
                    />
                  </div>
                </div>
                <Dropdown
                  onClick={handleChangeDropdown}
                  className={showDrop ? "show-drop" : ""}
                >
                  <Dropdown.Toggle
                    className="media-button btn btn-dark py-1"
                    variant="success"
                    id="dropdown-basic"
                  >
                    {selectedListType ? selectedListType : "Select List Type"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {listTypes.map((type) => (
                      <Dropdown.Item
                        key={type}
                        onClick={(e) => {
                          createBookHandler(e, type);
                          setSelectedListType(type);
                        }}
                      >
                        {type}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="media-content">
                <div className="media-name section">
                  <div className="media-name-body">
                    <div className="media-name__main">{book.title}</div>
                  </div>
                  <div className="media-rating media-rating__lg">
                    <div className="star">
                      <FontAwesomeIcon icon={faStar} className="px-2" />
                    </div>
                    <div className="rating-value">{avgRating}</div>
                    <Button
                      onClick={handleShowModal}
                      className="btn btn-light mx-2 rate-button px-3"
                    >
                      Rate
                    </Button>
                    <RatingModal
                      show={showRateModal}
                      onHide={handleCloseModal}
                      bookId={book.id}
                    />
                  </div>
                </div>
                <div className="tabs paper">
                  <div className="media-tabs">
                    <div className="tabs__wrapper">
                      <ul className="tabs__list">
                        <li
                          className={`tabs__item ${
                            activeTab === "info" ? "tabs__item_active" : ""
                          }`}
                          onClick={() => handleTabClick("info")}
                        >
                          Information
                        </li>
                        <li
                          className={`tabs__item ${
                            activeTab === "comments" ? "tabs__item_active" : ""
                          }`}
                          onClick={() => handleTabClick("comments")}
                        >
                          Comments
                        </li>
                        <li
                          className={`tabs__item ${
                            activeTab === "reviews" ? "tabs__item_active" : ""
                          }`}
                          onClick={() => handleTabClick("reviews")}
                        >
                          Review
                        </li>
                        <li
                          className={`tabs__item ${
                            activeTab === "authors" ? "tabs__item_active" : ""
                          }`}
                          onClick={() => handleTabClick("authors")}
                        >
                          Authors
                        </li>
                        <div
                          className="tabs__line"
                          style={{
                            display: "block",
                            width:
                              activeTab === "info"
                                ? "80px"
                                : activeTab === "comments"
                                ? "70px"
                                : activeTab === "reviews"
                                ? "45px"
                                : activeTab === "authors"
                                ? "55px"
                                : "",
                            transform:
                              activeTab === "info"
                                ? "translateX(0px)"
                                : activeTab === "comments"
                                ? "translateX(100px)"
                                : activeTab === "reviews"
                                ? "translateX(190px)"
                                : activeTab === "authors"
                                ? "translateX(255px)"
                                : "",
                          }}
                        ></div>
                      </ul>
                    </div>
                  </div>
                  <div
                    className={`tabs-content ${
                      activeTab === "info" ? "tabs__content_show" : ""
                    }`}
                  >
                    <p className="mx-4 my-4">{book.editions[0].description}</p>
                    <div className="media-tags">
                      {book.tags.map((tag) => (
                        <a href="" key={tag.id} className="media-tag-item">
                          {tag.name}
                        </a>
                      ))}
                      {book.genres.map((tag) => (
                        <a href="" key={tag.id} className="media-tag-item">
                          {tag.name}
                        </a>
                      ))}
                    </div>
                    <div className="pages mx-4">
                      {book.quantityOfPages} pages, Paperback
                    </div>
                    <div className="pages mx-4 my-2">
                      First published in {book.yearOfWriting}
                    </div>
                  </div>
                  <div
                    className={`tabs-content ${
                      activeTab === "comments" ? "tabs__content_show" : ""
                    }`}
                  >
                    <div className="mx-4 my-4">
                      <CommentForm bookId={book.id} />
                    </div>
                  </div>
                  <div
                    className={`tabs-content ${
                      activeTab === "reviews" ? "tabs__content_show" : ""
                    }`}
                  >
                    <div className="mx-3 my-3">
                      <ReviewPage bookId={book.id} />
                    </div>
                  </div>
                  <div
                    className={`tabs-content ${
                      activeTab === "authors" ? "tabs__content_show" : ""
                    }`}
                  >
                    <p className="mx-4 my-4">Authors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>{/* Render a loading spinner or message here */}</div>
      )}
    </>
  );
};

export default BookInfo;
