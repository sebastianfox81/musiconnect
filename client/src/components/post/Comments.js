import React from 'react';
import CommentItem from './CommentItem'

const Comments = ({ post, comments = [{ text: ''}] }) => {
  return (
    <div className="comments">
      {comments.map((comment, index) => (
        <CommentItem key={index} comment={comment} postId={post._id} />
      ))}
    </div>
  );
};

export default Comments;
