const db = require("../../models");
const Post = db.posts;
const Student = db.students;
const Teacher = db.teachers;
const Admin = db.admins;
const Op = db.Op;
const bcrypt = require("bcrypt");
const fs = require("fs");

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  Student.findByPk(req.user_id)
    .then((student) => {
      Post.findAll({
        order: [
          ['created_at', 'DESC'],
        ],
        include: [Admin,Teacher],
         where: {
          session: student.dataValues.session,
          discipline: student.dataValues.discipline,
        },
      })
        .then((result) => {
          res.status(201).json({ result: result });
        })
        .catch((err) => {
          res
            .status(201)
            .json({ error: "Some error accurred while retrieving posts." });
        });
    })
};

