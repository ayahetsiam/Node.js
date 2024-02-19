const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const bcrypt = require("bcrypt");

const userLoginHandeler = async (req, res) => {
  const { user, pwd } = req.body;
  console.log(req.body);
  if (!user || !pwd) {
    res.status(400).json({ erreur: "user et pwd sont obligatoire" });
  } else {
    console.log(user);
    const foundUser = User.findOne({username:user}).exec;
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
        foundUser.refreshToken = refreshToken;

        const result = foundUser.save();

        console.log(result);

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
