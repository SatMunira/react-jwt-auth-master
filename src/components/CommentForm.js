import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "react-bootstrap";
import ReactQuill from "react-quill";
import { Form, Button } from "react-bootstrap";
import "./css/Comments.css";
import { useRef } from "react";

const API_URL = "http://localhost:8084/";

const CommentForm = ({ bookId, userId }) => {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [replyTo, setReplyTo] = useState(null);
  const [replyComment, setReplyComment] = useState(""); // New state for reply input
  const editorRef = useRef(null);

  const handleReply = (commentId) => {
    setReplyTo(commentId);
  };

  const handleCancelReply = () => {
    setReplyTo(null);
    setReplyComment(""); // Clear the reply input
  };

  useEffect(() => {
    if (bookId) {
      axios
        .get(API_URL + `comments/getComments?bookId=${bookId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setCommentList(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const createMarkup = (content) => ({ __html: content });

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote"],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (replyTo) {
        // Creating a reply comment
        await axios.post(API_URL + "comments/createComment", {
          date: new Date(),
          content: replyComment,
          book: {
            id: bookId,
          },
          likes: 0,
          user: {
            id: user.id,
          },
          replyTo: replyTo, // Set the replyTo property to indicate the parent comment
        });

        setReplyTo(null);
        setReplyComment(""); // Clear the reply input
      } else {
        // Creating a regular comment
        await axios.post(API_URL + "comments/createComment", {
          date: new Date(),
          content: comment,
          book: {
            id: bookId,
          },
          likes: 0,
          user: {
            id: user.id,
          },
        });

        // Reset the comment form
        setComment("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (value) => {
    if (replyTo) {
      setReplyComment(value); // Update the reply input value
    } else {
      setComment(value); // Update the main comment value
    }
  };
  

  return (
    <>
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group>
          <div className="quill-container">
            <ReactQuill
              value={ comment} // Use replyComment if replying, otherwise use comment
              onChange={handleChange}
              placeholder="Write a comment.."
              modules={modules}
              className="quill-editor"
            />
            <Button
              variant="btn btn-dark my-2 py-0"
              type="submit"
              onClick={handleSubmit}
            >
              { "Send"}{" "}
              {/* Change button text based on reply state */}
            </Button>
          </div>
        </Form.Group>
      </Form>
      <div className="comment-list">
        <div>
          {commentList.length === 0 ? (
            <p>No comments available.</p>
          ) : (
            <div>
              {commentList.map((comment) => (
                <div key={comment.id} className="flex-review">
                  <Image
                    src={`http://localhost:8084/images/user.jpg`}
                    alt="Circle Image"
                    className="user-image-comment"
                    roundedCircle
                  />
                  <div>
                    <div className="mx-2">
                      <div className="flex-tab">
                        <div>
                          <div className="user-weight">
                            {comment.user.username}
                          </div>
                        </div>
                        <div className="date-post mx-2"> {comment.date}</div>
                      </div>
                      <div
                        style={{ color: "rgb(30, 25, 21)" }}
                        dangerouslySetInnerHTML={createMarkup(comment.content)}
                      />
                      
                      {replyTo === comment.id ? (
                        // Display a reply input if replying to this comment
                        <div className="reply-input-container">
                          <ReactQuill
                            
                            value={replyComment}
                            onChange={handleChange}
                            placeholder="Write a reply.."
                            modules={modules}
                            className="quill-editor"
                          />
                          <div>
                            <Button
                              variant="btn btn-dark my-2 py-0"
                              onClick={handleSubmit}
                            >
                              Send Reply
                            </Button>
                            <Button
                              variant="btn btn-dark my-2 py-0 ml-2"
                              onClick={handleCancelReply}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        // Display a reply button if not replying to this comment
                        <Button
                          variant="btn btn-link reply-button"
                          onClick={() => handleReply(comment.id)}
                        >
                          Reply
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CommentForm;
