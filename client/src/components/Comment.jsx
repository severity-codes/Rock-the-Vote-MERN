/* eslint-disable react/prop-types */

export default function Comment({ comment }) {
    return (
        <div className="comment-container">
            <p className="comment-text">💭 {comment.comment}</p>
        </div>
    );
}