const fsPromises = require("fs").promises;
const path = require("path");
const userDB = {
  users: require("../models/user.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const logoutHandler = async (req, res) => {
  const { jwt: refreshToken } = req.cookies;
  console.log(refreshToken);

  if (!refreshToken) {
    return res.status(401).json({ error: "No refreshToken provided" });
  }

  const foundUser = userDB.users.find(
    (person) => person.refreshToken === refreshToken
  );

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }

  const otherUsers = userDB.users.filter(
    (person) => person.refreshToken !== refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  userDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "models", "user.js"),
    JSON.stringify(userDB.users)
  );
  res.json({ accessToken });
    res.clearCookie("jwt", { httpOnly: true });
    res.sendStatus(204);
};

module.exports = logoutHandler;
