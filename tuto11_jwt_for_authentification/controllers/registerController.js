const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");
const userDB = {
  users: require("../models/user.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const newUserHandler = async (req, res) => {
  const { user, pwd } = req.body;
  console.log(req.body);

  if (!user || !pwd) {
    res.status(400).json({ erreur: "user et password sont vide!" });
  } else {
    //verification de dupication
    const duplicated = userDB.users.find((person) => person.username === user);
    if (duplicated) {
      res.status(409).json({ erreur: "user exist dejà!" });
    } else {
      try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const newUser = {
          username: user,
          role: { user: 2001 },
          password: hashedPwd,
        };
        userDB.setUsers([...userDB.users, newUser]);
        await fsPromises.writeFile(
          path.join(__dirname, "..", "models", "user.json"),
          JSON.stringify(userDB.users)
        );
        res.status(201).send("register successful");
      } catch (err) {
        res.status(500).json({ erreur: "register send" });
      }
    }
  }
};

module.exports = newUserHandler;
