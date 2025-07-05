// CommonJS – tokenService.js
const jwt = require('jsonwebtoken');
const supabase = require('../../config/database');

const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  TOKEN_TIME = 3,
} = process.env;

/* ────────── Access Token ────────── */
const generateAccessToken = (payload) =>
  jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: `${TOKEN_TIME}h` });

/* ────────── Refresh Token (DB‑backed) ────────── */
const generateRefreshToken = async (payload) => {
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET);

  const { error } = await supabase.from('refresh_tokens').insert({
    token: refreshToken,
    user_id: payload.id,
  });

  if (error) {
    console.error('❌ Failed to insert refresh token:', error.message);
    throw new Error('Failed to store refresh token');
  }
  return refreshToken;
};

/* ────────── Validate Refresh Token ────────── */
const isRefreshTokenValid = async (token) => {
  const { data } = await supabase
    .from('refresh_tokens')
    .select('token')
    .eq('token', token)
    .maybeSingle();
  return !!data;
};

/* ────────── Delete Refresh Token ────────── */
const deleteRefreshToken = async (token) =>
  supabase.from('refresh_tokens').delete().eq('token', token);

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  isRefreshTokenValid,
  deleteRefreshToken,
};
