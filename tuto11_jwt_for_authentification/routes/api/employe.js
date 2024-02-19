const express = require("express");
const router = express.Router();
const employeController = require("../../controllers/employeController");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/role_list");

router
  .route("/")
  .get(employeController.getAllEmployes)
  .post(verifyRoles(ROLES_LIST.admin, ROLES_LIST.user), employeController.createEmploye)
  .put(employeController.updateEmploye)
  .delete(employeController.deleteEmploye);

router.route("/:id")
  .get(employeController.getEmploye);

module.exports = router;
