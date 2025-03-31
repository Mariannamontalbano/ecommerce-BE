const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Nessun token fornito' });
  }
  // Il formato atteso è "Bearer <token>"
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Formato token non valido' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Imposta l'utente autenticato in req.user
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token non valido o scaduto' });
  }
};
