const User = require("../models/Users");
const bcrypt = require("bcrypt");

async function newUserHandler(req, res) {
  console.log("comming");
  const { user, pwd } = req.body;
  console.log(req.body);

  if (!user || !pwd) {
    console.log("debut");
    res.status(400).json({ erreur: "user et password sont vide!" });
  } else {
    //verification de dupication
    const duplicated = await User.findOne({ username: user }).exec();
    if (duplicated) {
      res.status(409).json({ erreur: "user exist dejà!" });
    } else {
      console.log("encours");
      try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const result = User.create({
          username: user,
          password: hashedPwd,
        });
        console.log("finish");
        console.log(result);
        res.status(201).send("register successful");
      } catch (err) {
        res.status(500).json({ erreur: "register send" });
      }
    }
  }
}

module.exports = newUserHandler;
