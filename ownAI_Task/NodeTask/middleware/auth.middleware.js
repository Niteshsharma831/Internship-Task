const { verifyJwt } = require("../utils/jwt");
const { AppDataSource } = require("../data-source");

async function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing" });
  }
  try {
    const token = header.split(" ")[1];
    const decoded = verifyJwt(token);
    const userRepo = AppDataSource.getRepository("User");
    const user = await userRepo.findOneBy({ id: decoded.userId });
    if (!user) return res.status(401).json({ message: "Invalid token" });
    req.user = user;
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
