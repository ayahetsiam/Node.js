const express = require("express");
const router = express.Router();
const newUserHandler = require("../../controllers/registerController");

router.route("/").post(newUserHandler);

module.exports = router;
