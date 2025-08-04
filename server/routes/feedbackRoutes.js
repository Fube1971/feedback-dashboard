// server/routes/feedbackRoutes.js

/**
 * Route Module: Feedback
 * Description: Defines the API endpoints related to feedback submission and retrieval.
 */

const express = require('express');
const router = express.Router();

// Import controller functions for handling feedback routes
const {
  getFeedback,
  submitFeedback,
} = require('../controllers/feedbackController');

// GET /api/feedback
// Description: Placeholder to test route connectivity
router.get('/', getFeedback);

// POST /api/feedback
// Description: Submits new feedback data (e.g., from a survey form)
router.post('/', submitFeedback);

// Export the router to be used in server/index.js
module.exports = router;

