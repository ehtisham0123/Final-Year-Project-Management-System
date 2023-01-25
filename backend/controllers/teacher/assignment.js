const db = require("../../models");
const Assignment = db.assignments;
const AssignmentSubmission = db.assignmentSubmissions;
const Teacher = db.teachers;
const Student = db.students;
const ProjectOrganizer = db.projectOrganizers;
const Op = db.Op;
const bcrypt = require("bcrypt");
const fs = require("fs");

// Create and Save a new Assignment
exports.create = (req, res) => {
  const assignment = {
    name: req.body.name,
    details: req.body.details,
    marks: req.body.marks,
    deadline: req.body.deadline,
    session: req.body.session,
    discipline: req.body.discipline,
    teacher_id: req.user_id
  };
  Assignment.create(assignment)
    .then((data) => {
      res.status(201).json({ success: "Assignment Added" });
    })
    .catch((err) => {
      res.status(201).json({ error: "Error while inseting data" });
    });
};



// Retrieve all Assignments from the database.
exports.findAll = (req, res) => {

  let session = req.query.session;
  let discipline = req.query.discipline;

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
      res.status(201).json({ result: result });
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
      res.status(201).json({ result: result });
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving Assignment with id = ${id}`
      });
    });
};


// Find a single Assignment with an id
exports.viewStudentsAssignnmet = (req, res) => {
  const id = req.params.id;
  const student_id = req.params.student_id;
  Assignment.findByPk(id)
    .then(result => {
      AssignmentSubmission.findOne({
        where: { assignment_id: id, student_id: student_id }
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


// Update a Assignment by the id in the request
exports.update = (req, res) => {
  const id = req.body.id;
  const assignment = {
    name: req.body.name,
    details: req.body.details,
    marks: req.body.marks,
    deadline: req.body.deadline
  };
  Assignment.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          success: "Assignment was updated successfully."
        });
      } else {
        res.send({
          error: `Cannot update Assignment with id=${id}. Maybe Assignment was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.send({
        error: "Error updating Assignment with id=" + id
      });
    });
};

// Delete a Assignment with the specified id in the request
exports.delete = (req, res) => {

  const id = req.params.id;
  Assignment.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.json({
          message: "Assignment was deleted successfully!"
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


// Retrieve all Students from the database.
exports.viewAssingmentSubmissions = (req, res) => {
  let session = req.query.session;
  let discipline = req.query.discipline;
  let assignment_id = req.query.assignment_id;
  Student.findAll({
    where: {
      session: session,
      discipline: discipline,
    },
    include: {
      model: AssignmentSubmission,
      where: {
        '$project_oraganizer_assignment_submissions.assignment_id$': { [Op.eq]: assignment_id }
      },
      required: false
    }

  })
    .then((result) => {
      console.log(result)
      res.status(201).json({ result: result });

    })
    .catch((err) => {
      res
        .status(201)
        .json({ error: "Some error accurred while retrieving students." });
    });
};




// Find a single Assignment with an id
exports.assignMarks = (req, res) => {
  const id = req.body.id;

  AssignmentSubmission.update({ "obtained_marks": req.body.obtained_marks }, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(201).json({ success: "Marks updated" });
      } else {
        res.status(201).json({ error: "Error while updating data" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating Teacher with id=" + id,
      });
    });

};

