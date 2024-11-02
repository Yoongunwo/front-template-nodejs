import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import PropTypes from 'prop-types';

import { CircularProgress } from '@mui/material';

import { UserContext } from '../../core/user';
import { AuthContext } from '../../core/auth';

const ProtectedRoute = ({ children }) => {
  const { authState } = useContext(AuthContext);
  const { userState } = useContext(UserContext);

  if (userState?.isLoading) {
    return <CircularProgress />;
  }

  if (!userState) {
    throw new Response('Unauthorized', {
      status: 401,
      statusText: 'Unauthorized',
    });
  }

  return children ? <React.Fragment>{children}</React.Fragment> : <Outlet />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
