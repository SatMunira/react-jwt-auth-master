import React, { useState, useEffect } from "react";
import ImageUploader from "./ImageUploader";
import BackImageUploader from "./BackImageUpload";
import "./css/ImageUpload.css";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import axios from "axios";
import authHeader from "../services/auth-header";
import Dropdown from "./Dropdown";

const NewBookForm = () => {
  const [authorsList, setAuthorsList] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [publisherList, setPublisherList] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [image, setImage] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageBack, setBackImage] = useState(null);
  const [imageBackTitle, setBackImageTitle] = useState(null);
  const [title, setTitle] = useState("");
  const [alternativeTitle, setAlternativeTitle] = useState("");
  const [dateOfManufacture, setDateOfManufacture] = useState("");
  const [description, setDescription] = useState("");

  const API_URL = "http://localhost:8084/";

  const edition = {
    title: title,
    alternativeTitle: alternativeTitle,
    dateOfManufacture: dateOfManufacture,
    description: description,
  };

  const book = {
    publishers: publishers,
    authors: authors,
    genres: genres,
    
  };

  const formData = new FormData();
  formData.append("imageQwe", image);
  formData.append("BackQwe", imageBack);
  formData.append("book", book);

  const createBookHandler = async (e) => {
    e.preventDefault();

    await axios
      .post(
        API_URL + "books/createBook",
        {
          imageQwe: image,
          BackQwe: imageBack,
          book: JSON.stringify(book),
          editionQwe: JSON.stringify(edition)
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        console.log("Book added successfully:", response.data);
        // Reset form inputs
      })
      .catch((error) => {
        console.error("Error adding book: jhncdkbjknd mdb", error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + "authors/listAuthors", {
          headers: authHeader(),
        });
        setAuthorsList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + "genres/genreList", {
          headers: authHeader(),
        });
        setGenreList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + "publishers/allPublishers", {
          headers: authHeader(),
        });
        setPublisherList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleImageChange = (newImage) => {
    setImage(newImage);
  };
  const handleImageTitleChange = (newImageTitle) => {
    setImageTitle(newImageTitle);
  };
  const handleBackImageChange = (newBackImage) => {
    setBackImage(newBackImage);
  };
  const handleBackImageTitleChange = (newBackImageTitle) => {
    setBackImageTitle(newBackImageTitle);
  };

  return (
    <div className=" container my-4 bookForm">
      <Form>
        Main image of book
        <ImageUploader
          onImageChange={handleImageChange}
          onImageTitleChange={handleImageTitleChange}
        />
        Background image
        <BackImageUploader
          onBackImageChange={handleBackImageChange}
          onImageBackTitleChange={handleBackImageTitleChange}
        />
        Original name
        <Input
          type="text"
          className="input-form my-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        Alternative name
        <Input
          type="text"
          className="input-form my-2"
          value={alternativeTitle}
          onChange={(e) => setAlternativeTitle(e.target.value)}
        />
        <div className="inline-group">
          <div>
            Release date
            <Input
              type="date"
              className="input-form-small my-2 "
              value={dateOfManufacture}
              onChange={(e) => setDateOfManufacture(e.target.value)}
            />
          </div>
          <div className="mx-4">
            Genre of book
            <Dropdown
              isSearchable
              isMulti
              placeHolder="Select..."
              options={genreList}
              onChange={(id) => setGenres(id)}
            />
          </div>
        </div>
        <div>
          Authors
          <Dropdown
            isSearchable
            isMulti
            placeHolder="Select..."
            options={authorsList}
            onChange={(id) => setAuthors(id)}
          />
          Publisher
          <Dropdown
            isSearchable
            isMulti
            placeHolder="Select..."
            options={publisherList}
            onChange={(id) => setPublishers(id)}
          />
          <label htmlFor="text-input">Description:</label>
          <textarea
            id="text-input"
            name="text-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
            className="input-form"
            cols="50"
          ></textarea>
          <button
            type="submit"
            onClick={createBookHandler}
            className="btn btn-dark my-1 btn-block my-3 create-book"
          >
            Create book
          </button>
        </div>
      </Form>
    </div>
  );
};

export default NewBookForm;
