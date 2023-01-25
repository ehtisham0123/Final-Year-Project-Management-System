const db = require("../../models");
const Admin = db.admins;
const Op = db.Op;
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");

exports.login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  Admin.findOne({
    where: {
      email: email,
    },
  }).then((user) => {
    if (user) {
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.dataValues.password
      );
      if (!passwordIsValid) {
        res.status(201).json({ error: "invalid credentials" });
      } else {
        var token = jwt.sign(
          {
            id: user.dataValues.id,
            email: user.dataValues.email,
            role: "admin",
          },
          "Badshah"
        );
        res.status(201).json({ 'user_id': user.id, 'user_role': 'admin', name: user.name, 'token': token, avatar: user.avatar });
      }
    } else {
      res.status(201).json({ error: "invalid credentials" });
    }
  });
};

// Find a Admin with an id
exports.findOne = (req, res) => {
  const id = req.user_id;
  Admin.findByPk(id)
    .then((result) => {
      res.status(201).json({ result: result });
    })
    .catch((err) => {
      res.status(500).json({
        message: `Error retrieving Admin with id = ${id}`,
      });
    });
};


// Update a Admin by the id in the request
exports.update = (req, res) => {
  const id = req.user_id;
  console.log(req.body)
  const admin = {
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

  admin.email = admin.email.toLowerCase();
  let photo;

  Admin.findOne({
    where: {
      email: admin.email,
    },
  }).then(function (result) {
    if (result && result.dataValues.email != oldEmail) {
      return res.status(201).json({ error: "Email is already registered" });
    } else {
      if (req.files === null) {
        photo = admin.avatar;
      } else {
        if (admin.avatar != "profile.png") {
          fs.unlinkSync(
            `${__dirname}/../../../frontend/public/uploads/${admin.avatar}`
          );
        }
        const avatar = req.files.file;
        photo = avatar.name.split(".");
        photo = photo[0] + "." + Date.now() + "." + photo[photo.length - 1];
        admin.avatar = photo;
        avatar.mv(
          `${__dirname}/../../../frontend/public/uploads/${photo}`,
          (err) => {
            if (err) {
              console.error(err);
            }
          }
        );
      }
      Admin.update(admin, {
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.status(201).json({ avatar: photo, name: admin.name, success: "Profile Updated" });
          } else {
            res.status(201).json({ error: "Error while updating data" });
          }
        })
        .catch((err) => {
          res.status(500).json({
            message: "Error updating Admin with id=" + id,
          });
        });
    }
  });
};
