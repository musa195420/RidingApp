const express = require('express');
require('dotenv').config();
const app = express();


const http = require('http');
const server = http.createServer(app);



// Supabase client
const supabase = require('./config/database');



// Routers
const routes = {
    auth: require('./api/auth/auth.router')
 // riders: require('./api/users/user.router'),
  
};

// Middleware
app.use(express.json());


// Routes
app.use('/api/auth', routes.auth);


// Base API Check
app.get('/api', async (req, res) => {
  res.json({
    status: 200,
    success: true,
    message: 'REST APIs are working.'
  });
});

// Unmatched Route Handler
app.use((req, res) => {
  res.status(404).json({
    status: 400,
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.APP_PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
