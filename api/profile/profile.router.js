const router = require('express').Router();
const {
  createProfile,
  getProfileById,
  getAllProfiles,
  updateProfile,
  deleteProfile,
  getProfileByEmail
} = require('./profile.controller');

const checkToken = require('../auth/verifyToken');

router.post('/', checkToken, createProfile);
router.get('/', checkToken, getAllProfiles);
router.post('/email', checkToken, getProfileByEmail);
router.get('/:id', checkToken, getProfileById);
router.patch('/', checkToken, updateProfile);
router.delete('/', checkToken, deleteProfile);

module.exports = router;
