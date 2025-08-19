/**
 * Express Backend Server for Ext JS Frontend
 * ------------------------------------------
 * Sets up a basic Node.js/Express server used as a backend for an Ext JS frontend application.
 * 
 * Key Features:
 * - CORS is enabled specifically for `http://ai.sencha.local`, allowing requests from the Ext JS app.
 * - JSON request bodies are parsed using `body-parser`.
 * - A modular route handler is mounted at `/api/parse-query` to handle GPT-based query parsing.
 * - The server listens on port 3000.
 * 
 * This file acts as the entry point for the backend API and is designed to facilitate communication between
 * the Ext JS frontend and an OpenAI-based query parser route.
 * 
 * Request Structure
 * Endpoint: http://localhost:3000/api/interpret-prompt
 * Method: POST
 * Headers:
 * Content-Type: application/json
 * Body: 
 * {
 *  "query": "Show me all users from Mexico who signed up in the last 30 days"
 * }
 * 
 * 
 */



// Import the Express framework to build the web server
  const express = require('express');

// Import CORS middleware to enable Cross-Origin Resource Sharing
  const cors = require('cors');

// Import middleware to parse incoming JSON requests
  const bodyParser = require('body-parser');

// Import the route handler module for parsing queries
  const parseQuery = require('./endpoints/interpret-prompt');

// Create an instance of the Express application
  const app = express();

// Enable CORS to allow requests from the Ext JS app hosted at this specific origin
  app.use(cors({
    origin: 'http://ai.sencha.local/' // Ext JS app's URL
  }));


// Use body-parser middleware to automatically parse incoming JSON in request bodies
// Mount the parseQuery router on the /api/parse-query endpoint
// Start the server on port 3000 and log a message to the console when it's ready
  app.use(bodyParser.json());
  app.use('/api/interpret-prompt', parseQuery);
  app.listen(3000, () => console.log('Server running on http://localhost:3000'));





