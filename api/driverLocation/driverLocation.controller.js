const {
  createDriverLocation,
  getDriverLocationById,
  updateDriverLocation,
  deleteDriverLocation,
  getAllDriverLocations,
} = require('./driverLocation.service');

module.exports = {
  createDriverLocation: async (req, res) => {
    try {
      const result = await createDriverLocation(req.body);
      return res.status(200).json({ success: true, status: 200, data: result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, status: 500, message: 'Database Error', error: err.message });
    }
  },

  getDriverLocationById: async (req, res) => {
    const { driver_id } = req.params;
    try {
      const result = await getDriverLocationById(driver_id);
      if (!result) {
        return res.status(404).json({ success: false, status: 404, message: 'Driver location not found' });
      }
      return res.status(200).json({ success: true, status: 200, data: result });
    } catch (err) {
      return res.status(500).json({ success: false, status: 500, message: 'Database Error', error: err.message });
    }
  },

  getAllDriverLocations: async (_req, res) => {
    try {
      const results = await getAllDriverLocations();
      return res.status(200).json({ success: true, status: 200, data: results });
    } catch (err) {
      return res.status(500).json({ success: false, status: 500, message: 'Database Error', error: err.message });
    }
  },

  updateDriverLocation: async (req, res) => {
    try {
      const result = await updateDriverLocation(req.body);
      return res.status(200).json({ success: true, status: 200, message: 'Driver location updated', data: result });
    } catch (err) {
      return res.status(500).json({ success: false, status: 500, message: 'Database Error', error: err.message });
    }
  },

  deleteDriverLocation: async (req, res) => {
    try {
      const { driver_id } = req.body;
      await deleteDriverLocation(driver_id);
      return res.status(200).json({ success: true, status: 200, message: 'Driver location deleted' });
    } catch (err) {
      return res.status(500).json({ success: false, status: 500, message: 'Database Error', error: err.message });
    }
  },
};
