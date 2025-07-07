const router = require('express').Router();
const {
  createVehicle,
  getVehicleById,
  getAllVehicles,
  updateVehicle,
  deleteVehicle,
} = require('./vehicle.controller');

const checkToken = require('../auth/verifyToken');

router.post('/', checkToken(), createVehicle);
router.get('/', checkToken(), getAllVehicles);
router.get('/:id', checkToken(), getVehicleById);
router.patch('/', checkToken(), updateVehicle);
router.delete('/', checkToken(), deleteVehicle);

module.exports = router;
