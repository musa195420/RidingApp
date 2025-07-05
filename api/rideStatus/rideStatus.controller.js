const {
  createRideStatus,
  getAllRideStatuses,
  getStatusByRideId,
} = require('./rideStatus.service');

module.exports = {
  createRideStatus: async (req, res) => {
    try {
      const result = await createRideStatus(req.body);
      return res.status(201).json({ success: true, status: 201, data: result });
    } catch (err) {
      return res.status(500).json({ success: false, status: 500, message: err.message });
    }
  },

  getAllRideStatuses: async (_req, res) => {
    try {
      const result = await getAllRideStatuses();
      return res.status(200).json({ success: true, status: 200, data: result });
    } catch (err) {
      return res.status(500).json({ success: false, status: 500, message: err.message });
    }
  },

  getStatusByRideId: async (req, res) => {
    try {
      const { ride_id } = req.params;
      const result = await getStatusByRideId(ride_id);
      return res.status(200).json({ success: true, status: 200, data: result });
    } catch (err) {
      return res.status(500).json({ success: false, status: 500, message: err.message });
    }
  },
};
