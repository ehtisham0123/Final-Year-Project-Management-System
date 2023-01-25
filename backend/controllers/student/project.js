const db = require("../../models");
const Project = db.projects;
const Teacher = db.teachers;
const Student = db.students;
const Supervisor = db.supervisors;
const Group = db.groups;
const ProjectAllocation = db.projectAllocations;
const Op = db.Op;
const bcrypt = require("bcrypt");
const fs = require("fs");

// Create and Save a new Project
exports.select = (req, res) => {
  let project_allocation = {
    project_id: req.body.project_id,
    group_id: req.body.group_id,
  };
   ProjectAllocation.create(project_allocation)
    .then((data) => {
      res.status(201).json({ success: "Project Added" });
    })
    .catch((err) => {
      res.status(201).json({ error: "Error while inseting data" });
    });
};

// Retrieve all Projects from the database.
exports.findAll = (req, res) => {
  Student.findByPk(req.user_id)
    .then((student) => {
      let session = student.dataValues.session;
      let discipline = student.dataValues.discipline;
      Project.findAll({
        where: {
          session: session,
          discipline: discipline,
        },
      })
        .then((result) => {
          res.status(201).json({ result: result });
        })
        .catch((err) => {
          res
            .status(201)
            .json({ error: "Some error accurred while retrieving projects." });
        });
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
  Project.findByPk(id).then((project) => {
    //  This Project Alloted to any other Group
    ProjectAllocation.findOne({
      where: { project_id: id },
    }).then((projectAllocation) => {
      if (projectAllocation) {
        let group_id = projectAllocation.dataValues.group_id;
        Group.findByPk(group_id).then((group) => {
          let student1_id = group.dataValues.student1_id;
          let student2_id = group.dataValues.student2_id;

          Student.findAll({
            where: { id: [student1_id, student2_id] },
          }).then((students) => {
            //  Supervisor Alloted to any other Group
            Supervisor.findOne({
              where: {
                project_id: id,
              },
            }).then((supervisor) => {
              if (supervisor) {
                let teacher_id = supervisor.dataValues.teacher_id;
                Teacher.findByPk(teacher_id).then((teacher) => {
                  if (teacher) {
                    res.status(201).json({ teacher, project, students });
                  }
                });
              } else {
                res.status(201).json({ project, students });
              }
            });
          });
        });
      } else {
        //  Group alot to a student
        Group.findOne({
          where: {
            [Op.or]: [
              { student1_id: req.user_id },
              { student2_id: req.user_id },
            ],
          },
        }).then((group) => {
          if (group) {
            ProjectAllocation.findOne({
              where: { group_id: group.dataValues.id },
            }).then((result) => {
              if (result) {
                res
                  .status(201)
                  .json({
                    project: project,
                    group: group,
                    project_alloted: true,
                  });
              } else {
                res.status(201).json({ project: project, group: group });
              }
            });
          } else {
            res.status(201).json({ project: project });
          }
        });
      }
    });
  });
};
