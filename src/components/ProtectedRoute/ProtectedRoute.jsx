import React from 'react';
import {Navigate} from 'react-router-dom';

function ProtectedRoute({element: Component, isLoggedIn, ...props}) {
  const loggedIn = localStorage.getItem('loggedIn');
  return loggedIn ? <Component isLoggedIn={isLoggedIn} {...props} /> : <Navigate to='/' />;
}

export default ProtectedRoute;
