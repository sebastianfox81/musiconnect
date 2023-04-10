import React, { useEffect } from 'react';
import PostItem from './PostItem';
import PostForm from './PostForm';
import Spinner from '../layout/Spinner';
import { useGlobalContext } from '../../context';

const Posts = () => {
  const { loading, getAllPosts, posts } = useGlobalContext();

  useEffect(() => {
    getAllPosts();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="container">
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <PostForm />
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default Posts;
