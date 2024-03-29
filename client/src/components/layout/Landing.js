import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useGlobalContext } from '../../context';

const Landing = () => {
  const { isAuthenticated } = useGlobalContext();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Musicians Network</h1>
          <p className="lead">
            Create a musician profile/portfolio, share posts and get connected
            with other musicians
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
