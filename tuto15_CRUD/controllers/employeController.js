const Employee = require("../models/Employee");

const getAllEmployes = async (req, res) => {
  const employees = await Employee.find();
  if (!employees) {
    return res.sendStatus(204);
  }
  res.json(employees);
};

const createEmploye = async (req, res) => {
  if (!req.body.nom || !req.body.prenom) {
    return res.status(403).send("nom et prenom vides!");
  }
  const result = await Employee.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });
  console.log(result);
  res.status(201);
};

const updateEmploye = async (req, res) => {
  if (!req.body.id) {
    res.status(403).send("User non valide!");
  } else {
    const updateEmployee = Employee.findOne({ _id: req.body.id }).exec();

    if (!updateEmployee) {
      return res.status(404).send("Employee not found!");
    }
    if (!req.body?.firstname) {
      updateEmploye.firstname = req.body.firstname;
    }
    if (!req.body?.lastname) {
      updateEmploye.lastname = req.body.lastname;
    }
    const result = await Employee.save(updateEmploye);
    console.log(result);
    res.sendStatus(200);
  }
};

const deleteEmploye = async (req, res) => {
  if (!req.body.id) {
    res.status(403).send("erreur");
  } else {
    const deleteEmploye = Employee.findOne({ _id: req.body.id }).exec();
    if (!deleteEmploye) {
      return res.status(404).send("Not found");
    }
    const result = await Employee.deleteOne({ _id: req.body.id });
    console.log(result);
    res.status(200).send(data.employes);
  }
};

const getEmploye = async (req, res) => {
  if (!req.params.id) {
    return res.status(403).send("erreur");
  }
  const employe = await Employee.findOne({ _id: req.params.id }).exec();
  if (!employe) {
    return res.status(404).send("erreur:not found");
  }
  res.status(200).json(employe);
};

module.exports = {
  getAllEmployes,
  createEmploye,
  updateEmploye,
  deleteEmploye,
  getEmploye,
};
