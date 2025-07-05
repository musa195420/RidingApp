const router = require('express').Router();
const {
  createPassenger,
  getPassengerById,
  getAllPassengers,
  updatePassenger,
  deletePassenger,
} = require('./passenger.controller');

const checkToken = require('../auth/verifyToken');

// You can add passenger validation middleware if needed
router.post('/', checkToken(), createPassenger);
router.get('/', checkToken(), getAllPassengers);
router.get('/id/', checkToken(), getPassengerById);
router.patch('/', checkToken(), updatePassenger);
router.delete('/', checkToken(), deletePassenger);

module.exports = router;
