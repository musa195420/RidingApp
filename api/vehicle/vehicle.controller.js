const {
  createVehicle,
  getVehicleById,
  getAllVehicles,
  updateVehicle,
  deleteVehicle,
} = require('./vehicle.service');

module.exports = {
  createVehicle: async (req, res) => {
    try {
      const result = await createVehicle(req.body);
      return res.status(200).json({ success: true, status: 200, data: result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, status: 500, message: 'Database Error', error: err.message });
    }
  },

  getVehicleById: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await getVehicleById(id);
      if (!result) {
        return res.status(404).json({ success: false, status: 404, message: 'Vehicle not found' });
      }
      return res.status(200).json({ success: true, status: 200, data: result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, status: 500, message: 'Database Error' });
    }
  },

  getAllVehicles: async (_req, res) => {
    try {
      const results = await getAllVehicles();
      return res.status(200).json({ success: true, status: 200, data: results });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, status: 500, message: 'Database Error' });
    }
  },

  updateVehicle: async (req, res) => {
    try {
      const result = await updateVehicle(req.body);
      return res.status(200).json({ success: true, status: 200, message: 'Vehicle updated successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, status: 500, message: 'Database Error', error: err.message });
    }
  },

  deleteVehicle: async (req, res) => {
    const { id } = req.body;
    try {
      await deleteVehicle(id);
      return res.status(200).json({ success: true, status: 200, message: 'Vehicle deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, status: 500, message: 'Database Error', error: err.message });
    }
  },
};
