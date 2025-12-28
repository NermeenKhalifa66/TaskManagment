
const jwt = require('jsonwebtoken');
const SECRET = 'your_secret_key';

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.sendStatus(401);

    // ✅ الصح
    req.userId = decoded.userId;

    next();
  });
};
