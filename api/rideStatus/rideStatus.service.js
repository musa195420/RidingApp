const supabase = require('../../config/database');

module.exports = {
  createRideStatus: async (data) => {
    const { ride_id, status, note } = data;

    const { data: result, error } = await supabase
      .from('ride_status_history')
      .insert([
        {
          ride_id,
          status,
          note,
        },
      ]);

    if (error) throw new Error(error.message);
    return result;
  },

  getAllRideStatuses: async () => {
    const { data: result, error } = await supabase
      .from('ride_status_history')
      .select('*')
      .order('changed_at', { ascending: false });

    if (error) throw new Error(error.message);
    return result;
  },

  getStatusByRideId: async (ride_id) => {
    const { data: result, error } = await supabase
      .from('ride_status_history')
      .select('*')
      .eq('ride_id', ride_id)
      .order('changed_at', { ascending: false });

    if (error) throw new Error(error.message);
    return result;
  },
};
