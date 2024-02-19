const express = require("express");
const router = express.Router();
const userLoginHandeler = require("../../controllers/authentificationController");

router.route("/").post(userLoginHandeler);

module.exports = router;
