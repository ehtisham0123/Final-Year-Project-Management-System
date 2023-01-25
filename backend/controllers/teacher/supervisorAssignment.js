const db = require("../../models");
const SupervisorAssignment = db.supervisorAssignments;
const SupervisorAssignmentSubmission = db.supervisorAssignmentSubmissions;
const Project = db.projects;
const Teacher = db.teachers;
const Student = db.students;
const Group = db.groups;
const ProjectOrganizer = db.projectOrganizers;
const ProjectAllocation = db.projectAllocations;
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
    project_id: req.body.project_id,
    teacher_id: req.user_id
  };
  SupervisorAssignment.create(assignment)
    .then((data) => {
      res.status(201).json({ success: "Assignment Added" });
    })
    .catch((err) => {
      res.status(201).json({ error: "Error while inseting data" });
    });
};



// Retrieve all Assignments from the database.
exports.findAll = (req, res) => {

  let project_id = req.query.project_id;
  SupervisorAssignment.findAll({
    order: [
      ['created_at', 'DESC'],
    ],
    where: {
      teacher_id: req.user_id,
      project_id:project_id,
    }
  })
    .then(result => {
      res.status(201).json({ result: result });
    })
    .catch(err => {
      res.status(201).json({ error: "Some error accurred while retrieving assignments." });
      console.log(err)

    });
};


// Find a single Assignment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  SupervisorAssignment.findByPk(id)
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
  console.log("sadas dasadasd as asd sad sadsssa sad sad sad")
  const id = req.params.id;
  const student_id = req.params.student_id;
  SupervisorAssignment.findByPk(id)
    .then(result => {
      SupervisorAssignmentSubmission.findOne({
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
  SupervisorAssignment.update(req.body, {
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
  SupervisorAssignment.destroy({
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

  let project_id = req.query.project_id;
  let assignment_id = req.query.assignment_id;


  ProjectAllocation.findOne({
    where: {
      project_id: project_id
    }
  }).then((project_allocation) => {
    Group.findOne({
      where: {
        id: project_allocation.dataValues.group_id
      }
    }).then((group) => {

      Student.findAll({
        where: {
          id: {
            [Op.in]: [group.dataValues.student1_id, group.dataValues.student2_id],
          }
        },
        include: {
          model: SupervisorAssignmentSubmission,
          where: {
            '$supervisor_assignment_submissions.assignment_id$': { [Op.eq]: assignment_id }
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

    })
  })
};




// Find a single Assignment with an id
exports.assignMarks = (req, res) => {
  const id = req.body.id;

  SupervisorAssignmentSubmission.update({ "obtained_marks": req.body.obtained_marks }, {
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

