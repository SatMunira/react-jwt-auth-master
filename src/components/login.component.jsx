import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { Button, FormControl, Image, InputGroup } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import GetEmail from "./GetEmail.component";
import "./css/LoginModal.css";
import { GOOGLE_AUTH_URL } from "../index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import Register from "./register.component";
import { useEffect } from "react";
const required = (value) => {
  if (!value) {
    return (
      <div className="text-danger" role="alert">
        This field is required
      </div>
    );
  }
};
const Login = ({ loginShow, onClose,registerShow, setRegisterState }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [forgotModalShow, setForgotModalShow] = useState(false);
  
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  const handleForgotOpen = () => {
    setForgotModalShow(true);
    onClose();
  };
  
  const handleRegisterOpen = () => {
    setRegisterState(true);
    onClose();
  };

  const handleRegisterClose = () => {
    setRegisterState(false);
  };

  const handleForgotClose = () => {
    setForgotModalShow(false);
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    //form.validateAll();

    AuthService.login(username, password).then(
      () => {
        navigate("/profile");
        console.log("You fucker in profile");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div>
      {loginShow && (
        <Modal
          className="my-modal "
          show={loginShow}
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

          <Modal.Body className="py-3">
            <div className="my-text">
              Log in to proof that you are the coolest
            </div>

            <Form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your email or username"
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <InputGroup className="mb-3">
                  <FormControl
                    type={passwordShown ? "text" : "password"}
                    name="password"
                    validations={[required]}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
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
              <p>
                <Link
                  className="forgot-password my-2"
                  onClick={handleForgotOpen}
                >
                  Forgot password?
                </Link>
              </p>

              <div className="form-group">
                <button
                  className="btn btn-dark my-2 btn-block login-button"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span className="px-2">Login</span>
                </button>
              </div>
              <div className="form-group pb-3">
                <Button
                  href={GOOGLE_AUTH_URL}
                  className="btn-block my-1 google-button"
                >
                  <FontAwesomeIcon icon={faGoogle} className="px-2 " />
                  Continue with Google
                </Button>
              </div>
              {message && (
                <div className="form-group">
                  <div className="alert alert-message" role="alert">
                    The email or password you entered is invalid. Please try
                    again.
                  </div>
                </div>
              )}
              <div className="form-group register-text d-flex justify-content-center">
                Don't have an account?&nbsp;
                <Link className="register-link" onClick={handleRegisterOpen}>
                  Sign up
                </Link>
              </div>

              <CheckButton style={{ display: "none" }} />
            </Form>
          </Modal.Body>
        </Modal>
      )}

      {registerShow && (
        <Register
          registerShow={registerShow}
          onClose={handleRegisterClose}
        />
      )}
      {forgotModalShow && (
        <GetEmail forgotModal={forgotModalShow} onClose={handleForgotClose}  />
      )}
    </div>
  );
};
export default Login;
