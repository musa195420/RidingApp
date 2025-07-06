const supabase = require('../../config/database');

module.exports = {
  /* ---------- CREATE ---------- */
  createRide: async (data) => {
    // Expected fields: passenger_id, driver_id, pickup_text, drop_text,
    // pickup_point, drop_point, ride_type, fare_estimate
    const insertData = {
      passenger_id: data.passenger_id,
      driver_id: data.driver_id ?? null,
      pickup_text: data.pickup_text,
      drop_text: data.drop_text,
      pickup_point: data.pickup_point ?? null,
      drop_point: data.drop_point ?? null,
      ride_type: data.ride_type,
      fare_estimate: data.fare_estimate ?? null,
      status: 'requested',
    };

    const { data: result, error } = await supabase.from('rides').insert([insertData]);
    if (error) throw new Error(error.message);
    return result;
  },

  /* ---------- READ ---------- */
  /** Single ride by *id* (numeric PK) */
  getRideById: async (id) => {
    const { data: result, error } = await supabase
      .from('rides')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    return result;
  },

  /** All rides in the table */
  getAllRides: async () => {
    const { data: results, error } = await supabase.from('rides').select('*');
    if (error) throw new Error(error.message);
    return results;
  },

  /**
   * All rides where the supplied `userId` is either the passenger *or* driver.
   * (Assumes `userId` equals the `profiles.id` PK you store in `rides.passenger_id/driver_id`)
   */
  getRidesByUserId: async (userId) => {
    if (!userId) throw new Error('user_id is required');

    const { data: results, error } = await supabase
      .from('rides')
      .select('*')
      // Supabase `.or()` uses a PostgREST filter string
      .or(`passenger_id.eq.${userId},driver_id.eq.${userId}`)
     ;

    if (error) throw new Error(error.message);
    return results;
  },

  /* ---------- UPDATE ---------- */
  updateRide: async (data) => {
    const { id, ...fieldsToUpdate } = data;
    if (!id) throw new Error('Ride ID is required');

    const { data: result, error } = await supabase
      .from('rides')
      .update(fieldsToUpdate)
      .eq('id', id);

    if (error) throw new Error(error.message);
    return result;
  },

  /* ---------- DELETE ---------- */
  deleteRide: async (id) => {
    const { error } = await supabase.from('rides').delete().eq('id', id);
    if (error) throw new Error(error.message);
  },
};
