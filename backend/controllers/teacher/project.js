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


// Retrieve all Projects from the database.
exports.findAll = (req, res) => {
  Supervisor.findAll({
    where: {
      teacher_id: req.user_id,
    },
    include: Project,
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
                            res.status(201).json({ teacher, project, students });
                          }
                        })
                      } else {
                        Teacher.findAll()
                          .then(teachers => {
                            res.status(201).json({ teachers, project, students });
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

