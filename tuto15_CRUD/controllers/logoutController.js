const User = require("../models/Users");

const logoutHandler = async (req, res) => {
  const { jwt: refreshToken } = req.cookies;
  console.log(refreshToken);

  if (!refreshToken) {
    return res.status(401).json({ error: "No refreshToken provided" });
  }

  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }

  foundUser.refreshToken = "";

  const result = foundUser.save();
  console.log(result);
  res.json({ accessToken });
  res.clearCookie("jwt", { httpOnly: true });
  res.sendStatus(204);
};

module.exports = logoutHandler;
