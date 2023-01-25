const db = require("../../models");
const Project = db.projects;
const Teacher = db.teachers;
const Student = db.students;
const Supervisor = db.supervisors;
const Group = db.groups;
const ProjectAllocation = db.projectAllocations;
const SupervisorAssignment = db.supervisorAssignments;

const Op = db.Op;
const bcrypt = require("bcrypt");
const fs = require("fs");

// Create and Save a new Project
exports.create = (req, res) => {
  let project = {
    name: req.body.name,
    details: req.body.details,
    discipline: req.body.discipline,
    session: req.body.session,
  };

  Project.create(project)
    .then((data) => {
      res.status(201).json({ success: "Project Added" });
    })
    .catch((err) => {
      res.status(201).json({ error: "Error while inseting data" });
    });
};

// Retrieve all Projects from the database.
exports.findAll = (req, res) => {
  Project.findAll({
    order: [
      ['created_at', 'DESC'],
    ],
  })
    .then((result) => {
      res.status(201).json({ result: result });
    })
    .catch((err) => {
      res
        .status(201)
        .json({ error: "Some error accurred while retrieving projects." });
    });
};

// Retrieve all Projects from the database.
exports.searchProjects = (req, res) => {
  let session = req.query.session;
  let discipline = req.query.discipline;
  Project.findAll({
    order: [
      ['created_at', 'DESC'],
    ],
    where: {
      session: session,
      discipline: discipline,
    },

  })
    .then((result) => {
      console.log(result);
      res.status(201).json({ result: result });
    })
    .catch((err) => {
      res
        .status(201)
        .json({ error: "Some error accurred while retrieving projects." });
    });
};

// Find a single Project data with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Project.findByPk(id)
    .then((project) => {

      ProjectAllocation.findOne(
        {
          where: { project_id: id },
        }
      )
        .then((projectAllocation) => {
          if (projectAllocation) {
            let group_id = projectAllocation.dataValues.group_id;

            Group.findByPk(group_id)
              .then(group => {
                let student1_id = group.dataValues.student1_id;
                let student2_id = group.dataValues.student2_id;

                Student.findAll({
                  where: { id: [student1_id, student2_id] },
                })
                  .then((students) => {

                    Supervisor.findOne({
                      where: {
                        project_id: id,
                      },
                    }).then((supervisor) => {
                      if (supervisor) {
                        let teacher_id = supervisor.dataValues.teacher_id
                        Teacher.findByPk(teacher_id).then((teacher) => {
                          if (teacher) {
                            res.status(201).json({ projectAllocation,teacher, project, students });
                          }
                        })
                      } else {
                        Teacher.findAll()
                          .then(teachers => {
                            res.status(201).json({ projectAllocation,teachers, project, students });
                          })
                      }
                    })
                  })
              })

          } else {
            res.status(201).json({ project: project });

          }
        })
    })
};

// Update a Project by the id in the request
exports.update = (req, res) => {
  const id = req.body.id;

  Project.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          success: "Project updated successfully."
        });
      } else {
        res.send({
          error: `Cannot update Project with id=${id}. Maybe Project was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        error: "Error updating Project with id=" + id
      });
    });
};

// Delete a Project with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Project.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          success: "Project was deleted successfully!",
        });
      } else {
        res.json({
          message: `Cannot delete Project with id=${id}. Maybe Project was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Project with id=" + id,
      });
    });
};


// Delete a Project with the specified id in the request
exports.deleteProjectAllocation = (req, res) => {
  const id = req.params.id;
  const project_id = req.query.project_id;
  ProjectAllocation.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num) {
         Supervisor.destroy({
            where: { project_id: project_id },
          })
            .then((num) => {
              if (num) {
                  SupervisorAssignment.destroy({
                    where: { project_id: project_id }
                  })
                    .then(num => {
                      if (num) {
                        res.json({
                          success: "Project Allocation deleted successfully!",
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
                  message: `Cannot delete Project with id=${id}. Maybe Project was not found!`,
                });
              }
            })
            .catch((err) => {
              res.status(500).send({
                message: "Could not delete Project with id=" + id,
              });
            })

      } else {
        res.json({
          message: `Cannot delete Project with id=${id}. Maybe Project was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Project with id=" + id,
      });
    });
};
