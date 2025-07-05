const router = require('express').Router();
const {
  createProfile,
  getProfileById,
  getAllProfiles,
  updateProfile,
  deleteProfile,
} = require('./profile.controller');

const checkToken = require('../auth/verifyToken');

router.post('/', checkToken, createProfile);
router.get('/', checkToken, getAllProfiles);
router.get('/:id', checkToken, getProfileById);
router.patch('/', checkToken, updateProfile);
router.delete('/', checkToken, deleteProfile);

module.exports = router;
