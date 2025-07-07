const {
  createDriver,
  getDriverById,
  getAllDrivers,
  updateDriver,
  deleteDriver,
  uploadDriverDocsService,
} = require('./driver.service');

module.exports = {
  createDriver: async (req, res) => {
    try {
      const body = req.body;
      const result = await createDriver(body);
      return res.status(200).json({ success: true, status: 200, data: result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        status: 400,
        message: 'Database Error: ' + err.message,
      });
    }
  },

  getDriverById: async (req, res) => {
    const driverId = req.params.id;
    try {
      const result = await getDriverById(driverId);
      if (!result) {
        return res.status(404).json({ success: false, status: 400, message: 'Driver not found' });
      }
      return res.status(200).json({ success: true, status: 200, data: result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, status: 400, message: 'Database Error' });
    }
  },

  getAllDrivers: async (req, res) => {
    try {
      const result = await getAllDrivers();
      return res.status(200).json({ success: true, status: 200, data: result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, status: 400, message: 'Database Error' });
    }
  },

  updateDriver: async (req, res) => {
    try {
      const result = await updateDriver({ ...req.body, user_id: req.params.id });
      return res.status(200).json({ success: true, status: 200, message: 'Driver updated successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, status: 400, message: 'Database Error: ' + err.message });
    }
  },

  deleteDriver: async (req, res) => {
    const driverId = req.params.id;
    try {
      const result = await deleteDriver(driverId);
      return res.status(200).json({ success: true, status: 200, message: 'Driver deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, status: 400, message: 'Database Error: ' + err.message });
    }
  },

  uploadDocs: async (req, res) => {
    try {
      const { user_id } = req.body;
      if (!user_id) return res.status(400).json({ message: 'user_id missing' });

      const result = await uploadDriverDocsService({
        userId: user_id,
        cnicFile: req.files?.cnic_image?.[0],
        licenseFile: req.files?.license_image?.[0],
      });

      return res.json({ success: true, data: result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },
};