const db = require("../../models");
const Teacher = db.teachers;
const Op = db.Op;

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
      console.log(result)
    })
    .catch((err) => {
      res.status(500).json({
        message: `Error retrieving Teacher with id = ${id}`,
      });
    });
};
