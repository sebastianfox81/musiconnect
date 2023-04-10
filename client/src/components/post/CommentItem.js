import React from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { useGlobalContext } from '../../context'

const CommentItem = ({ postId, comment }) => {
  const { loading, user, deleteUserComment } = useGlobalContext()
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${comment.user}`}>
          <img className="round-img" src={comment.avatar} alt="" />
          <h4>{comment.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{comment.text}</p>
        {/* <p className="post-date">Posted on {formatDate(comment.date)}</p> */}
        {!loading && comment.user === user._id && (
          <button
            onClick={() => deleteUserComment(postId, comment._id)}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
};


export default CommentItem;
