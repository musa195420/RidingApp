const router = require('express').Router();
const {
  createRide,
  getRideById,
  getAllRides,
  updateRide,
  deleteRide,
} = require('./ride.controller');

const checkToken = require('../auth/verifyToken');

router.post('/', checkToken(), createRide);
router.get('/', checkToken(), getAllRides);
router.get('/:id', checkToken(), getRideById);
router.patch('/', checkToken(), updateRide);
router.delete('/', checkToken(), deleteRide);

module.exports = router;
