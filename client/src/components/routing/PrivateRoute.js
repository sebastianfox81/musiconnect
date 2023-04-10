import React from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { useGlobalContext } from '../../context';

const PrivateRoute = ({ component: Component }) => {
  const { loading, isAuthenticated } = useGlobalContext();
  if (loading) return <Spinner />;
  if (isAuthenticated) return <Component />;

  return <Navigate to="/login" />;
};

export default PrivateRoute;
