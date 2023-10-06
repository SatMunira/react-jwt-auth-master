import React, { useState, useEffect } from "react";

import Form from "react-validation/build/form";
import "./css/LoginModal.css";
import Input from "react-validation/build/input";

import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ResetPasswordState from "./reset-pass-status";
import axiosInstance from './axiosInstance';

const API_URL = "http://localhost:8084/forgot_password";

const ResetPasswordForm = () => {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const urlToken = searchParams.get("token").toString();
    setToken(urlToken);
  }, []);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] = "Passwords do not match";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please confirm the password";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Passwords do not match";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  function fetchData() {
    axios
      .post(
        API_URL + "/reset_password",
        { token: token, password: input.password },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((response) => {
        setMessage(response.data);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div>
      <div className="col-md-4 mx-auto ">
        <div className="my-text">Enter the new password</div>
        <Form onSubmit={handleSubmit}>
          <div className="form-group">
            <Input
              type="password"
              name="password"
              className="form-control my-2"
              placeholder="Enter Password"
              value={input.password}
              onChange={onInputChange}
              onBlur={validateInput}
            ></Input>
            {error.password && (
              <span className="err text-danger">{error.password}</span>
            )}

            <Input
              type="password"
              name="confirmPassword"
              className="form-control my-4"
              placeholder="Enter Confirm Password"
              value={input.confirmPassword}
              onChange={onInputChange}
              onBlur={validateInput}
            ></Input>
            {error.confirmPassword && (
              <span className="err text-danger">{error.confirmPassword}</span>
            )}

            <p>
              <button
                className="btn btn-dark btn-block my-4 login-button"
                onClick={handleSubmit}
              >
                Reset
              </button>
            </p>
          </div>
        </Form>
      </div>
      {message && (
        <ResetPasswordState message={message} setMessage={setMessage} />
      )}
    </div>
  );
};

export default ResetPasswordForm;
