const db = require("../../models");
const Post = db.posts;
const Teacher = db.teachers;
const Admin = db.admins;
const Op = db.Op;
const bcrypt = require("bcrypt");
const fs = require("fs");

// Create and Save a new Post
exports.create = (req, res) => {
  let post = {
    name: req.body.name,
    details: req.body.details,
    discipline: req.body.discipline,
    session: req.body.session,
    admin_id: req.user_id,
  };
  Post.create(post)
    .then((data) => {
      res.status(201).json({ success: "Post Added" });
    })
    .catch((err) => {
      res.status(201).json({ error: "Error while inseting data" });
    });
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
  Post.findAll({
    order: [
      ['created_at', 'DESC'],
    ],
    include: [Admin,Teacher],
  })
    .then((result) => {
      console.log(result);
      
      res.status(201).json({ result: result });
    })
    .catch((err) => {
      res
        .status(201)
        .json({ error: "Some error accurred while retrieving posts." });
    });
};

// Retrieve all Posts from the database.
exports.searchPosts = (req, res) => {
  let session = req.query.session;
  let discipline = req.query.discipline;
  Post.findAll({
    where: {
      session: session,
      discipline: discipline,
    },
    order: [
      ['created_at', 'DESC'],
    ],
    include: [Admin,Teacher],
  })
    .then((result) => {
      console.log(result);
      res.status(201).json({ result: result });
    })
    .catch((err) => {
      res
        .status(201)
        .json({ error: "Some error accurred while retrieving posts." });
    });
};

// Find a single Post data with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Post.findByPk(id)
    .then((post) => {
      res.status(201).json({ post: post });
    })
};

// Update a Post by the id in the request
exports.update = (req, res) => {
  const id = req.body.id;
  Post.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          success: "Post was updated successfully."
        });
      } else {
        res.send({
          success: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        error: "Error updating Post with id=" + id
      });
    });
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Post.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "Post was deleted successfully!",
        });
      } else {
        res.json({
          message: `Cannot delete Post with id=${id}. Maybe Post was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Post with id=" + id,
      });
    });
};
