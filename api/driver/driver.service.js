const supabase = require('../../config/database');

module.exports = {
  createDriver: async (data) => {
    const { user_id, cnic_front_url, driving_license_url, is_approved, availability_status } = data;
    try {
      const { data: result, error } = await supabase.from('drivers').insert([
        {
          user_id,
          cnic_front_url,
          driving_license_url,
          is_approved: is_approved ?? false,
          availability_status: availability_status ?? false,
        },
      ]);

      if (error) throw error;
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  getDriverById: async (driverId) => {
    try {
      const { data, error } = await supabase
        .from('drivers')
        .select('*')
        .eq('user_id', driverId)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  getAllDrivers: async () => {
    try {
      const { data, error } = await supabase.from('drivers').select('*');
      if (error) throw error;
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  updateDriver: async (data) => {
    const updateData = {};
    if ('cnic_front_url' in data) updateData.cnic_front_url = data.cnic_front_url;
    if ('driving_license_url' in data) updateData.driving_license_url = data.driving_license_url;
    if ('is_approved' in data) updateData.is_approved = data.is_approved;
    if ('availability_status' in data) updateData.availability_status = data.availability_status;

    if (Object.keys(updateData).length === 0) {
      throw new Error('No valid fields to update');
    }

    const { data: result, error } = await supabase
      .from('drivers')
      .update(updateData)
      .eq('user_id', data.user_id);

    if (error) throw error;
    return result;
  },

  deleteDriver: async (driverId) => {
    try {
      const { data, error } = await supabase
        .from('drivers')
        .delete()
        .eq('user_id', driverId);

      if (error) throw error;
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
