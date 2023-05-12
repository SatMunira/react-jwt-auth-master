import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import "./css/Books.css";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { Link } from "react-router-dom";

import GenreList from "./GenreList";
import TagList from "./TagList";

const API_URL = "http://localhost:8084/";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [isActiveGenre, setIsActiveGenre] = useState(false);
  const [isActiveTag, setIsActiveTag] = useState(false);
  const [checkedGenres, setCheckedGenres] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

  const [yearStart, setYearStart] = useState("");
  const [yearEnd, setYearEnd] = useState("");

  const [pageStart, setPageStart] = useState("");
  const [pageEnd, setPageEnd] = useState("");

  const [searchInput, setSearchInput] = useState("");

  const commaSeparetedList = checkedGenres.join(", ");
  const commaSeparetedTags = checkedTags.join(", ");

  const handleReset = (e) => {
    e.preventDefault();
    setCheckedGenres([]);
    setCheckedTags([]);
    setYearStart("");
    setYearEnd("");
    setPageStart("");
    setPageEnd("");
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  function filterBooks(
    books,
    checkedGenres,
    checkedTags,
    yearStart,
    yearEnd,
    pageStart,
    pageEnd
  ) {
    return books.filter((book) => {
      const isEqualTitle =
        searchInput.length === 0 ||
        book.title.toLowerCase().includes(searchInput.toLowerCase());

      const isEqualPages =
        pageStart.length === 0 ||
        pageEnd.length === 0 ||
        (book.quantityOfPages >= pageStart && book.quantityOfPages <= pageEnd);

      const isEqualGenres =
        checkedGenres.length === 0 ||
        checkedGenres.every((checkedGenre) =>
          book.genres.some((genre) => genre.name === checkedGenre)
        );

      const isEqualTags =
        checkedTags.length === 0 ||
        checkedTags.every((checkedTag) =>
          book.tags.some((tag) => tag.name === checkedTag)
        );

      const isBetweenDate =
        yearStart.length === 0 ||
        yearEnd.length === 0 ||
        (book.yearOfWriting >= yearStart && book.yearOfWriting <= yearEnd);

      return (
        isEqualGenres &&
        isEqualTags &&
        isBetweenDate &&
        isEqualPages &&
        isEqualTitle
      );
    });
  }

  const filteredBooks = filterBooks(
    books,
    checkedGenres,
    checkedTags,
    yearStart,
    yearEnd,
    pageStart,
    pageEnd
  );

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
      setBooks(response.data);
    }

    fetchBooks();
  }, []);
  return (
    <div>
      <h4>All books</h4>
      <Form>
        <Input
          type="text"
          className="input-search mx-1 my-2"
          placeholder="Search..."
          value={searchInput}
          onChange={handleSearchChange}
        />
      </Form>
      <div className="allBooks">
        <div className="card-columns-all">
          {filteredBooks.map((book) => (
            <Link key={book.id} to={`/book/${book.id}`} className="card-link">
            <Card  className="card-style my-4">
              <Card.Img
                className="card-image"
                variant="top"
                src={`http://localhost:8084${book.editions[0].imageUrl}`}
              />
              <Card.Body className="card-body">
                <Card.Title className="overflow-text">
                  {book.title}
                </Card.Title>
              </Card.Body>
            </Card>
          </Link>
          ))}
        </div>
        <div className="three-blocks py-4 my-3">
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
              setListTags={setCheckedTags}
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
                    placeholder="From"
                    value={pageStart}
                    onChange={(e) => setPageStart(e.target.value)}
                  />
                  <span className="text-muted">—</span>
                  <Input
                    type="text"
                    className="input-right my-2"
                    placeholder="To"
                    value={pageEnd}
                    onChange={(e) => setPageEnd(e.target.value)}
                  />
                </div>
              </div>
              <div className="select-between my-1">
                <div className="text">Year of release</div>
                <div className="two-inputs">
                  <Input
                    type="text"
                    className="input-left my-2"
                    value={yearStart}
                    onChange={(e) => setYearStart(e.target.value)}
                    placeholder="From"
                  />
                  <span className="text-muted">—</span>
                  <Input
                    type="text"
                    className="input-right my-2"
                    value={yearEnd}
                    onChange={(e) => setYearEnd(e.target.value)}
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
                    placeholder="From"
                  />
                  <span className="text-muted">—</span>
                  <Input
                    type="text"
                    className="input-right my-2"
                    placeholder="To"
                  />
                </div>
              </div>
              <div className="two-buttons my-3">
                <button
                  type="submit"
                  onClick={handleReset}
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
