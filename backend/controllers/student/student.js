const db = require("../../models");
const Student = db.students;
const Group = db.groups;

const Op = db.Op;
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");

exports.login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  Student.findOne({
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
      }
      else {
        var token = jwt.sign({ id: user.id, role: 'student', discipline: user.discipline, session: user.session }, 'Badshah');
        res.status(201).json({ 'user_id': user.id, 'user_role': 'student', name: user.name, 'token': token, avatar: user.avatar });
      }
    } else {
      res.status(201).json({ error: "invalid credentials" });
    }
  });
};


exports.signup = (req, res) => {
  const student = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    rollnumber: req.body.rollnumber,
    cgpa: req.body.cgpa,
    age: req.body.age,
    contact: req.body.contact,
    address: req.body.address,
    discipline: req.body.discipline,
    session: req.body.session,
    gender: req.body.gender,
    avatar: "profile.png",
  };

  Student.findOne({ where: { email: student.email } }).then(
    (user) => {
      if (user) {
        return res.status(201).json({ error: "Email is already registered" });
      } else {
        if (req.files !== null) {
          const avatar = req.files.avatar;
          let photo = avatar.name.split(".");
          photo = photo[0] + "." + Date.now() + "." + photo[photo.length - 1];
          student.avatar = photo;
          avatar.mv(
            `${__dirname}/../../../frontend/public/uploads/${photo}`,
            (err) => {
              if (err) {
                console.error(err);
              }
            }
          );
        }
        // Save Student in database
        student.password = bcrypt.hashSync(req.body.password, 8)

        Student.create(student)
          .then((user) => {

            var token = jwt.sign({ id: user.id, role: 'student', discipline: student.discipline, session: student.session }, 'Badshah');
            res.status(201).json({ 'user_id': student.id, 'user_role': 'student', name: student.name, 'token': token, avatar: student.avatar });

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

// Find a Student with an id
exports.findOne = (req, res) => {
  const id = req.user_id;
  Student.findByPk(id)
    .then((result) => {
      res.status(201).json({ result: result });
    })
    .catch((err) => {
      res.status(500).json({
        message: `Error retrieving Student with id = ${id}`,
      });
    });
};

// Update a Student by the id in the request
exports.update = (req, res) => {
  const id = req.user_id;
  const student = {
    name: req.body.name,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    rollnumber: req.body.rollnumber,
    cgpa: req.body.cgpa,
    discipline: req.body.discipline,
    session: req.body.session,
    gender: req.body.gender,
    address: req.body.address,
    age: req.body.age,
    contact: req.body.contact,
    avatar: req.body.avatar,
  };

  file = req.body.file;
  oldEmail = req.body.oldEmail;

  student.email = student.email.toLowerCase();
  let photo;

  Student.findOne({
    where: {
      email: student.email,
    },
  }).then(function (result) {
    if (result && result.dataValues.email != oldEmail) {
      return res.status(201).json({ error: "Email is already registered" });
    } else {
      if (req.files === null) {
        photo = student.avatar;
      } else {
        if (student.avatar != "profile.png") {
          fs.unlinkSync(
            `${__dirname}/../../../frontend/public/uploads/${student.avatar}`
          );
        }
        const avatar = req.files.file;
        photo = avatar.name.split(".");
        photo = photo[0] + "." + Date.now() + "." + photo[photo.length - 1];
        student.avatar = photo;
        avatar.mv(
          `${__dirname}/../../../frontend/public/uploads/${photo}`,
          (err) => {
            if (err) {
              console.error(err);
            }
          }
        );
      }
      Student.update(student, {
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.status(201).json({ avatar: photo, name: student.name, success: "Profile Updated" });
          } else {
            res.status(201).json({ error: "Error while updating data" });
          }
        })
        .catch((err) => {
          res.status(500).json({
            message: "Error updating Student with id=" + id,
          });
        });
    }
  });
};


// Retrieve all Students from the database.
exports.findAll = (req, res) => {
  Student.findAll({
    where: { session: req.user_session, discipline: req.user_discipline },
    order: [
      ['rollnumber', 'ASC'],
    ],
  })
    .then((result) => {
      Group.findOne({
        where: {
          [Op.or]: [{student1_id: req.user_id}, {student2_id: req.user_id}]
       }
      })
      .then((group_member) => {
          if (group_member) {
              if(!group_member.dataValues.student2_id){
                res.status(201).json({ result: result , alone:true});
              }
              else if (group_member.dataValues.student1_id == req.user_id ) {
                let group_member_id = group_member.dataValues.student2_id; 
                res.status(201).json({ result,group_member_id });
              }else{
                let group_member_id = group_member.dataValues.student1_id; 
                res.status(201).json({ result,group_member_id });
              }
          }
          else{
            res.status(201).json({ result: result });
          }
         

      })
      .catch((err) => {
        res
          .status(201)
          .json({ error: "Some error accurred while retrieving students." });
      });
    })
    .catch((err) => {
      res
        .status(201)
        .json({ error: "Some error accurred while retrieving students." });
    });
};
