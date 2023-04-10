import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import formatDate from '../../utils/formatDate';
import { useGlobalContext } from '../../context';

const PostItem = ({ post, showActions }) => {

  const { user, loading, deleteUserPost, addUserLike, removeUserLike } = useGlobalContext();
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${post.user}`}>
          <img className="round-img" src={post.avatar} alt="" />
          <h4>{post.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{post.text}</p>
        {/* <p className="post-date">Posted on {formatDate(post.date)}</p> */}

        {showActions && (
          <Fragment>
            <button
              onClick={() => addUserLike(post._id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-up" />{' '}
              <span>{post.likes.length > 0 && <span>{post.likes.length}</span>}</span>
            </button>
            <button
              onClick={() => removeUserLike(post._id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-down" />
            </button>
            <Link to={`/posts/${post._id}`} className="btn btn-primary">
              Discussion{' '}
              {post.comments.length > 0 && (
                <span className="comment-count">{post.comments.length}</span>
              )}
            </Link>
            {!loading && post.user === user._id && (
              <button
                onClick={() => deleteUserPost(post._id)}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times" />
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  showActions: PropTypes.bool
};


export default PostItem


