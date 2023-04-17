import React, { useState, useEffect } from "react";

import Form from "react-validation/build/form";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import ResetPasswordState from "./reset-pass-status";

const API_URL = "http://localhost:8084/forgot_password";

const ResetPasswordForm = () => {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
            stateObj[name] = "Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  function fetchData() {
    const response = axios
      .post(
        API_URL + "/reset_password",
        { token: token, password: input.password },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((response) => {
        setMessage(response.data);
        console.log(',dsf: '+message);

        navigate('/ResetPassStatus', {state: {message:response.data}})
      });
  }
  if(message){
    console.log(',dsf: '+message);
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  

  };

  return (
    <div>
      <div className="col-md-12">
        <div className="card card-container">
          <Form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={input.password}
                onChange={onInputChange}
                onBlur={validateInput}
              ></input>
              {error.password && <span className="err">{error.password}</span>}

              <input
                type="password"
                name="confirmPassword"
                placeholder="Enter Confirm Password"
                value={input.confirmPassword}
                onChange={onInputChange}
                onBlur={validateInput}
              ></input>
              {error.confirmPassword && (
                <span className="err">{error.confirmPassword}</span>
              )}
              <div className="alert alert-green" role="alert">
                {message}
              </div>

              <p>
                <button
                  onClick={handleSubmit}
                >
                  Reset
                </button>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
