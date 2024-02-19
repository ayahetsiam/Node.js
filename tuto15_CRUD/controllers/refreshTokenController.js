const User = require("../models/Users");
const jwt = require("jsonwebtoken");

const refreshTokenHandler = async (req, res) => {
  const { jwt: refreshToken } = req.cookies; // Utilisation de la déstructuration pour extraire jwt du cookie
  console.log(refreshToken);

  if (!refreshToken) {
    return res.status(401).json({ error: "No refreshToken provided" });
  }

  const foundUser = User.findOne(
    { refreshToken }
  ).exec();

  if (!foundUser) {
    return res.status(403).json({ error: "Invalid refreshToken" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
    if (err || foundUser.username !== decode.username) {
      return res.status(403).json({ error: "Invalid refreshToken" });
    }

    const accessToken = jwt.sign(
      { username: decode.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    res.json({ accessToken });
  });
};

module.exports = refreshTokenHandler;
