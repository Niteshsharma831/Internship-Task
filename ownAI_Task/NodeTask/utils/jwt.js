const jwt = require("jsonwebtoken");

function signJwt(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET || "secret", {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
}

function verifyJwt(token) {
  return jwt.verify(token, process.env.JWT_SECRET || "secret");
}

module.exports = { signJwt, verifyJwt };
