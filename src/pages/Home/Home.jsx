import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Typography } from '@mui/material';

import { UserContext } from '../../core/user';

const Home = () => {
  const { userState } = useContext(UserContext);

  // console.log(userState);
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full items-center justify-center ">
        <div>
          <Typography textAlign="center">Home</Typography>
          <Typography textAlign="center">
            Welcome {userState?.user?.name}
          </Typography>
        </div>
      </div>
    </div>
  );
};
export default Home;
