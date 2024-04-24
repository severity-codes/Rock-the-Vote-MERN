/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from "react";
import Comment from "./Comment";
import { CommentContext } from "../context/CommentProvider";

function Comments({ issueId, comments }) {
  const { getComments } = useContext(CommentContext);

  useEffect(() => {
    getComments(issueId);
  }, [issueId]);

  // If comments are not available yet, initialize it as an empty array
  const commentsArray = comments || [];

  return (
    <div className="comment-list">
      {commentsArray.map((comment) => (
        <Comment {...comment} key={comment._id} issueId={issueId} />
      ))}
    </div>
  );
}

// Set default prop values
Comments.defaultProps = {
  comments: [],
};

export default Comments;
