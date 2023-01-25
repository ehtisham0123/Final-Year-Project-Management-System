const db = require("../../models");
const Teacher = db.teachers;
const Op = db.Op;
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");

exports.login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  Teacher.findOne({
    where: {
      email: email,
    },
  }).then((user) => {
    if (user) {
      console.log(user)
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.dataValues.password
      );

      if (!passwordIsValid) {
        res.status(201).json({ error: "invalid credentials" });
      }
      else {
        var token = jwt.sign({ id: user.id, role: 'teacher' }, 'Badshah');
        res.status(201).json({ 'user_id': user.id, 'user_role': 'teacher', name: user.name, 'token': token, avatar: user.avatar });

      }
    } else {
      res.status(201).json({ error: "invalid credentials" });
    }
  });
};

// Find a Teacher with an id
exports.findOne = (req, res) => {
  const id = req.user_id;
  Teacher.findByPk(id)
    .then((result) => {
      res.status(201).json({ result: result });
    })
    .catch((err) => {
      res.status(500).json({
        message: `Error retrieving Teacher with id = ${id}`,
      });
    });
};

// Update a Teacher by the id in the request
exports.update = (req, res) => {
  const id = req.user_id;
  const teacher = {
    name: req.body.name,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    gender: req.body.gender,
    address: req.body.address,
    age: req.body.age,
    contact: req.body.contact,
    avatar: req.body.avatar,
  };

  file = req.body.file;
  oldEmail = req.body.oldEmail;

  teacher.email = teacher.email.toLowerCase();
  let photo;

  Teacher.findOne({
    where: {
      email: teacher.email,
    },
  }).then(function (result) {
    if (result && result.dataValues.email != oldEmail) {
      return res.status(201).json({ error: "Email is already registered" });
    } else {
      if (req.files === null) {
        photo = teacher.avatar;
      } else {
        if (teacher.avatar != "profile.png") {
          fs.unlinkSync(
            `${__dirname}/../../../frontend/public/uploads/${teacher.avatar}`
          );
        }
        const avatar = req.files.file;
        photo = avatar.name.split(".");
        photo = photo[0] + "." + Date.now() + "." + photo[photo.length - 1];
        teacher.avatar = photo;
        avatar.mv(
          `${__dirname}/../../../frontend/public/uploads/${photo}`,
          (err) => {
            if (err) {
              console.error(err);
            }
          }
        );
      }
      Teacher.update(teacher, {
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.status(201).json({ avatar: photo, name: teacher.name, success: "Profile Updated" });
          } else {
            res.status(201).json({ error: "Error while updating data" });
          }
        })
        .catch((err) => {
          res.status(500).json({
            message: "Error updating Teacher with id=" + id,
          });
        });
    }
  });
};
