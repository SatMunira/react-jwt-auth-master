import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./css/Books.css";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import authHeader from "../services/auth-header";

const API_URL = "http://localhost:8084/";

const TagList = ({ setActiveTag, setListTags }) => {
  const [tags, setTags] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleCheckboxChange = (event) => {
    const tagId = event.target.value;
    const isChecked = event.target.checked;
    setCheckedTags((prevState) => ({
      ...prevState,
      [tagId]: isChecked,
    }));
  };
  const filteredGenres = tags.filter((genre) =>
    genre.name.toLowerCase().includes(searchInput.toLowerCase())
  );
 

  const handleSubmit = (event) => {
    event.preventDefault();
    const checkedTagIds = Object.entries(checkedTags)
      .filter(([tagId, isChecked]) => isChecked)
      .map(([tagId, isChecked]) => tagId);
    console.log("Checked genre IDs:", checkedTagIds);
   
    setListTags(checkedTagIds);
  };
  

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(API_URL + "tags/all", {
          headers: authHeader(),
        });
        setTags(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, []);
  


  return (
    <div className="tag-block">
      <Form onSubmit={handleSubmit}>
        <div className="genre-filter">
          <div className="left">
            <FontAwesomeIcon
              icon={faArrowLeft}
              onClick={setActiveTag}
              className="px-2 "
            />
            Tags
          </div>
          <div className="right text-rest" onClick={() => setCheckedTags([])}>
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
        <div className="tagg-block">
        {filteredGenres.map((t) => (
          <div key={t.name} className="genres-checkBox">
            <input
              type="checkbox"
              value={t.name}
              checked={checkedTags[t.name] || false}
              onChange={handleCheckboxChange}
            />
            <div className="px-2">{t.name}</div>
          </div>
        ))}
        </div>

        <div className="two-buttons my-3">
          <button
            type="submit"
            onClick={setActiveTag}
            className="btn text-secondary btn-block choose-button btn-left"
          >
            Choose
          </button>
        </div>
      </Form>
    </div>
  );
};

export default TagList;
