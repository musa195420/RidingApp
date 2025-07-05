// modules/roles/role.service.js
const supabase = require('../../config/database');

module.exports = {
  /* ───────── Create ───────── */
  createRole: async (data) => {
    const { data: result, error } = await supabase.from('roles').insert([data]);
    if (error) throw new Error(error.message);
    return result;
  },

  /* ───────── Read (by id) ───────── */
  getRoleById: async (id) => {
    const { data: result, error } = await supabase
      .from('roles')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return result;
  },

  /* ───────── Read (by code) ───────── */
  getRoleByCode: async (code) => {
    const { data: result, error } = await supabase
      .from('roles')
      .select('*')
      .eq('code', code)
      .single();
    if (error) throw new Error(error.message);
    return result;
  },

  /* ───────── Read (all) ───────── */
  getAllRoles: async () => {
    const { data: results, error } = await supabase.from('roles').select('*');
    if (error) throw new Error(error.message);
    return results;
  },

  /* ───────── Update ───────── */
  updateRole: async (data) => {
    const { id, ...fieldsToUpdate } = data;
    const { data: result, error } = await supabase
      .from('roles')
      .update(fieldsToUpdate)
      .eq('id', id);
    if (error) throw new Error(error.message);
    return result;
  },

  /* ───────── Delete ───────── */
  deleteRole: async (id) => {
    const { error } = await supabase.from('roles').delete().eq('id', id);
    if (error) throw new Error(error.message);
  },
};
