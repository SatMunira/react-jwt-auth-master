import React, { useState, useRef } from "react";
import "./css/ImageUpload.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosInstance from './axiosInstance';

const ImageUploader = (props) => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInput = useRef(null);

  const handleFile = (file) => {
    //you can carry out any file validations here...
    setImage(file);
    props.onImageChange(file);

    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDeleteImage = (e) => {
    e.preventDefault();
    setImage(null);
    setPreviewUrl("");
  };

  const handleOnDrop = (event) => {
    //prevent the browser from opening the image
    event.preventDefault();
    event.stopPropagation();
    //let's grab the image file
    let imageFile = event.dataTransfer.files[0];
    handleFile(imageFile);
  };

  return (
    <div className="wrapper">
      <div className="inline-group">
        <div
          className="drop_zone"
          onDragOver={handleDragOver}
          onDrop={handleOnDrop}
          onClick={() => fileInput.current.click()}
        >
          <div className="drag-text text-center my-auto">
            Click to select or drag and drop image here
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInput}
            hidden
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>
        {previewUrl && (
          <div className="image" style={{ position: "relative" }}>
            <img src={previewUrl} alt="image" className="image" />
            <button onClick={handleDeleteImage} className="delete-image">
              <FontAwesomeIcon icon={faTrash} className="trash-icon" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ImageUploader;
