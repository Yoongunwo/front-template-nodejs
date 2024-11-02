import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';

import { AuthContext } from '../../core/auth';
import { UserContext } from '../../core/user';
import { fetchSignOut } from '../../services/AuthServices';

const AuthenticatedHeader = () => {
  const navigate = useNavigate();

  const { setAuthState } = useContext(AuthContext);
  const { userState } = useContext(UserContext);

  const onClickSignOut = async () => {
    setAuthState({ isLoading: true });
    await fetchSignOut().finally(() => {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
      });

      navigate('/');
    });
    setAuthState({ isLoading: false });
  };

  return (
    <div className="flex flex-col">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          style={{
            backgroundColor: 'rgba(222, 211, 166, 0.5)',
            boxShadow: 'none',
          }}
        >
          <Toolbar>
            <div className="flex flex-col">
              <Typography>Template</Typography>
            </div>

            <Button color="inherit" onClick={() => navigate('/')}>
              홈
            </Button>
            <Button color="inherit" onClick={onClickSignOut}>
              로그아웃
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default AuthenticatedHeader;
