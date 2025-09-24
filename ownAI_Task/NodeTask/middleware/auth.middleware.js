const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains { userId, role }
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ message: "Not authenticated" });
    if (req.user.role !== role)
      return res.status(403).json({ message: "Forbidden" });
    next();
  };
}

module.exports = { authMiddleware, requireRole };
