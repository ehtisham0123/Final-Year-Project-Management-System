const express = require('express');
const verifyToken = require('../verifyToken');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fileUpload = require("express-fileupload");
const fs = require("fs");
router.use(fileUpload());

const adminController = require("../../controllers/admin/admin.js");
const studentController = require("../../controllers/admin/student.js");
const teacherController = require("../../controllers/admin/teacher.js");
const projectOrganizerController = require("../../controllers/admin/projectOrganizer.js");
const supervisorController = require("../../controllers/admin/supervisor.js");
const projectController = require("../../controllers/admin/project.js");
const sessionController = require("../../controllers/admin/session.js");
const postController = require("../../controllers/admin/post.js");
const groupController = require("../../controllers/admin/group.js");

// Admin
// Admim Login  
router.post('/login', adminController.login);
// Retrieve Admim with id
router.get("/profile", verifyToken, adminController.findOne);
// Update a Admin by the id in the request
router.put("/update", verifyToken, adminController.update);

// Sessions
// Create a new session  
router.post("/sessions/create", verifyToken, sessionController.create);
/* GET sessions listing. */
router.get("/sessions", verifyToken, sessionController.findAll);
// Delete a Session with the specified id in the request
router.delete("/sessions/:id", verifyToken, sessionController.delete);

// Students  
// Create a new Student  
router.post("/students/store", verifyToken, studentController.create);
/* GET students listing. */
router.get("/students/:name?", verifyToken, studentController.findAll);
// Retrieve a single Student with id
router.get("/students/profile/:id", verifyToken, studentController.findOne);
// Retrieve a single Student with id
router.get("/students/groups/:id", verifyToken, studentController.findGroup);
// Update a Student by the id in the request
router.put("/students/update", verifyToken, studentController.update);
// Delete a Student with the specified id in the request
router.delete("/students/:id", verifyToken, studentController.delete);


// Groups  
// Delete a Group with the specified id in the request
router.delete("/groups/:id", verifyToken, groupController.delete);


// Teachers  
// Create a new Teacher  
router.post("/teachers/store", verifyToken, teacherController.create);
/* GET teachers listing. */
router.get("/teachers/:name?", verifyToken, teacherController.findAll);
// Retrieve a single Teacher with id
router.get("/teachers/profile/:id", verifyToken, teacherController.findOne);
// Update a Teacher by the id in the request
router.put("/teachers/update", verifyToken, teacherController.update);
// Delete a Teacher with the specified id in the request
router.delete("/teachers/:id", verifyToken, teacherController.delete);

// Project Organizer
// Create a new Project Organizer
router.post("/project-organizers/create", verifyToken, projectOrganizerController.create);
/* GET Project Organizers listing. */
router.get("/project-organizers/:name?", verifyToken, projectOrganizerController.findAll);
// Delete a Project Organizer with the specified id in the request
router.delete("/project-organizers/:id", verifyToken, projectOrganizerController.delete);

// Supervisor
// Create a new Supervisor
router.post("/supervisors/create", verifyToken, supervisorController.create);
/* GET Supervisors listing. */
router.get("/supervisors/:name?", verifyToken, supervisorController.findAll);
// Delete a Supervisor with the specified id in the request
router.delete("/supervisors/:id/:project_id", verifyToken, supervisorController.delete);

// Project
// Create a new Project
router.post("/projects/create", verifyToken, projectController.create);
/* GET Single Project. */
router.get("/project/:id", verifyToken, projectController.findOne);
/* GET Projects listing. */
router.get("/projects", verifyToken, projectController.findAll);
/* GET Projects listing. */
router.get("/projects/search", verifyToken, projectController.searchProjects);
// Update a Project by the id in the request
router.put("/projects/update", verifyToken, projectController.update);
// Delete a Project with the specified id in the request
router.delete("/projects/:id", verifyToken, projectController.delete);

// Delete a Project Allocation with the specified id in the request
router.delete("/project-allocation/:id", verifyToken, projectController.deleteProjectAllocation);

// Post
// Create a new Post
router.post("/posts/create", verifyToken, postController.create);
/* GET Single Post. */
router.get("/post/:id", verifyToken, postController.findOne);
/* GET Posts listing. */
router.get("/posts", verifyToken, postController.findAll);
/* GET Posts listing. */
router.get("/posts/search", verifyToken, postController.searchPosts);
// Update a Post by the id in the request
router.put("/posts/update", verifyToken, postController.update);
// Delete a Post with the specified id in the request
router.delete("/posts/:id", verifyToken, postController.delete);


module.exports = router;


