import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex justify-center w-full place-content-center items-center"
      style={{
        backgroundColor: 'rgba(222, 211, 166, 0.5)',
      }}
    >
      <div className="flex 2xl:w-10/12 m-5"></div>
    </div>
  );
};

export default Footer;
