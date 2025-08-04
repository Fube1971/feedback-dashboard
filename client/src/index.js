// client/src/index.js

/**
 * Entry point for the React application.
 * - Mounts the <App /> component into the root DOM node.
 * - Wraps the app in <React.StrictMode> for development checks.
 * - Imports global styles from index.css.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// React 18+ root rendering API
const root = ReactDOM.createRoot(document.getElementById("root"));

// Mount the main <App /> component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
