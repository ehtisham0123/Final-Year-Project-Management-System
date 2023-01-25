const db = require("../../models");
const Session = db.sessions;
const Op = db.Op;

// Create and Save a new Session
exports.create = (req, res) => {
  let session = {
    name: req.body.name,
  }
  Session.create(session)
    .then((data) => {
      res.status(201).json({ success: "Session Added" });
    })
    .catch((err) => {
      res.status(201).json({ error: "Error while inseting data" });
    });
};


// Retrieve all Sessions from the database.
exports.findAll = (req, res) => {
  Session.findAll({
    order: [
      ['created_at', 'DESC'],
    ],
  })
    .then(result => {
      res.status(201).json({ result: result });
    })
    .catch(err => {
      res.status(201).json({ error: "Some error accurred while retrieving sessions." });
    });
};



// Delete a Project with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Session.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "Session was deleted successfully!",
        });
      } else {
        res.json({
          message: `Cannot delete Session with id=${id}. Maybe Session was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Session with id=" + id,
      });
    });
};
