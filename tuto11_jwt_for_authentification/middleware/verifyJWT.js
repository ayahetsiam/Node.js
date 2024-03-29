require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader?.startsWith("Bearer")) {
    return res.sendStatus(401);
  }
  console.log(authHeader);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = decode.userInfo.user;
    req.roles = decode.userInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
