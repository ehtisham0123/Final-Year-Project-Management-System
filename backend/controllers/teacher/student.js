const db = require("../../models");
const Student = db.students;
const ProjectOrganizer = db.projectOrganizers;
const Op = db.Op;


// Retrieve all Student Sessions from the database.
exports.sessions = (req, res) => {
  ProjectOrganizer.findAll({
    where: {
      teacher_id: req.user_id
    }
  })
    .then(result => {
      res.status(201).json({ result: result });
    })
    .catch(err => {
      res.status(201).json({ error: "Some error accurred while retrieving students." });
    });
};



// Retrieve all Students from the database.
exports.findAll = (req, res) => {
  let session = req.query.session;
  let discipline = req.query.discipline;
  Student.findAll({
    where: {
      session: session,
      discipline: discipline,
    }
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
