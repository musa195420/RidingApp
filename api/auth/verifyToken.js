// verifyToken.js  (factory version)
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const checkToken = (allowRefresh = false) => (req, res, next) => {
  let token = req.headers.authorization || '';

  if (!token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token missing' });
  }

  token = token.slice(7);

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (allowRefresh) {
        jwt.verify(token, REFRESH_TOKEN_SECRET, (err2, decoded2) => {
          if (err2) return res.status(403).json({ message: 'Invalid token: ' + err2.message });

          req.user = decoded2;
          next();
        });
      } else {
        return res.status(403).json({ message: 'Invalid token: ' + err.message });
      }
    } else {
      req.user = decoded;
      next();
    }
  });
};

module.exports = checkToken;     // ← export the factory
