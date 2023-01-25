const db = require("../models");
const Session = db.sessions;
const Op = db.Op;

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

