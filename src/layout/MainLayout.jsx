import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <div className={`flex-grow w-full`}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
