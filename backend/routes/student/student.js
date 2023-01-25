const express = require('express');
const verifyToken = require('../verifyToken');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fileUpload = require("express-fileupload");
const fs = require("fs");
router.use(fileUpload());

const studentController = require("../../controllers/student/student.js");
const teacherController = require("../../controllers/student/teacher.js");
const assignmentController = require("../../controllers/student/assignment.js");
const supervisorAssignmentController = require("../../controllers/student/supervisorAssignment.js");
const projectController = require("../../controllers/student/project.js");
const postController = require("../../controllers/student/post.js");
const groupRequestController = require("../../controllers/student/groupRequest.js");

// Student
// Student Login  
router.post('/login', studentController.login);
// Student SignUp  
router.post('/signup', studentController.signup);
// Retrieve Student with id
router.get("/profile", verifyToken, studentController.findOne);
// Update a Student by the id in the request
router.put("/update", verifyToken, studentController.update);



// Retrieve Teacher with id
router.get("/teachers/profile/:id", verifyToken, teacherController.findOne);
/* GET teachers listing. */
router.get("/teachers/:name?", verifyToken, teacherController.findAll);

// Group requests

// New requests  
router.post("/students/group-requests/new", verifyToken, groupRequestController.newRequest);
// Confirm requests  
router.post("/students/group-requests/confirm", verifyToken, groupRequestController.confirmRequest);
/* GET requests listing. */
router.get("/students/group-requests", verifyToken, groupRequestController.requests);
/* GET sent requests listing. */
router.get("/students/group-requests/sent", verifyToken, groupRequestController.sentRequests);
// Delete a Request with the specified id in the request
router.delete("/students/group-requests/:id", verifyToken, groupRequestController.deleteRequest);
// Delete a Request with the specified id in the request
router.delete("/students/group-requests/sent/:id", verifyToken, groupRequestController.deleteSentRequest);


// Students  
router.get("/students/:name?", verifyToken, studentController.findAll);
// Retrieve a single Student with id
router.get("/students/profile/:id", verifyToken, studentController.findOne);



// Assignment
// Create a new Assignment  
router.post("/assignments/create", verifyToken, assignmentController.create);
/* GET single assignment */
router.get("/assignments/show/:id", verifyToken, assignmentController.findOne);
/* GET assignment listing. */
router.get("/assignments", verifyToken, assignmentController.findAll);
// Delete a assignment with the specified id in the request
router.delete("/assignments/:id", verifyToken, assignmentController.delete);



// Assignment
// Create a new Assignment  
router.post("/supervisor-assignments/create", verifyToken, supervisorAssignmentController.create);
/* GET single assignment */
router.get("/supervisor-assignments/show/:id", verifyToken, supervisorAssignmentController.findOne);
/* GET assignment listing. */
router.get("/supervisor-assignments", verifyToken, supervisorAssignmentController.findAll);
// Delete a assignment with the specified id in the request
router.delete("/supervisor-assignments/:id", verifyToken, supervisorAssignmentController.delete);


// Project
// Create a new Project
router.post("/projects/select", verifyToken, projectController.select);
/* GET Single Project. */
router.get("/project/:id", verifyToken, projectController.findOne);
/* GET Projects listing. */
router.get("/projects", verifyToken, projectController.findAll);
/* GET Projects listing. */
router.get("/projects/search", verifyToken, projectController.searchProjects);


// Post
/* GET Posts listing. */
router.get("/posts", verifyToken, postController.findAll);


module.exports = router;