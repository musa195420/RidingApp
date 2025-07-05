const router = require('express').Router();
const {
  createDriver,
  getDriverById,
  getAllDrivers,
  updateDriver,
  deleteDriver,
} = require('./driver.controller');

const checkToken = require('../auth/verifyToken');

// You can add driver validation middleware later
router.post('/', checkToken(), createDriver);
router.get('/', checkToken(), getAllDrivers);
router.get('/id/', checkToken(), getDriverById);
router.patch('/', checkToken(), updateDriver);
router.delete('/', checkToken(), deleteDriver);

module.exports = router;
