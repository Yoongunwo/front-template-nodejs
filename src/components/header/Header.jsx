import React, { useContext } from 'react';

import { UserContext } from '../../core/user';
import { AuthContext } from '../../core/auth';

import { useNavigate } from 'react-router-dom';

import NotAuthenticatedHeader from './NotAuthenticatedHeader';
import AuthenticatedHeader from './AuthenticatedHeader';

import '../../index.css';

const Header = () => {
  const { userState } = useContext(UserContext);
  const { authState } = useContext(AuthContext);

  if (authState.loading) {
    return <div>Loading...</div>;
  }

  if (!authState.isAuthenticated) {
    return <NotAuthenticatedHeader />;
  } else {
    return <AuthenticatedHeader />;
  }
};

export default Header;
