const supabase = require('../../config/database');

module.exports = {
  createProfile: async (data) => {
    const { error, data: result } = await supabase.from('profiles').insert([data]);
    if (error) throw new Error(error.message);
    return result;
  },

  getProfileById: async (id) => {
    const { data: result, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', id)
      .single();
    if (error) throw new Error(error.message);
    return result;
  },

  getAllProfiles: async () => {
    const { data: results, error } = await supabase.from('profiles').select('*');
    if (error) throw new Error(error.message);
    return results;
  },

  updateProfile: async (data) => {
    const { user_id, ...fieldsToUpdate } = data;
    const { error, data: result } = await supabase
      .from('profiles')
      .update(fieldsToUpdate)
      .eq('user_id', user_id);
    if (error) throw new Error(error.message);
    return result;
  },

  deleteProfile: async (id) => {
    const { error } = await supabase.from('profiles').delete().eq('user_id', id);
    if (error) throw new Error(error.message);
  },

   getProfileByEmail: async (email) => {
    const { data: result, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single();
    if (error) throw new Error(error.message);
    return result;
  },
};
