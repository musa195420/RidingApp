const express = require('express');
require('dotenv').config();
const app = express();


const http = require('http');
const server = http.createServer(app);



// Supabase client
const supabase = require('./config/database');



// Routers
const routes = {
    auth: require('./api/auth/auth.router'),
    driver: require('./api/driver/driver.router'),
 // riders: require('./api/users/user.router'),
    passenger: require('./api/passenger/passenger.router'),
     vehicle: require('./api/vehicle/vehicle.router'),
      profile: require('./api/profile/profile.router'),
       ride: require('./api/ride/ride.router'),
       driverLocation: require('./api/driverLocation/driverLocation.router'),
       rideStatus: require('./api/rideStatus/rideStatus.router'),
         role: require('./api/role/role.routes')
  
};

// Middleware
app.use(express.json());


// Routes
app.use('/api/auth', routes.auth);
app.use('/api/driver', routes.driver);
app.use('/api/passenger', routes.passenger);
app.use('/api/vehicle', routes.vehicle);
app.use('/api/profile', routes.profile);
app.use('/api/ride', routes.ride);
app.use('/api/driverLocation', routes.driverLocation);
app.use('/api/rideStatus', routes.rideStatus);
app.use('/api/role', routes.role);

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
