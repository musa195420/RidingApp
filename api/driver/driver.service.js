const path = require('path');
const supabase = require('../../config/database');

async function createDriver(data) {
  const {
    user_id,
    cnic_front_url,
    driving_license_url,
    is_approved,
    availability_status,
  } = data;

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
}

async function replaceFile({ bucket, userId, label, file }) {
  console.log('🔄 replaceFile called with:', {
    bucket,
    userId,
    label,
    fileInfo: {
      originalname: file?.originalname,
      mimetype: file?.mimetype,
      size: file?.size,
    },
  });

  if (!file) {
    throw new Error(`${label} file is required`);
  }

  const column = label === 'cnic' ? 'cnic_front_url' : 'driving_license_url';

  let oldUrl = null;
  try {
    const { data: userRow } = await supabase
      .from('drivers')
      .select(column)
      .eq('user_id', userId)
      .maybeSingle(); // safer alternative to .single()

    oldUrl = userRow?.[column];
  } catch (fetchErr) {
    console.error('⚠️ Failed to fetch existing driver row:', fetchErr);
  }

  if (oldUrl) {
    const oldPath = oldUrl.split(`/${bucket}/`)[1];
    console.log('🧹 Deleting old file at:', oldPath);
    if (oldPath) {
      try {
        await supabase.storage.from(bucket).remove([oldPath]);
      } catch (remErr) {
        console.error('❌ Error deleting old file:', remErr);
      }
    }
  }

  const ext = path.extname(file.originalname);
  const newPath = `${userId}/${label}_${Date.now()}${ext}`;

  console.log('📤 Uploading new file to:', newPath);
  const { data: uploaded, error: upErr } = await supabase.storage
    .from(bucket)
    .upload(newPath, file.buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

  if (upErr) {
    console.error('❌ File upload failed:', upErr);
    throw upErr;
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(newPath);

  console.log('✅ File uploaded. Public URL:', publicUrlData.publicUrl);
  return publicUrlData.publicUrl;
}

async function uploadDriverDocsService({ userId, cnicFile, licenseFile }) {
  console.log('🚚 Uploading driver docs for user ID ==> ', userId);
  if (!userId) throw new Error('userId is required');

  const payload = { user_id: userId };

  if (cnicFile) {
    console.log('📎 Uploading CNIC file...');
    payload.cnic_front_url = await replaceFile({
      bucket: 'cnic',
      userId,
      label: 'cnic',
      file: cnicFile,
    });
  }

  if (licenseFile) {
    console.log('📎 Uploading license file...');
    payload.driving_license_url = await replaceFile({
      bucket: 'license',
      userId,
      label: 'license',
      file: licenseFile,
    });
  }

  console.log('📥 Upserting payload to drivers table:', payload);

  const { data, error } = await supabase
    .from('drivers')
    .upsert(payload, {
      onConflict: 'user_id',
      returning: 'representation',
    });

  if (error) {
    console.error('❌ Error during upsert:', error);
    throw error;
  }

  console.log('✅ Upsert successful');
  return data?.[0] ?? null;
}

async function getDriverById(driverId) {
  console.log('🔍 Getting driver by ID:', driverId);
  const { data, error } = await supabase
    .from('drivers')
    .select('*')
    .eq('user_id', driverId)
    .single();
  if (error) throw error;
  return data;
}

async function getAllDrivers() {
  console.log('📋 Getting all drivers...');
  const { data, error } = await supabase.from('drivers').select('*');
  if (error) throw error;
  return data;
}

async function updateDriver(data) {
  console.log('✏️ Updating driver with data:', data);
  const updateData = {};
  if ('cnic_front_url' in data) updateData.cnic_front_url = data.cnic_front_url;
  if ('driving_license_url' in data)
    updateData.driving_license_url = data.driving_license_url;
  if ('is_approved' in data) updateData.is_approved = data.is_approved;
  if ('availability_status' in data)
    updateData.availability_status = data.availability_status;

  if (!Object.keys(updateData).length)
    throw new Error('No valid fields to update');

  const { data: result, error } = await supabase
    .from('drivers')
    .update(updateData)
    .eq('user_id', data.user_id);
  if (error) throw error;
  return result;
}

async function deleteDriver(driverId) {
  console.log('🗑️ Deleting driver with ID:', driverId);
  const { data, error } = await supabase
    .from('drivers')
    .delete()
    .eq('user_id', driverId);
  if (error) throw error;
  return data;
}

module.exports = {
  createDriver,
  getDriverById,
  getAllDrivers,
  updateDriver,
  deleteDriver,
  replaceFile,
  uploadDriverDocsService,
};
