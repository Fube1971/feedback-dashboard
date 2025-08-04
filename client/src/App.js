/**
 * Main React App Component
 * - Sets up client-side routing using React Router
 * - Authenticates admin user via Firebase Auth
 * - Tests Firestore connectivity on mount
 */

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Firebase
import { db, auth } from "./services/firebase";
import { collection, getDocs } from "firebase/firestore";

// Pages
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminHomePage from "./pages/AdminHomePage/AdminHomePage";
import AdminPending from "./pages/AdminPending";
import AdminHistory from "./pages/AdminHistory";
import HomePage from "./pages/HomePage/HomePage";
import FeedbackPage from "./pages/FeedbackPage";
import DisplayPage from "./pages/DisplayPage";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * Monitor Firebase Auth state
     * Automatically updates 'user' state when logged in/out
     */
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    /**
     * Firestore test: Check access to 'comments' collection
     * Used for dev/debug to confirm DB connection works
     */
    const testFirebaseConnection = async () => {
      try {
        const snapshot = await getDocs(collection(db, "comments"));
        console.log(
          ` Firebase connected. Documents in 'comments': ${snapshot.size}`
        );
      } catch (error) {
        console.error(" Firebase connection error:", error.message);
      }
    };

    testFirebaseConnection();

    return () => unsubscribe(); // Clean up auth listener
  }, []);

  // Show a loading screen until Firebase Auth resolves
  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/feedback-form" element={<FeedbackPage />} />
          <Route path="/display" element={<DisplayPage />} />

          {/* Admin Login */}
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute user={user}>
                <AdminHomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-pending"
            element={
              <ProtectedRoute user={user}>
                <AdminPending />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-history"
            element={
              <ProtectedRoute user={user}>
                <AdminHistory />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
