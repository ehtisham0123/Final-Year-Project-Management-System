const db = require("../../models");
const Student = db.students;
const GroupRequest = db.groupRequests;
const Group = db.groups;

var pluck = require("arr-pluck");

const Op = db.Op;
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");

// Retrieve all Students from the database.
exports.requests = (req, res) => {
  GroupRequest.findAll({
    where: { student2_id: req.user_id },
    attributes: ["student1_id"],
    raw: true,
  })
    .then((group_requests) => {
      let students_id = pluck(group_requests, "student1_id");
      Student.findAll({
        where: {
          id: {
            [Op.in]: students_id,
          },
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
    })
    .catch((err) => {
      res
        .status(201)
        .json({ error: "Some error accurred while retrieving students." });
    });
};


// Delete a GroupRequest with the specified id in the request
exports.deleteRequest = (req, res) => {
  const id = req.params.id;
  GroupRequest.destroy({
    where: { student1_id: id,student2_id: req.user_id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "Group Request deleted successfully!",
        });
      } else {
        res.json({
          message: `Cannot delete Group Request with id=${id}. Maybe Project not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Group Request with id=" + id,
      });
    });
};






exports.confirmRequest = (req, res) => {
  const id = req.body.id;
  if (req.body.id) {
  GroupRequest.destroy({
    where: { 
      [Op.or]: [{student1_id: req.user_id}, {student2_id: req.user_id},{student1_id: id},{student2_id: id}]
    },
  })
    .then((num) => {
      if (num) {
          const group = {
            student1_id: id,
            student2_id: req.user_id,
          }
          Group.create(group)
            .then((data) => {
              res.status(201).json({ success: "Group Created" });
            })
            .catch((err) => {
              res.status(201).json({ error: "Error while inseting data" });
            });
      } else {
        res.json({
          message: `Cannot delete Group Request with id=${id}. Maybe Project not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Project with id=" + id,
      });
    });
  }else{
  GroupRequest.destroy({
    where: { 
      [Op.or]: [{student1_id: req.user_id}, {student2_id: req.user_id}]
    },
  })
    .then((num) => {
      const group = {
        student1_id: req.user_id,
      }
      Group.create(group)
        .then((data) => {
          res.status(201).json({ success: "Group Created" });
        })
        .catch((err) => {
          res.status(201).json({ error: "Error while inseting data" });
        });
    
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Project with id=" + id,
      });
    });
  }
};


exports.newRequest = (req, res) => {
   const group = {
        student2_id: req.body.student,
        student1_id: req.user_id,
      }
  GroupRequest.create(group)
    .then((data) => {
      res.status(201).json({ success: "Group Request Sent" });
    })
    .catch((err) => {
      res.status(201).json({ error: "Error while inseting data" });
    });
};


// Retrieve all Students from the database.
exports.sentRequests = (req, res) => {
  GroupRequest.findAll({
    where: { student1_id: req.user_id },
    attributes: ["student2_id"],
    raw: true,
  })
    .then((sent_group_requests) => {
      let students_id = pluck(sent_group_requests, "student2_id");
      Student.findAll({
        where: {
          id: {
            [Op.in]: students_id,
          },
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
    })
    .catch((err) => {
      res
        .status(201)
        .json({ error: "Some error accurred while retrieving students." });
    });
};

// Delete a GroupRequest with the specified id in the request
exports.deleteSentRequest = (req, res) => {
  const id = req.params.id;
  GroupRequest.destroy({
    where: { student2_id: id,student1_id: req.user_id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "Group Request deleted successfully!",
        });
      } else {
        res.json({
          message: `Cannot delete Group Request with id=${id}. Maybe Project not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Group Request with id=" + id,
      });
    });
};




