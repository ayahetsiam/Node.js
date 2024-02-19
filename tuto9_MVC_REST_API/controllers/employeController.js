const data = {
  employes: require("../models/employe.json"),
  setEmployee: function (data) {
    this.employes = data;
  },
};

const getAllEmployes = (req, res) => {
  res.json(data.employe);
};

const createEmploye = async (req, res) => {
  if (!req.body.nom || !req.body.prenom) {
    res.status(403).send("nom et prenom vides!");
  } else {
    newEmployee = {
      id:  1,
      nom: req.body.nom,
      prenom: req.body.prenom,
      };
      
    data.setEmployee([...data.employes, newEmployee]);
   
    res.status(200).send(data.employes);
  }
};

const updateEmploye = (req, res) => {
  if (!req.body.id) {
    res.status(403).send("User non valide!");
  } else {
    const oldEmployeeIndex = data.employes.findIndex(
      (employee) => employee.id === parseInt(req.body.id)
    );

    if (oldEmployeeIndex === -1) {
      res.status(404).send("Employee not found!");
    } else {
      const updatedEmployee = {
        id: req.body.id,
        nom: req.body.nom,
        prenom: req.body.prenom,
      };

      data.employes[oldEmployeeIndex] = updatedEmployee;

      res.status(200).send(data.employes);
    }
  }
}


const deleteEmploye = (req, res) => {
    if (!req.body.id) {
        res.status(403).send("erreur");
    } else {
        const oldEmploye = data.employes.find(
          (employe) => employe.id === parseInt(req.body.id)
        );
        if (!oldEmploye) {
            res.status(404).send("Not found");
        } else {
             data.employes.pop(oldEmploye);
             res.status(200).send(data.employes);
       }
    }
 
};

const getEmploye = (req, res) => {
     if (!req.params.id) {
       res.status(403).send("erreur");
     } else {
       const employeIndex = data.employes.findIndex((employe) => employe.id === parseInt(req.body.id));
       if (employeIndex === -1) {
         res.status(404).send("erreur:not found");
       } else {
         const Employe = data.employes.find(
           (employe) => employe.id === parseInt(req.params.id)
         );
         res.status(200).send(Employe);
       }  
     }

};

module.exports = {
  getAllEmployes,
  createEmploye,
  updateEmploye,
  deleteEmploye,
  getEmploye,
};
