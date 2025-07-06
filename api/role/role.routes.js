// modules/roles/role.routes.js
const router = require('express').Router();
const checkToken = require('../auth/verifyToken');

const {
  createRole,
  getRoleById,
  getRoleByCode,
  getAllRoles,
  updateRole,
  deleteRole,
} = require('./role.controller');

/* ───────── Create ───────── */
router.post('/', checkToken, createRole);

/* ───────── Read ───────── */
router.get('/',  getAllRoles);
router.post('/code', checkToken, getRoleByCode); // code in body
router.get('/:id', checkToken, getRoleById);

/* ───────── Update ───────── */
router.patch('/', checkToken, updateRole);

/* ───────── Delete ───────── */
router.delete('/', checkToken, deleteRole);

module.exports = router;
