import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import OAuth2RedirectHandler from "./user/oauth2/OAuth2RedirectHandler";
import ResetPasswordForm from "./components/reset-password-form";
import NewBookForm from "./components/NewBookForm";

import Books from "./components/Books"

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [childRegisterShow, setChildRegisterShow] = useState(false);
  const [loginShow, setLoginShow] = useState(false);

  const handleModalOpen = () => {
    setLoginShow(true);
  };
  const handleRegisterOpen = () => {
    setChildRegisterShow(true);
  };
  const handleRegisterClose = () => {
    setChildRegisterShow(false);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);
  const handleModalClose = () => {
    setLoginShow(false);
  };

  function logOut() {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
    window.location.reload();
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navbar-nav mr-auto">
            <Link to={"/"} className="navbar-brand">
              bezKoder
            </Link>
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
            <li className="nav-item">
                <Link to={"/books"} className="nav-link">
                  Books
                </Link>
              </li>
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item px-4">
                <Link className="sign-up-nav " onClick={handleModalOpen}>
                  Login
                </Link>
                <Login
                  loginShow={loginShow}
                  onClose={handleModalClose}
                  registerShow={childRegisterShow}
                  setRegisterState={setChildRegisterShow}
                />
              </li>
              <li className="nav-item py-auto my-auto">
                <Link className="sign-up-nav " onClick={handleRegisterOpen}>
                  Sign up
                </Link>
                <Register
                  registerShow={childRegisterShow}
                  onClose={handleRegisterClose}
                  loginShowModal={loginShow}
                  setLoginState={setLoginShow}
                />
              </li>
            </div>
          )}
        </div>
      </nav>
      <div className="container-home mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
          <Route path="/books/createBook" element={<NewBookForm/>}/>
          <Route path="/reset_password_form" element={<ResetPasswordForm />} />
          <Route path="/books" element={<Books/>}/>
        </Routes>
      </div>

      {/* <AuthVerify logOut={this.logOut}/> */}
    </div>
  );
}

export default App;
