const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get the token fron header
  const rtoken = req.header('x-auth-token');

  // Check if not token
  if (!rtoken) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(rtoken, config.get('refreshSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Refresh Token is not Valid' });
  }
};
