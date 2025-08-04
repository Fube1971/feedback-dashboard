/**
 * ProtectedRoute.jsx
 *
 * Description:
 * A wrapper component used to protect admin-only routes.
 * If no user is authenticated (user is null), the component
 * automatically redirects to the /admin-login page.
 *
 * Usage:
 * <ProtectedRoute user={user}>
 *   <AdminHomePage />
 * </ProtectedRoute>
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../services/firebase'; 

// Receives `user` prop (from Firebase Auth) and wraps the child route
const ProtectedRoute = ({ user, children }) => {
  // If no user is logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/admin-login" replace />;
  }

  // If user is logged in, render the protected content
  return children;
};

export default ProtectedRoute;
