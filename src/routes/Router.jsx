import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import RedirectionRoute from '../components/route/RedirectionRoute';
import ProtectedRoute from '../components/route/ProtectedRoute';

import MainLayout from '../layout/MainLayout';
import ErrorLayout from '../layout/ErrorLayout';

import Login from '../pages/Authentication/Login';
import Signup from '../pages/Authentication/Signup';
import Home from '../pages/Home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorLayout />,
    children: [
      {
        index: true,
        element: <RedirectionRoute />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/',
        element: <ProtectedRoute />,
        children: [
          {
            path: '/home',
            element: <Home />,
          },
        ],
      },
    ],
  },
]);

export default router;
