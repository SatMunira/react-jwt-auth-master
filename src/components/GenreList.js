import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./css/Books.css";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import authHeader from "../services/auth-header";
import axiosInstance from './axiosInstance';

const API_URL = "http://localhost:8084/";

const GenreList = ({ setActiveGenre, setList }) => {
  const [genres, setGenres] = useState([]);
  const [checkedGenres, setCheckedGenres] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleCheckboxChange = (event) => {
    const genreId = event.target.value;
    const isChecked = event.target.checked;
    setCheckedGenres((prevState) => ({
      ...prevState,
      [genreId]: isChecked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const checkedGenreIds = Object.entries(checkedGenres)
      .filter(([genreId, isChecked]) => isChecked)
      .map(([genreId, isChecked]) => genreId);
    console.log("Checked genre IDs:", checkedGenreIds);
    setList(checkedGenreIds);
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(API_URL + "genres/genreList", {
          headers: authHeader(),
        });
        setGenres(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, []);

  const filteredGenres = genres.filter((genre) =>
    genre.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div className="genre-filter">
          <div className="left">
            <FontAwesomeIcon
              icon={faArrowLeft}
              onClick={setActiveGenre}
              className="px-2 "
            />
            Genres
          </div>
          <div className="right text-rest" onClick={() => setCheckedGenres([])}>
            Reset
          </div>
        </div>
        <div className="searchGenre">
          <Input
            type="text"
            className="search-genre-input w-100 my-2"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search genres"
          />
        </div>
        {filteredGenres.map((genre) => (
          <div key={genre.name} className="genres-checkBox">
            <input
              type="checkbox"
              value={genre.name}
              checked={checkedGenres[genre.name] || false}
              onChange={handleCheckboxChange}
            />
            <div className="px-2">{genre.name}</div>
          </div>
        ))}

        <div className="two-buttons my-3">
          <button
            type="submit"
            onClick={setActiveGenre}
            className="btn text-secondary btn-block choose-button btn-left"
          >
            Choose
          </button>
        </div>
      </Form>
    </div>
  );
};

export default GenreList;
