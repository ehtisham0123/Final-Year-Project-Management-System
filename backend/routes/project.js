const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


const projectController = require("../controllers/project.js");
const sessionController = require("../controllers/session.js");

// Sessions
/* GET sessions listing. */

router.get("/sessions", sessionController.findAll);

// Project
/* GET Single Project. */
router.get("/project/:id", projectController.findOne);
/* GET Projects listing. */
router.get("/projects", projectController.findAll);
/* GET Projects listing. */
router.get("/projects/search", projectController.searchProjects);

module.exports = router;


