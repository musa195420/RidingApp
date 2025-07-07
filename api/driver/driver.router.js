
// ──────────── driver.router.js ────────────
const express = require('express');
const multer = require('multer');
const router = express.Router();

const {
  createDriver,
  getDriverById,
  getAllDrivers,
  updateDriver,
  deleteDriver,
  uploadDocs,
} = require('./driver.controller');

const checkToken = require('../auth/verifyToken');
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  '/upload-docs',
  checkToken(),
  upload.fields([
    { name: 'cnic_image', maxCount: 1 },
    { name: 'license_image', maxCount: 1 },
  ]),
  uploadDocs
);

router.post('/', checkToken(), createDriver);
router.get('/', checkToken(), getAllDrivers);
router.get('/:id', checkToken(), getDriverById);
router.patch('/:id', checkToken(), updateDriver);
router.delete('/:id', checkToken(), deleteDriver);

module.exports = router;
