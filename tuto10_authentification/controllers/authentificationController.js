const bcrypt = require("bcrypt");
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
        res.status(200).send("authentification succesful!");
      } else {
        res.status(403).json({ erreur: "j'ai trouvé mais il y a un problème" });
      }
    } else {
      res.status(404).json({ erreur: "j'ai pas trouvé" });
    }
  }
};

module.exports = userLoginHandeler;
