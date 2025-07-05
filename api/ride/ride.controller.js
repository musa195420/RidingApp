const {
  createRide,
  getRideById,
  getAllRides,
  updateRide,
  deleteRide,
} = require('./ride.service');

module.exports = {
  createRide: async (req, res) => {
    try {
      const result = await createRide(req.body);
      return res.status(200).json({ success: true, status: 200, data: result });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, status: 500, message: 'Database Error', error: err.message });
    }
  },

  getRideById: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await getRideById(id);
      if (!result) {
        return res
          .status(404)
          .json({ success: false, status: 404, message: 'Ride not found' });
      }
      return res.status(200).json({ success: true, status: 200, data: result });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, status: 500, message: 'Database Error' });
    }
  },

  getAllRides: async (_req, res) => {
    try {
      const results = await getAllRides();
      return res.status(200).json({ success: true, status: 200, data: results });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, status: 500, message: 'Database Error' });
    }
  },

  updateRide: async (req, res) => {
    try {
      await updateRide(req.body);
      return res
        .status(200)
        .json({ success: true, status: 200, message: 'Ride updated successfully' });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, status: 500, message: 'Database Error', error: err.message });
    }
  },

  deleteRide: async (req, res) => {
    const { id } = req.body;
    try {
      await deleteRide(id);
      return res
        .status(200)
        .json({ success: true, status: 200, message: 'Ride deleted successfully' });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, status: 500, message: 'Database Error', error: err.message });
    }
  },
};
