/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Comment from './Comment'; // Removed the .jsx extension

// Define the component and use PropTypes for prop validation
function CommentsList({ comments }) {
  return (
    <div className="comment-list">
      {comments?.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          issueId={comment.issue}
        />
      ))}
    </div>
  );
}

// PropTypes validation
CommentsList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      issue: PropTypes.string,
    })
  ),
};

export default CommentsList;