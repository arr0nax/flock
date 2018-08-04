const jwt = require('jsonwebtoken');

export default function generateToken(req, res, next) {
  req.token = jwt.sign({
    id: req.user.id,
  }, 'server secret', {
    expiresInMinutes: 120
  });
  next();
}
