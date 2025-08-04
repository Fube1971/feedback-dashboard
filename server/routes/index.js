/**
 * Route Aggregator
 * Description: Combines and mounts all sub-route modules under a single router.
 * Main use: Centralized entry for route definitions in the server.
 */

const express = require('express');
const router = express.Router();

// Import the feedback route module
const feedbackRoutes = require('./feedbackRoutes');

// Mount the feedback routes at /api/feedback
// Example: POST to /api/feedback → handled by feedbackRoutes
router.use('/feedback', feedbackRoutes);

// Export the aggregated router
module.exports = router;
