const {
  createPassenger,
  getPassengerById,
  getAllPassengers,
  updatePassenger,
  deletePassenger,
} = require('./passenger.service');

module.exports = {
  createPassenger: async (req, res) => {
    const body = req.body;
    try {
      const result = await createPassenger(body);
      return res.status(200).json({ success: true, status: 200, data: result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        status: 400,
        message: 'Database Error ' + err.message,
      });
    }
  },

  getPassengerById: async (req, res) => {
    let userId = req.body.passenger_id || req.body.user_id;
    try {
      const result = await getPassengerById(userId);
      if (!result) {
        return res
          .status(404)
          .json({ success: false, status: 400, message: 'Passenger not found' });
      }
      return res.status(200).json({ success: true, status: 200, data: result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, status: 400, message: 'Database Error' });
    }
  },

  getAllPassengers: async (req, res) => {
    try {
      const result = await getAllPassengers();
      return res.status(200).json({ success: true, status: 200, data: result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, status: 400, message: 'Database Error' });
    }
  },

  updatePassenger: async (req, res) => {
    try {
      const result = await updatePassenger(req.body);
      return res
        .status(200)
        .json({ success: true, status: 200, message: 'Passenger updated successfully' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, status: 400, message: 'Database Error: ' + err.message });
    }
  },

  deletePassenger: async (req, res) => {
    let userId = req.body.passenger_id || req.body.user_id;
    try {
      const result = await deletePassenger(userId);
      return res
        .status(200)
        .json({ success: true, status: 200, message: 'Passenger deleted successfully' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, status: 400, message: 'Database Error: ' + err.message });
    }
  },
};
