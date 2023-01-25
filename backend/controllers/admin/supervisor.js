const db = require("../../models");
const Supervisor = db.supervisors;
const SupervisorAssignment = db.supervisorAssignments;
const Teacher = db.teachers;
const Op = db.Op;
const bcrypt = require("bcrypt");
const fs = require("fs");

// Create and Save a new Supervisor
exports.create = (req, res) => {
  const supervisor = {
    teacher_id: req.body.teacher,
    project_id: req.body.project,
  }
  Supervisor.create(supervisor)
    .then((data) => {
      res.status(201).json({ success: "Supervisor Registerd" });
    })
    .catch((err) => {
      res.status(201).json({ error: "Error while inseting data" });
    });
};

// Retrieve all Supervisors from the database.
exports.findAll = (req, res) => {
  Supervisor.findAll({
    order: [
      ['created_at', 'DESC'],
    ], include: Teacher
  })
    .then(result => {
      res.status(201).json({ result: result });
    })
    .catch(err => {
      res.status(201).json({ error: "Some error accurred while retrieving supervisors." });
    });
};

// Find a single Supervisor with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Supervisor.findByPk(id)
    .then(result => {
     res.status(201).json({ result: result });
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Supervisor with id = ${id}`
      });
    });
};

// Delete a Supervisor with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  const project_id = req.params.project_id;
  Supervisor.destroy({
    where: { teacher_id: id, project_id: project_id }
  })
    .then(num => {
      if (num) {
        SupervisorAssignment.destroy({
          where: { teacher_id: id, project_id: project_id }
        })
          .then(num => {
            if (num) {
              res.json({
                success: "Supervisor was deleted successfully!"
              });
            } else {
              res.json({
                success: `Cannot delete Assignment`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Assignment"
            });
          });
      } else {
        res.json({
          message: `Cannot delete Supervisor with id=${id}. Maybe Supervisor was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Supervisor with id=" + id
      });
    });
};

