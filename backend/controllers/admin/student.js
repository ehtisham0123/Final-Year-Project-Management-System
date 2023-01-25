const db = require("../../models");
const Student = db.students;
const Group = db.groups;
const Op = db.Op;
const bcrypt = require("bcrypt");
const fs = require("fs");

// Create and Save a new Student
exports.create = (req, res) => {
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
        student.password = bcrypt.hashSync(req.body.password, 8);

        Student.create(student)
          .then((data) => {
            res.status(201).json({ success: "Student Registerd" });
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

// Retrieve all Students from the database.
exports.findAll = (req, res) => {
  let session = req.query.session;
  let discipline = req.query.discipline;

  Student.findAll({
    order: [["created_at", "DESC"]],
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
        .json({ error: "Some error accurred while retrieving students." });
    });
};

// Find a single Student with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
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
  const id = req.body.id;
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
            res.status(201).json({ avatar: photo, success: "Profile Updated" });
          } else {
            res.json({
              message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`,
            });
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

// Delete a Student with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Student.findByPk(id)
    .then((student) => {
      let avatar = student.dataValues.avatar;
      Student.destroy({
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
              .json({ result: "Student was deleted successfully!" });
          } else {
            res.json({
              message: `Cannot delete Student with id=${id}. Maybe Student was not found!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).json({
            message: "Could not delete Student with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: `Error retrieving Student with id = ${id}`,
      });
    });
};

// Find a single Project data with an id
exports.findGroup = (req, res) => {
  const id = req.params.id;
  Group.findOne(  
    { 
      where: {  
          [Op.or]: [{student1_id: id}, {student2_id: id}]
       }  
     }
     ).then((group) => {
      if(group){
            let student1_id = group.dataValues.student1_id;
            let student2_id = group.dataValues.student2_id; 
            Student.findAll({
              where: { id: [student1_id, student2_id] },
            }).then((students) => {
              res.status(201).json({ students });
            });  
      }else{
        res.status(201).json({ err:'no group members' });
      }
  }); 
};
