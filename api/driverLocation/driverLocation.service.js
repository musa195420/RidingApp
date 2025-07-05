const supabase = require('../../config/database');

module.exports = {
  createDriverLocation: async (data) => {
    const { driver_id, current_point } = data;
    const { data: result, error } = await supabase
      .from('driver_locations')
      .insert([{ driver_id, current_point }]);
    if (error) throw new Error(error.message);
    return result;
  },

  getDriverLocationById: async (driver_id) => {
    const { data: result, error } = await supabase
      .from('driver_locations')
      .select('*')
      .eq('driver_id', driver_id)
      .single();
    if (error) throw new Error(error.message);
    return result;
  },

  getAllDriverLocations: async () => {
    const { data: results, error } = await supabase.from('driver_locations').select('*');
    if (error) throw new Error(error.message);
    return results;
  },

  updateDriverLocation: async (data) => {
    const { driver_id, current_point } = data;
    const { data: result, error } = await supabase
      .from('driver_locations')
      .update({ current_point, updated_at: new Date().toISOString() })
      .eq('driver_id', driver_id);
    if (error) throw new Error(error.message);
    return result;
  },

  deleteDriverLocation: async (driver_id) => {
    const { error } = await supabase
      .from('driver_locations')
      .delete()
      .eq('driver_id', driver_id);
    if (error) throw new Error(error.message);
  },
};
