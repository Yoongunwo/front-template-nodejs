import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import PropTypes from 'prop-types';

import { CircularProgress } from '@mui/material';

import { UserContext } from '../../core/user';
import { AuthContext } from '../../core/auth';

const RedirectionRoute = () => {
  const { userState } = useContext(UserContext);
  const { authState } = useContext(AuthContext);

  if (userState?.isLoading) {
    return <CircularProgress />;
  }

  if (!authState.isAuthenticated) {
    console.log('Redirecting to login');
    return <Navigate to="/login" />;
  } else {
    console.log('Redirecting to home');
    return <Navigate to="/home" />;
  }
};

RedirectionRoute.propTypes = {
  children: PropTypes.node,
};

export default RedirectionRoute;
