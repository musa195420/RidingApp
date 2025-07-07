const router = require('express').Router();
const {
  createRide,
  getRideById,
  getAllRides,
  getRidesByUserId,
  updateRide,
  deleteRide
} = require('./ride.controller');

const checkToken = require('../auth/verifyToken');

// --- CREATE ---
router.post('/', checkToken(), createRide);

// --- READ ---
router.get('/', checkToken(), getAllRides);

// NOTE: both endpoints below expect JSON body (use POST)
router.post('/by-id', checkToken(), getRideById);     // body: { id }
router.post('/by-user', checkToken(), getRidesByUserId); // body: { user_id }

// --- UPDATE & DELETE ---
router.patch('/', checkToken(), updateRide);
router.delete('/', checkToken(), deleteRide);

module.exports = router;
