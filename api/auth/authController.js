// CommonJS – authController.js
const supabase = require('../../config/database');
const jwt = require('jsonwebtoken');
const {
  generateAccessToken,
  generateRefreshToken,
  deleteRefreshToken,
  isRefreshTokenValid,
} = require('./tokenService');

const { REFRESH_TOKEN_SECRET, TOKEN_TIME } = process.env;

/* ────────── Register ────────── */
const register = async (req, res) => {
  const { email, password, fullName, phone } = req.body;
  try {
    // 1) Supabase Auth
    const { data: authUser, error: authErr } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });
    if (authErr)
      return res.status(400).json({ success: false, message: authErr.message });

    // 2) Profile row
    const { error: profileErr } = await supabase.from('profiles').insert({
      user_id: authUser.user.id,
      full_name: fullName,
      phone,
    });
    if (profileErr)
      return res
        .status(400)
        .json({ success: false, message: profileErr.message });

    return res
      .status(201)
      .json({ success: true, message: 'User registered', userId: authUser.user.id });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: 'Server error', error: err.message });
  }
};

/* ────────── Login ────────── */
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error)
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password' });

    const payload = { id: data.user.id, email: data.user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);

    const expiresAt = new Date(
      Date.now() + parseInt(TOKEN_TIME) * 60 * 60 * 1000,
    ).toISOString();

    return res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
      expiresAt,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: 'Server error', error: err.message });
  }
};

/* ────────── Refresh Token ────────── */
const refreshTokenHandler = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res
        .status(401)
        .json({ success: false, message: 'Refresh token required' });

    if (!(await isRefreshTokenValid(refreshToken)))
      return res
        .status(403)
        .json({ success: false, message: 'Invalid refresh token' });

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, user) => {
      if (err)
        return res
          .status(403)
          .json({ success: false, message: 'Invalid refresh token' });

      await deleteRefreshToken(refreshToken); // rotation

      const payload = { id: user.id, email: user.email };
      const newAccessToken = generateAccessToken(payload);
      const newRefreshToken = await generateRefreshToken(payload);

      const expiresAt = new Date(
        Date.now() + parseInt(TOKEN_TIME) * 60 * 60 * 1000,
      ).toISOString();

      return res.status(200).json({
        success: true,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expiresAt,
      });
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: 'Server error', error: err.message });
  }
};

/* ────────── Logout ────────── */
const logout = async (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken) await deleteRefreshToken(refreshToken);
  return res.sendStatus(204);
};

module.exports = {
  register,
  login,
  refreshTokenHandler,
  logout,
};
