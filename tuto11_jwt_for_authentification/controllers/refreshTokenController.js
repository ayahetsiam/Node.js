require("dotenv").config();
const jwt = require("jsonwebtoken");

const refreshTokenHandler = async (req, res) => {
  const { jwt: refreshToken } = req.cookies; // Utilisation de la déstructuration pour extraire jwt du cookie
  console.log(refreshToken);

  if (!refreshToken) {
    return res.status(401).json({ error: "No refreshToken provided" });
  }

  const foundUser = userDB.users.find(
    (person) => person.refreshToken === refreshToken
  );

  if (!foundUser) {
    return res.status(403).json({ error: "Invalid refreshToken" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
    if (err || foundUser.username !== decode.username) {
      return res.status(403).json({ error: "Invalid refreshToken" });
    }
    const role = Object.values(foundUser.role);
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: decode.username,
          role: role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    res.json({ accessToken });
  });
};

module.exports = refreshTokenHandler;
