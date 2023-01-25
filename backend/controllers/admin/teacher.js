const db = require("../../models");
const Teacher = db.teachers;
const Op = db.Op;
const bcrypt = require("bcrypt");
const fs = require("fs");

// Create and Save a new Teacher
exports.create = (req, res) => {
  const teacher = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    contact: req.body.contact,
    address: req.body.address,
    gender: req.body.gender,
    avatar: "profile.png",
  };

  Teacher.findOne({ where: { email: teacher.email } }).then(
    (user) => {
      if (user) {
        return res.status(201).json({ error: "Email is already registered" });
      } else {
        if (req.files !== null) {
          const avatar = req.files.avatar;
          let photo = avatar.name.split(".");
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
        // Save Teacher in database
        teacher.password = bcrypt.hashSync(req.body.password, 8);
        Teacher.create(teacher)
          .then((data) => {
            res.status(201).json({ success: "Teacher Registerd" });
          })
          .catch((err) => {
            res.status(201).json({ error: "Error while inseting data" });
          });
      }
    },
    (errors) => {
      callback(errors);
    }
  );
};

// Retrieve all Teachers from the database.
exports.findAll = (req, res) => {
  const name = req.params.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Teacher.findAll({ where: condition })
    .then((result) => {
      res.status(201).json({ result: result });
    })
    .catch((err) => {
      res
        .status(201)
        .json({ error: "Some error accurred while retrieving teachers." });
    });
};

// Find a single Teacher with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

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
  const id = req.body.id;
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
            res.status(201).json({ avatar: photo, success: "Profile Updated" });
          } else {
            res.json({
              message: `Cannot update Teacher with id=${id}. Maybe Teacher was not found or req.body is empty!`,
            });
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

// Delete a Teacher with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Teacher.findByPk(id)
    .then((teacher) => {
      let avatar = teacher.dataValues.avatar;
      Teacher.destroy({
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            if (avatar != "profile.png") {
              fs.unlinkSync(
                `${__dirname}/../../../frontend/public/uploads/${avatar}`
              );
            }
            res
              .status(201)
              .json({ result: "Teacher was deleted successfully!" });
          } else {
            res.json({
              message: `Cannot delete Teacher with id=${id}. Maybe Teacher was not found!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).json({
            message: "Could not delete Teacher with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: `Error retrieving Teacher with id = ${id}`,
      });
    });
};
