/**
 * Main Server Entry Point
 * - Initializes Express app and HTTP server
 * - Sets up API routes and middleware
 * - Enables WebSocket (Socket.IO) for real-time updates
 */

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const routes = require('./routes'); // Imports /api/feedback routes

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO on the server
const io = socketIo(server, {
  cors: {
    origin: '*', // Update this with your frontend domain in production
    methods: ['GET', 'POST'],
  },
});

// Middleware: Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount API routes (feedback)
app.use('/api', routes);

// WebSocket Connection Handling
io.on('connection', (socket) => {
  console.log('New client connected');
    // Example: Emit a welcome message to the client
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start server on specified port or default to 5000
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
