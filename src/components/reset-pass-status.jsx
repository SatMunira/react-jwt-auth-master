import React from "react";

import { Modal } from "react-bootstrap";
import "./css/LoginModal.css";
import { Button } from "react-bootstrap";

export default function ResetPasswordState({ message, setMessage }) {
  return (
    <Modal className="my-modal" show={message} onHide={() => setMessage(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <header className="jumbotron">
            <h3>{message}</h3>
          </header>
        </div>
        <Button
          className="login-button btn btn-dark my-4"
          onClick={() => setMessage(false)}
        >
          Uderstood
        </Button>
      </Modal.Body>
    </Modal>
  );
}
