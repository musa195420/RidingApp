const {
  createProfile,
  getProfileById,
  getAllProfiles,
  updateProfile,
  deleteProfile,
} = require('./profile.service');

module.exports = {
  createProfile: async (req, res) => {
    try {
      const result = await createProfile(req.body);
      return res.status(200).json({ success: true, status: 200, data: result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, status: 500, message: 'Database Error', error: err.message });
    }
  },

  getProfileById: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await getProfileById(id);
      if (!result) {
        return res.status(404).json({ success: false, status: 404, message: 'Profile not found' });
      }
      return res.status(200).json({ success: true, status: 200, data: result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, status: 500, message: 'Database Error' });
    }
  },

  getAllProfiles: async (_req, res) => {
    try {
      const results = await getAllProfiles();
      return res.status(200).json({ success: true, status: 200, data: results });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, status: 500, message: 'Database Error' });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const result = await updateProfile(req.body);
      return res.status(200).json({ success: true, status: 200, message: 'Profile updated successfully', data: result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, status: 500, message: 'Database Error', error: err.message });
    }
  },

  deleteProfile: async (req, res) => {
    const { id } = req.body;
    try {
      await deleteProfile(id);
      return res.status(200).json({ success: true, status: 200, message: 'Profile deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, status: 500, message: 'Database Error', error: err.message });
    }
  },
};
