const supabase = require('../../config/database');
const jwt = require('jsonwebtoken');
const {
  generateAccessToken,
  generateRefreshToken,
  deleteRefreshToken,
  isRefreshTokenValid,
} = require('./tokenService');

const { createProfile } = require('../profile/profile.service');

const { REFRESH_TOKEN_SECRET, TOKEN_TIME } = process.env;

/* ────────── Register ────────── */
/* ────────── Register ────────── */
const register = async (req, res) => {
  const {
    email,
    password,
    full_name,
    phone,
    role_id,
    profile_image,
  } = req.body;

  try {
    /** 1) create auth user */
    const { data: authUser, error: authErr } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (authErr) {
      return res
        .status(400)
        .json({ success: false, status: 400, message: authErr.message });
    }

    /** 2) create profile via service */
    try {
      await createProfile({
        user_id: authUser.user.id,
        full_name: full_name,
        phone,
        role_id,
        email,
        profile_image,
      });
    } catch (profileErr) {
      // rollback orphan auth user so client can retry safely
      await supabase.auth.admin.deleteUser(authUser.user.id);
      return res
        .status(400)
        .json({ success: false, status: 400, message: profileErr.message });
    }

    /** 3) done */
    return res.status(201).json({
      success: true,
      status: 201,
      message: 'User registered',
      userId: authUser.user.id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      status: 500,
      message: 'Server error',
      error: err.message,
    });
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

    if (error) {
      return res.status(401).json({
        data: {
          success: false,
          status: 401,
          message: 'Invalid email or password',
        },
      });
    }

    const payload = { id: data.user.id, email: data.user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);

    const expiresAt = new Date(
      Date.now() + parseInt(TOKEN_TIME) * 60 * 60 * 1000,
    ).toISOString();

    return res.status(200).json({
      data: {
        success: true,
        status: 200,
        message: 'Login successful',
        accessToken,
        refreshToken,
        expiresIn: expiresAt,
      },
    });
  } catch (err) {
    return res.status(500).json({
      data: {
        success: false,
        status: 500,
        message: 'Server error',
        error: err.message,
      },
    });
  }
};

/* ────────── Refresh Token ────────── */
const refreshTokenHandler = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        data: {
          success: false,
          status: 401,
          message: 'Refresh token required',
        },
      });
    }

    if (!(await isRefreshTokenValid(refreshToken))) {
      return res.status(403).json({
        data: {
          success: false,
          status: 403,
          message: 'Invalid refresh token',
        },
      });
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, user) => {
      if (err) {
        return res.status(403).json({
          data: {
            success: false,
            status: 403,
            message: 'Invalid refresh token',
          },
        });
      }

      await deleteRefreshToken(refreshToken);

      const payload = { id: user.id, email: user.email };
      const newAccessToken = generateAccessToken(payload);
      const newRefreshToken = await generateRefreshToken(payload);

      const expiresAt = new Date(
        Date.now() + parseInt(TOKEN_TIME) * 60 * 60 * 1000,
      ).toISOString();

      return res.status(200).json({
        data: {
          success: true,
          status: 200,
          message: 'Token refreshed',
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          expiresIn: expiresAt,
        },
      });
    });
  } catch (err) {
    return res.status(500).json({
      data: {
        success: false,
        status: 500,
        message: 'Server error',
        error: err.message,
      },
    });
  }
};

/* ────────── Logout ────────── */
const logout = async (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken) await deleteRefreshToken(refreshToken);

  return res.status(204).json({
    data: {
      success: true,
      status: 204,
      message: 'Logged out',
    },
  });
};

module.exports = {
  register,
  login,
  refreshTokenHandler,
  logout,
};
