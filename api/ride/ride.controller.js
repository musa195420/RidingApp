const {
  createRide,
  getRideById,
  getAllRides,
  getRidesByUserId,
  updateRide,
  deleteRide
} = require('./ride.service');

module.exports = {
  /* ---------- CREATE ---------- */
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

  /* ---------- READ ---------- */
  /** /rides/by-id  (expects `{ id }` JSON body) */
  getRideById: async (req, res) => {
    const { id } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, status: 400, message: '`id` is required in request body' });
    }
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
        .json({ success: false, status: 500, message: 'Database Error', error: err.message });
    }
  },

  /** /rides/by-user  (expects `{ user_id }` JSON body) */
  getRidesByUserId: async (req, res) => {
    const { user_id } = req.body;
    if (!user_id) {
      return res
        .status(400)
        .json({ success: false, status: 400, message: '`user_id` is required in request body' });
    }
    try {
      const rides = await getRidesByUserId(user_id);
      return res.status(200).json({ success: true, status: 200, data: rides });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, status: 500, message: 'Database Error', error: err.message });
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
        .json({ success: false, status: 500, message: 'Database Error', error: err.message });
    }
  },

  /* ---------- UPDATE ---------- */
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

  /* ---------- DELETE ---------- */
  deleteRide: async (req, res) => {
    const { id } = req.body;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, status: 400, message: '`id` is required in request body' });
    }
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
