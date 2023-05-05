import React, { useState, useRef } from "react";
import "./css/ImageUpload.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileResizer from "react-image-file-resizer";

const BackImageUploader = (props) => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageWidth, setImageWidth] = useState(null);
  const fileInput = useRef(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = function () {
      const img = new Image();
      img.onload = function () {
        setImageWidth(img.width);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
    //you can carry out any file validations here...
    if (imageWidth >= 550) {
      setImage(file);
      props.onBackImageChange(file);
      props.onImageBackTitleChange(file.name)
      
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
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
          <div style={{ position: "relative" }}>
            <img src={previewUrl} alt="image" className="back-image" />
            <button onClick={handleDeleteImage} className="delete-back-image">
              <FontAwesomeIcon icon={faTrash} className="trash-icon" />
            </button>
          </div>
        )}

        {showAlert && (
          <div
            className="alert-image"
          >
            The max width should be not less than 1450px
          </div>
        )}
      </div>
    </div>
  );
};
export default BackImageUploader;
