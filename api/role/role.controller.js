// modules/roles/role.controller.js
const {
  createRole,
  getRoleById,
  getRoleByCode,
  getAllRoles,
  updateRole,
  deleteRole,
} = require('./role.service');

module.exports = {
  /* ───────── Create ───────── */
  createRole: async (req, res) => {
    try {
      const result = await createRole(req.body);
      return res.status(200).json({ success: true, status: 200, data: result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        status: 500,
        message: 'Database Error',
        error: err.message,
      });
    }
  },

  /* ───────── Read (by id) ───────── */
  getRoleById: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await getRoleById(id);
      if (!result) {
        return res
          .status(404)
          .json({ success: false, status: 404, message: 'Role not found' });
      }
      return res.status(200).json({ success: true, status: 200, data: result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        status: 500,
        message: 'Database Error',
        error: err.message,
      });
    }
  },

  /* ───────── Read (by code) ───────── */
  getRoleByCode: async (req, res) => {
    const { code } = req.body;
    if (!code) {
      return res
        .status(400)
        .json({ success: false, status: 400, message: 'Code is required' });
    }

    try {
      const result = await getRoleByCode(code);
      if (!result) {
        return res
          .status(404)
          .json({ success: false, status: 404, message: 'Role not found' });
      }
      return res.status(200).json({ success: true, status: 200, data: result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        status: 500,
        message: 'Database Error',
        error: err.message,
      });
    }
  },

  /* ───────── Read (all) ───────── */
  getAllRoles: async (_req, res) => {
    try {
      const results = await getAllRoles();
      return res.status(200).json({ success: true, status: 200, data: results });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        status: 500,
        message: 'Database Error',
        error: err.message,
      });
    }
  },

  /* ───────── Update ───────── */
  updateRole: async (req, res) => {
    try {
      const result = await updateRole(req.body);
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Role updated successfully',
        data: result,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        status: 500,
        message: 'Database Error',
        error: err.message,
      });
    }
  },

  /* ───────── Delete ───────── */
  deleteRole: async (req, res) => {
    const { id } = req.body;
    try {
      await deleteRole(id);
      return res
        .status(200)
        .json({ success: true, status: 200, message: 'Role deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        status: 500,
        message: 'Database Error',
        error: err.message,
      });
    }
  },
};
