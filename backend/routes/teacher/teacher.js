const express = require('express');
const verifyToken = require('../verifyToken');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fileUpload = require("express-fileupload");
const fs = require("fs");
router.use(fileUpload());

const studentController = require("../../controllers/teacher/student.js");
const teacherController = require("../../controllers/teacher/teacher.js");
const assignmentController = require("../../controllers/teacher/assignment.js");
const supervisorAssignmentController = require("../../controllers/teacher/supervisorAssignment.js");
const projectController = require("../../controllers/teacher/project.js");
const sessionController = require("../../controllers/teacher/session.js");
const postController = require("../../controllers/teacher/post.js");


// Teacher
// Admim Login  
router.post('/login', teacherController.login);
// Retrieve Admim with id
router.get("/profile", verifyToken, teacherController.findOne);
// Update a Teacher by the id in the request
router.put("/update", verifyToken, teacherController.update);


// Student
// Retrieve Student with id
router.get("/students/profile/:id", verifyToken, studentController.findOne);
/* GET students listing. */
router.get("/students", verifyToken, studentController.findAll);

/* GET students Sessions listing. */
router.get("/students/sessions", verifyToken, studentController.sessions);


// PO Assignment
// Create a new Assignment  
router.post("/assignments/create", verifyToken, assignmentController.create);
//assignment-submissions
router.get("/assignments/show/assignment-submissions", verifyToken, assignmentController.viewAssingmentSubmissions);
/* GET single assignment */
router.get("/assignments/show/:id", verifyToken, assignmentController.findOne);
// Update a Assignment by the id in the request
router.put("/assignments/update", verifyToken, assignmentController.update);
// View Students Assignments 	
router.get("/assignments/view-Students-assignnmet/:id/:student_id", verifyToken, assignmentController.viewStudentsAssignnmet);
/* GET assignment listing. */
router.get("/assignments", verifyToken, assignmentController.findAll);
// Delete a assignment with the specified id in the request
router.delete("/assignments/:id", verifyToken, assignmentController.delete);
//assignment-submissions
router.put("/assignments/view-Students-assignnmet/assign-marks", verifyToken, assignmentController.assignMarks);

router.get("/sessions", verifyToken, sessionController.findAll);

// Project
/* GET Single Project. */
router.get("/project/:id", verifyToken, projectController.findOne);
/* GET Projects listing. */
router.get("/projects", verifyToken, projectController.findAll);

// Assignment
// Create a new Assignment  
router.post("/projects/assignments/create", verifyToken, supervisorAssignmentController.create);
//Projects assignment-submissions
router.get("/projects/assignments/show/assignment-submissions", verifyToken, supervisorAssignmentController.viewAssingmentSubmissions);
/* GET single assignment */
router.get("/projects/assignments/show/:id", verifyToken, supervisorAssignmentController.findOne);
// Update a Assignment by the id in the request
router.put("/projects/assignments/update", verifyToken, supervisorAssignmentController.update);
// View Students Assignments 	
router.get("/projects/assignments/view-Students-assignnmet/:id/:student_id", verifyToken, supervisorAssignmentController.viewStudentsAssignnmet);
/* GET assignment listing. */
router.get("/projects/assignments", verifyToken, supervisorAssignmentController.findAll);
// Delete a assignment with the specified id in the request
router.delete("/projects/assignments/:id", verifyToken, supervisorAssignmentController.delete);
//assignment-submissions
router.put("/projects/assignments/view-Students-assignnmet/assign-marks", verifyToken, supervisorAssignmentController.assignMarks);


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