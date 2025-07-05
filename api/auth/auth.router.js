// api/auth/auth.router.js
const express = require('express');
const {
  register,
  login,
  refreshTokenHandler,
  logout,
} = require('./authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshTokenHandler);
router.post('/logout', logout);

module.exports = router;
