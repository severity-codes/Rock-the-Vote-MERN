/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { IssuesContext } from "../context/IssueProvider";
import "../style/commentStyle.css";

export default function CommentsForm({ issueId }) {
  const { addComment } = useContext(IssueContext);
  const { user: { username } } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      comment,
      commentedBy: username,
      issue: issueId,
    };
    addComment(newComment, issueId)
      .then(() => setComment(""))
      .catch((error) => console.error("Failed to add comment:", error));
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="toggle-btn" onClick={handleToggle}>
        {isOpen ? "Hide Comment section🔼 " : "Leave a Comment 🔽"}
      </div>
      {isOpen && (
        <form onSubmit={handleSubmit} className="comment-form">
          <input
            type="text"
            name="comment"
            value={comment}
            onChange={handleChange}
            placeholder="Leave a comment..."
          />
          <button type="submit">Post</button>
        </form>
      )}
    </>
  );
}