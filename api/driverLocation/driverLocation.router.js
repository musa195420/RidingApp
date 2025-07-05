const router = require('express').Router();
const {
  createDriverLocation,
  getDriverLocationById,
  getAllDriverLocations,
  updateDriverLocation,
  deleteDriverLocation,
} = require('./driverLocation.controller');

const checkToken = require('../auth/verifyToken');

router.post('/', checkToken(), createDriverLocation);
router.get('/', checkToken(), getAllDriverLocations);
router.get('/:driver_id', checkToken(), getDriverLocationById);
router.patch('/', checkToken(), updateDriverLocation);
router.delete('/', checkToken(), deleteDriverLocation);

module.exports = router;
