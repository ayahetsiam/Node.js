require("dotenv").config();
const jwt = require("jsonwebtoken");
const fsPromises = require("fs").promises;

const bcrypt = require("bcrypt");
const path = require("path");

const userDB = {
  users: require("../models/user.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const userLoginHandeler = async (req, res) => {
  const { user, pwd } = req.body;
  console.log(req.body);
  if (!user || !pwd) {
    res.status(400).json({ erreur: "user et pwd sont obligatoire" });
  } else {
    console.log(user);
    const foundUser = userDB.users.find((person) => person.username === user);
    console.log(foundUser);
    if (foundUser) {
      const isequal = await bcrypt.compare(pwd, foundUser.password);
      if (isequal) {
        //console.log(process.env.ACCESS_TOKEN_SECRET);
        //console.log(process.env.REFRESH_TOKEN_SECRET);
        const refreshToken = jwt.sign(
          { username: foundUser.username },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        const accessToken = jwt.sign(
          { username: foundUser.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" }
        );
        const otherUsers = userDB.users.filter(
          (person) => person.username !== foundUser.username
        );
        const currentUser = { ...foundUser, refreshToken };
        userDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(
          path.join(__dirname, "..", "models", "user.js"),
          JSON.stringify(userDB.users)
        );
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ accessToken });
      } else {
        res.status(403).json({ erreur: "j'ai trouvé mais il y a un problème" });
      }
    } else {
      res.status(404).json({ erreur: "j'ai pas trouvé" });
    }
  }
};

module.exports = userLoginHandeler;
