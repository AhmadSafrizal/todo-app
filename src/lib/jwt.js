const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET_KEY;
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    secret,
    { expiresIn: "1h" }
  );
};

const verifyToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

module.exports = { generateToken, verifyToken };
