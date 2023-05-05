import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { FormControl, InputGroup, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/LoginModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { GOOGLE_AUTH_URL } from "../index.js";

import AuthService from "../services/auth.service";
import Login from "./login.component";

const required = (value) => {
  if (!value) {
    return (
      <div className="text-danger" role="alert">
        This field is required
      </div>
    );
  }
};

const vemail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="text-danger" role="alert">
        This is not a valid email
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="text-danger" role="alert">
        The username must be between 7 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="text-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = ({ registerShow, onClose, loginShow, setLoginState }) => {
  const form = useRef(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleLoginOpen = () => {
    setLoginState(true);
    onClose();
  };

  const handleLoginClose = () => {
    setLoginState(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    AuthService.register(username, email, password).then(
      (response) => {
        setMessage(response.data.message);
        console.log(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setSuccessful(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <>
      {registerShow && (
        <Modal
          show={registerShow}
          className="my-modal"
          onHide={onClose}
          backdrop="static"
          keyboard={false}
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
            <div className="my-text">Sign up to be the coolest one</div>
            <Form onSubmit={handleRegister} ref={form}>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      validations={[required, vusername]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      validations={[required, vemail]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <InputGroup className="mb-3">
                      <FormControl
                        type={passwordShown ? "text" : "password"}
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        validations={[required, vpassword]}
                      />
                      <InputGroup.Text className="eye-button">
                        <FontAwesomeIcon
                          onClick={togglePassword}
                          className="eye-icon"
                          icon={passwordShown ? faEye : faEyeSlash}
                        ></FontAwesomeIcon>
                      </InputGroup.Text>
                    </InputGroup>
                  </div>

                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-dark my-1 btn-block login-button my-3"
                    >
                      Sign Up
                    </button>
                  </div>
                  <div className="form-group pb-3">
                    <Button
                      href={GOOGLE_AUTH_URL}
                      className="btn-block google-button"
                    >
                      <FontAwesomeIcon icon={faGoogle} className="px-2 " />
                      Continue with Google
                    </Button>
                  </div>
                  <div className="form-group register-text d-flex justify-content-center">
                    Already have an account?&nbsp;
                    <Link className="register-link" onClick={handleLoginOpen}>
                      Login
                    </Link>
                  </div>
                </div>
              )}

              {message && (
                
                <div className="form-group py-2 d-flex justify-content-center">
                  <div
                    className={
                      successful ? "text-success" : "text-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
                
              )}
              <CheckButton style={{ display: "none" }} />
            </Form>
          </Modal.Body>
        </Modal>
      )}
      {loginShow && <Login loginShow={loginShow} onClose={handleLoginClose} />}
    </>
  );
};
export default Register;
