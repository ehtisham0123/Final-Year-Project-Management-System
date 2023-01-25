const db = require("../../models");
const Assignment = db.assignments;
const AssignmentSubmission = db.assignmentSubmissions;
const Teacher = db.teachers;
const ProjectOrganizer = db.projectOrganizers;
const Op = db.Op;
const bcrypt = require("bcrypt");
const fs = require("fs");

// Create and Save a new Assignment
exports.create = (req, res) => {
  const assignment = {
    file: null,
    student_id: req.user_id,
    assignment_id: req.body.id,
    file_type: ''
  };

  if (req.files !== null) {
    const file = req.files.file;
    let assignmentName = file.name.split(".");
    assignment.file_type = assignmentName[assignmentName.length - 1];
    assignmentName = assignmentName[0] + "." + Date.now() + "." + assignmentName[assignmentName.length - 1];
    assignment.file = assignmentName;
    file.mv(
      `${__dirname}/../../../frontend/public/uploads/${assignmentName}`,
      (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
    AssignmentSubmission.create(assignment)
      .then((result) => {
        res.status(201).json({ result: result });
      })
      .catch((err) => {
        res.status(201).json({ error: "Error while inseting result" });
      });
  } else {
    res.status(201).json({ error: "No file attached" });
  }
};

// Retrieve all Assignments from the database.
exports.findAll = (req, res) => {

  let session = req.user_session;
  let discipline = req.user_discipline;

  Assignment.findAll({
     order: [
        ['created_at', 'DESC'],
      ],
    where: {
      session: session,
      discipline: discipline,
    }
  })
    .then(result => {
      if (result) {
      res.status(201).json({ result: result });
      }else{
        res.status(201).json({ success: "No assignments." });
      }
    })
    .catch(err => {
      res.status(201).json({ error: "Some error accurred while retrieving assignments." });
    });
};



// Find a single Assignment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Assignment.findByPk(id)
    .then(result => {
      AssignmentSubmission.findOne({
        where: { assignment_id: id, student_id: req.user_id }
      })
        .then(assignmentData => {
          if (assignmentData) {
            res.status(201).json({ result: result, assignmentData: assignmentData });
          } else {
            res.status(201).json({ result: result });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: `Error retrieving Assignment with id = ${id}`
          });
        });
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Assignment with id = ${id}`
      });
    });
};

// Delete a Assignment with the specified id in the request
exports.delete = (req, res) => {

  const id = req.params.id;
  AssignmentSubmission.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.json({
          success: "Assignment was deleted successfully!"
        });
      } else {
        res.json({
          message: `Cannot delete Assignment with id=${id}. Maybe Assignment was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Assignment with id=" + id
      });
    });
};
