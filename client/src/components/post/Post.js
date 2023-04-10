import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import Comments from './Comments';
import { useGlobalContext } from '../../context'

const Post = () => {
  const { id } = useParams();
  const { loading, getSinglePost, post } = useGlobalContext()

  useEffect(() => {
    getSinglePost(id);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

const { comments } = post

return (
    <section className="container">
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <Comments comments={comments} post={post}/>
    </section>
  );
};

export default Post;
