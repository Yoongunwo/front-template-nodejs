import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../../index.css';

import { AppBar, Box, Toolbar, Typography } from '@mui/material';

const NotAuthenticatedHeader = () => {
  const navigate = useNavigate();

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
            <Typography>Template</Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default NotAuthenticatedHeader;
