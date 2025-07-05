const supabase = require('../../config/database');

module.exports = {
  createVehicle: async (data) => {
    const { error, data: result } = await supabase.from('vehicles').insert([data]);
    if (error) throw new Error(error.message);
    return result;
  },

  getVehicleById: async (id) => {
    const { data: result, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return result;
  },

  getAllVehicles: async () => {
    const { data: results, error } = await supabase.from('vehicles').select('*');
    if (error) throw new Error(error.message);
    return results;
  },

  updateVehicle: async (data) => {
    const { id, ...fieldsToUpdate } = data;
    const { error, data: result } = await supabase
      .from('vehicles')
      .update(fieldsToUpdate)
      .eq('id', id);
    if (error) throw new Error(error.message);
    return result;
  },

  deleteVehicle: async (id) => {
    const { error } = await supabase.from('vehicles').delete().eq('id', id);
    if (error) throw new Error(error.message);
  },
};
