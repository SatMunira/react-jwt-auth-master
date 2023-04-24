import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "./css/LoginModal.css";

import { Button } from "react-bootstrap";

const API_URL = "http://localhost:8084/forgot_password";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const GetEmail = ({ forgotModal, onClose }) => {
  const [email, setEmail] = useState("");
  const [dataRes, setDataRes] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const form = useRef();
  const checkBtn = useRef();

  const sendAlertHandler = () => {
    setDataRes(
      "If we have your email in datebase the link to reset your password will come in few minutes"
    );
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const setData = (email) => {
    axios
      .post(
        API_URL + "/getEmail",
        { email: email },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((response) => {
        console.log(response.data);
      });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      setData(email);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  if (!forgotModal) {
    return null;
  }
  return (
    <>
      {forgotModal && (
        <Modal
          show={forgotModal}
          onHide={onClose}
          backdrop="static"
          keyboard={false}
          className="my-modal"
        >
          <Modal.Header closeButton>
            <a href="https://www.fontspace.com/category/cursive">
              <img
                src="https://see.fontimg.com/api/renderfont4/eZ0yn/eyJyIjoiZnMiLCJoIjo0OSwidyI6MTAwMCwiZnMiOjQ5LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/S2Fma2E/canteriafree-regular.png"
                alt="Cursive fonts"
                className="logo-image"
              />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="my-text">
              Write your email to reset the password
            </div>
            <Form onSubmit={handleSendMessage} ref={form}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required]}
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <button
                  className="btn btn-dark btn-block my-4 login-button"
                  disabled={loading}
                  onClick={sendAlertHandler}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Send email</span>
                </button>
              </div>
              {dataRes && (
                <div className="form-group">
                  <div className="alert alert-getEmail" role="alert">
                   {dataRes}
                  </div>
                </div>
              )}
              
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default GetEmail;
