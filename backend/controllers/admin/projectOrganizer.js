const db = require("../../models");
const ProjectOrganizer = db.projectOrganizers;
const Teacher = db.teachers;
const Op = db.Op;
const bcrypt = require("bcrypt");
const fs = require("fs");

// Create and Save a new ProjectOrganizer
exports.create = (req, res) => {
  const po = {
    discipline: req.body.discipline,
    session: req.body.session,
    teacher_id: req.body.teacher,
  }

  ProjectOrganizer.findAll({
    where: {
      discipline: req.body.discipline,
      session: req.body.session,
      teacher_id: req.body.teacher,
    }
  })
    .then(result => {
      console.log(result)
      if (result[0]) {
        res.status(201).json({ error: "Project Organizer Already Allotted" });
      }else{
        ProjectOrganizer.create(po)
          .then((data) => {
            res.status(201).json({ success: "Project Organizer Created" });
          })
          .catch((err) => {
            res.status(201).json({ error: "Error while inseting data" });
          });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: `Error retrieving Project Organizer with id = ${id}`
            });
          });
};

// Retrieve all ProjectOrganizers from the database.
exports.findAll = (req, res) => {

  ProjectOrganizer.findAll({
    order: [
      ['created_at', 'DESC'],
    ], include: Teacher
  })
    .then(result => {
      res.status(201).json({ result: result });
    })
    .catch(err => {
      res.status(201).json({ error: "Some error accurred while retrieving projectOrganizers." });
    });
};

// Find a single ProjectOrganizer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ProjectOrganizer.findByPk(id)
    .then(result => {
      res.status(201).json({ result: result });
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving ProjectOrganizer with id = ${id}`
      });
    });
};

// Delete a ProjectOrganizer with the specified id in the request
exports.delete = (req, res) => {

  const id = req.params.id;
  ProjectOrganizer.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.json({
          message: "Project Organizer deleted successfully!"
        });
      } else {
        res.json({
          message: `Cannot delete ProjectOrganizer with id=${id}. Maybe ProjectOrganizer was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete ProjectOrganizer with id=" + id
      });
    });
};