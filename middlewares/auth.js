const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const authConfig = require('../config/auth');

module.exports = {
  async authHeader(req, res, next) {
    const auth = req.headers.authorization;

    if (!auth) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const [, token] = auth.split(' ');

    try {
      const decoded = await promisify(jwt.verify)(token, authConfig.secret);

      req.userId = decoded.id;

      return next();
    } catch (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
  },
};
