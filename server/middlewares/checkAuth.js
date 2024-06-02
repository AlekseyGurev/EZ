const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sign = process.env.JWT_SECRET;

async function checkAuth(req, res, next) {
  try {
    const tokenData = jwt.verify(req.cookies.token, sign);
    const user = await User.findOne({ login: tokenData.login });
    if (!user) {
      res.send({ error: 'Auth user not found' });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.send({ error: 'Auth user not found' });
    return;
  }
}

module.exports = checkAuth;
