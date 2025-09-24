const jwt = require("jsonwebtoken");

// Load JWT secret and expiration from environment variables
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

function signJwt(payload) {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined in environment");
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function verifyJwt(token) {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined in environment");
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { signJwt, verifyJwt };
