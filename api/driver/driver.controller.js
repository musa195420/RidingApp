const {
  createDriver,
  getDriverById,
  getAllDrivers,
  updateDriver,
  deleteDriver,
} = require('./driver.service');

module.exports = {
  createDriver: async (req, res) => {
    try {
      const body = req.body;
      const result = await createDriver(body);
      return res.status(200).json({ success: true, status: 200, data: result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        status: 400,
        message: 'Database Error: ' + err.message,
      });
    }
  },

  getDriverById: async (req, res) => {
    const driverId = req.body.driver_id || req.body.user_id;
    try {
      const result = await getDriverById(driverId);
      if (!result) {
        return res
          .status(404)
          .json({ success: false, status: 400, message: 'Driver not found' });
      }
      return res.status(200).json({ success: true, status: 200, data: result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, status: 400, message: 'Database Error' });
    }
  },

  getAllDrivers: async (req, res) => {
    try {
      const result = await getAllDrivers();
      return res.status(200).json({ success: true, status: 200, data: result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, status: 400, message: 'Database Error' });
    }
  },

  updateDriver: async (req, res) => {
    try {
      const result = await updateDriver(req.body);
      return res
        .status(200)
        .json({ success: true, status: 200, message: 'Driver updated successfully' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, status: 400, message: 'Database Error: ' + err.message });
    }
  },

  deleteDriver: async (req, res) => {
    const driverId = req.body.driver_id || req.body.user_id;
    try {
      const result = await deleteDriver(driverId);
      return res
        .status(200)
        .json({ success: true, status: 200, message: 'Driver deleted successfully' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, status: 400, message: 'Database Error: ' + err.message });
    }
  },
};
