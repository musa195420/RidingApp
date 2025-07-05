const supabase = require('../../config/database');

module.exports = {
  createPassenger: async (data) => {
    try {
      const { data: result, error } = await supabase
        .from('passengers')
        .insert([{ user_id: data.user_id, verified: data.verified ?? false }]);

      if (error) throw error;
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  getPassengerById: async (userId) => {
    try {
      const { data: result, error } = await supabase
        .from('passengers')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  getAllPassengers: async () => {
    try {
      const { data: results, error } = await supabase.from('passengers').select('*');

      if (error) throw error;
      return results;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  updatePassenger: async (data) => {
    try {
      const updateData = {};

      if ('verified' in data) {
        updateData.verified = data.verified;
      }

      if (Object.keys(updateData).length === 0) {
        throw new Error('No valid fields to update');
      }

      const { data: result, error } = await supabase
        .from('passengers')
        .update(updateData)
        .eq('user_id', data.user_id);

      if (error) throw error;
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  deletePassenger: async (userId) => {
    try {
      const { data: result, error } = await supabase
        .from('passengers')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
