import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import "./css/Books.css";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import GenreList from "./GenreList";
import TagList from "./TagList";

const API_URL = "http://localhost:8084/";

const Books = () => {
  const [editions, setEditions] = useState([]);
  const [startPage, setStartPage] = useState("");
  const [isActiveGenre, setIsActiveGenre] = useState(false);
  const [isActiveTag, setIsActiveTag] = useState(false);
  const [checkedGenres, setCheckedGenres] = useState([]);
  const [checkedTags, setCheckedTags]  = useState([]);
  const commaSeparetedList = checkedGenres.join(", ");
  const commaSeparetedTags  =checkedTags.join(", ");

 function filterBooks(editions, checkedGenres, checkedTags){
    
 }

  const handleClick = () => {
    setIsActiveGenre(!isActiveGenre);
  };
  const setCloseGenre = () => {
    setIsActiveGenre(false);
  };
  const handleClickTag = () => {
    setIsActiveTag(!isActiveTag);
  };
  const setCloseTag = () => {
    setIsActiveTag(false);
  };
  useEffect(() => {
    async function fetchBooks() {
      const response = await axios.get(API_URL + "books/all");
      setEditions(response.data);
    }
    fetchBooks();
  });
  return (
    <div>
      <h3>All books</h3>
      <div className="allBooks">
        <div className="card-columns-all">
          {editions.map((edition) => (
            <Card key={edition.id} className="card-style my-4">
              <Card.Img
                className="card-image"
                variant="top"
                src={`http://localhost:8084${edition.imageUrl}`}
              />
              <Card.Body className="card-body">
                <Card.Title className="overflow-text">
                  {edition.title}
                </Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>
        <div className="three-blocks py-4">
          <div
            className={`genres-block block-hidden px-3 ${
              isActiveGenre ? "active" : ""
            }`}
          >
            <GenreList
              isActiveGenre={isActiveGenre}
              setActiveGenre={setCloseGenre}
              setList={setCheckedGenres}
            />
          </div>
          <div
            className={`genres-block block-hidden px-3 ${
              isActiveTag ? "active" : ""
            }`}
          >
            <TagList
              isActiveTag={isActiveTag}
              setActiveTag={setCloseTag}
              setList={setCheckedTags}
            />
          </div>
          <div className="filter-block  px-3">
            <Form>
              <div className="genre-filter" onClick={handleClick}>
                <div className="left">Genres</div>
                <div className="right">
                  {checkedGenres.length > 0 ? commaSeparetedList : "Any other"}

                  <FontAwesomeIcon icon={faAngleRight} className="px-2 " />
                </div>
              </div>

              <div className="genre-filter" onClick={handleClickTag}>
                <div className="left">Tages</div>
                <div className="right">
                  {checkedTags.length > 0 ? commaSeparetedTags : "Any other"}
                  <FontAwesomeIcon icon={faAngleRight} className="px-2 " />
                </div>
              </div>
              <div className="select-between my-1">
                <div className="text">Quantity of pages</div>
                <div className="two-inputs">
                  <Input
                    type="text"
                    className="input-left my-2"
                    value={startPage}
                    onChange={(e) => setStartPage(e.target.value)}
                    placeholder="From"
                  />
                  <span className="text-muted">—</span>
                  <Input
                    type="text"
                    className="input-right my-2"
                    value={startPage}
                    onChange={(e) => setStartPage(e.target.value)}
                    placeholder="To"
                  />
                </div>
              </div>
              <div className="select-between my-1">
                <div className="text">Year of release</div>
                <div className="two-inputs">
                  <Input
                    type="text"
                    className="input-left my-2"
                    value={startPage}
                    onChange={(e) => setStartPage(e.target.value)}
                    placeholder="From"
                  />
                  <span className="text-muted">—</span>
                  <Input
                    type="text"
                    className="input-right my-2"
                    value={startPage}
                    onChange={(e) => setStartPage(e.target.value)}
                    placeholder="To"
                  />
                </div>
              </div>
              <div className="select-between my-1">
                <div className="text">Rating</div>
                <div className="two-inputs">
                  <Input
                    type="text"
                    className="input-left my-2"
                    value={startPage}
                    onChange={(e) => setStartPage(e.target.value)}
                    placeholder="From"
                  />
                  <span className="text-muted">—</span>
                  <Input
                    type="text"
                    className="input-right my-2"
                    value={startPage}
                    onChange={(e) => setStartPage(e.target.value)}
                    placeholder="To"
                  />
                </div>
              </div>
              <div className="two-buttons my-3">
                <button
                  type="submit"
                  className="btn text-secondary btn-block filter-button btn-left"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="btn btn-dark btn-block filter-button btn-right"
                >
                  Show
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
