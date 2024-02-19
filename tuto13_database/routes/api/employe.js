const express = require("express");
const router = express.Router();
const employeController = require("../../controllers/employeController");

router
  .route("/")
  .get(employeController.getAllEmployes)
  .post(employeController.createEmploye)
  .put(employeController.updateEmploye)
  .delete(employeController.deleteEmploye);

router.route("/:id")
  .get(employeController.getEmploye);

module.exports = router;
