const express = require("express");
const router = express.Router();
data = {};
data.employe = require("../../data/employe.json");

router
  .route("/")
  .get((req, res) => {
    res.json(data.employe);
  })
  .post((req, res) => {
    res.json({
      "prenom": req.body.prenom,
        "nom": req.body.nom,
      
    });
  })
  .put((req, res) => {
    res.json({
      prenom: req.body.prenom,
      nom: req.body.nom,
    });
  })
  .delete((req, res) => {
    res.json({ id: req.body.id });
  });

router.route("/:id").get((req, res) => {
  res.json({ id: req.params.id });
});

module.exports = router;
