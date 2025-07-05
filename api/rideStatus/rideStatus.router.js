const router = require('express').Router();
const {
  createRideStatus,
  getAllRideStatuses,
  getStatusByRideId,
} = require('./rideStatus.controller');

const checkToken = require('../auth/verifyToken');

router.post('/', checkToken(), createRideStatus);
router.get('/', checkToken(), getAllRideStatuses);
router.get('/:ride_id', checkToken(), getStatusByRideId);

module.exports = router;
