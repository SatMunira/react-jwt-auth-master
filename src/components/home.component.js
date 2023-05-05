import React, { Component } from "react";

import UserService from "../services/user.service";
import NewBookList from "./NewBookList";
import "./css/Home.css"

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "j"
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container-home">
        <header className="jumbotron">
          <NewBookList/>
        </header>
      </div>
    );
  }
}
