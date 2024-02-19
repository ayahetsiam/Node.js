const express = require("express");
const router = express.Router();
const newUserHandler = require("../../controllers/registerController");
//console.log(newUserHandler())
router.route("/").post(newUserHandler);

module.exports = router;
