/**
 * FeedbackPage.jsx
 *
 * Description:
 * Public page that renders the customer feedback form.
 * Used when someone scans the QR code and lands on the survey.
 */

import React from "react";
import FeedbackForm from "../components/Form/FeedbackForm"; // Main form component

// Wrapper page component for feedback submission
const FeedbackPage = () => {
  return (
    <div>
      <FeedbackForm />
    </div>
  );
};

export default FeedbackPage;
