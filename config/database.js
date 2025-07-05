const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

try {
  const [, payloadB64] = process.env.SUPABASE_SERVICE_ROLE_KEY.split('.');
  const role = JSON.parse(Buffer.from(payloadB64, 'base64').toString()).role;
  console.log('🕵️  Supabase key role detected →', role);
} catch { console.log('Could not decode key'); }
console.log("✅ Supabase initialized with service role key");

module.exports = supabase;