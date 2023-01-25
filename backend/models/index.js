const config = require("../config/config.js");
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
  config.db.DB_NAME,
  config.db.DB_USER,
  config.db.DB_PASS,
  {
    host: config.db.DB_HOST,
    dialect: config.db.dialect,
    operatorsAliases: false,

    poll: {
      max: config.db.pool.max,
      min: config.db.pool.min,
      acquire: config.db.pool.acquire,
      idle: config.db.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.students = require("./student")(sequelize, Sequelize, DataTypes);
db.admins = require("./admin")(sequelize, Sequelize, DataTypes);
db.teachers = require("./teacher")(sequelize, Sequelize, DataTypes);
db.projectOrganizers = require("./projectOrganizer")(
  sequelize,
  Sequelize,
  DataTypes
);
db.projects = require("./project")(sequelize, Sequelize, DataTypes);

db.posts = require("./post")(sequelize, Sequelize, DataTypes);

db.assignments = require("./assignment")(sequelize, Sequelize, DataTypes);
db.assignmentSubmissions = require("./assignmentSubmission")(
  sequelize,
  Sequelize,
  DataTypes
);
db.sessions = require("./session")(sequelize, Sequelize, DataTypes);
db.supervisors = require("./supervisor")(sequelize, Sequelize, DataTypes);
db.groups = require("./group")(sequelize, Sequelize, DataTypes);
db.groupRequests = require("./groupRequest")(sequelize, Sequelize, DataTypes);
db.projectAllocations = require("./projectAllocation")(
  sequelize,
  Sequelize,
  DataTypes
);

db.supervisorAssignments = require("./supervisorAssignment")(sequelize, Sequelize, DataTypes);
db.supervisorAssignmentSubmissions = require("./supervisorAssignmentSubmission")(
  sequelize,
  Sequelize,
  DataTypes
);



db.supervisorAssignments.belongsTo(db.projects, {
  foreignKey: {
    name: "project_id",
    type: DataTypes.UUID,
  },
});

db.projects.hasOne(db.supervisorAssignments, {
  foreignKey: {
    name: "project_id",
    type: DataTypes.UUID,
  },
});




db.projectAllocations.belongsTo(db.groups, {
  foreignKey: {
    name: "group_id",
    type: DataTypes.UUID,
  },
});

db.groups.hasOne(db.projectAllocations, {
  foreignKey: {
    name: "group_id",
    type: DataTypes.UUID,
  },
});

db.projectAllocations.belongsTo(db.projects, {
  foreignKey: {
    name: "project_id",
    type: DataTypes.UUID,
  },
});

db.projects.hasOne(db.projectAllocations, {
  foreignKey: {
    name: "project_id",
    type: DataTypes.UUID,
  },
});

db.groups.belongsTo(db.students, {
  foreignKey: {
    name: "student1_id",
    type: DataTypes.UUID,
  },
});

db.groups.belongsTo(db.students, {
  foreignKey: {
    name: "student2_id",
    type: DataTypes.UUID,
  },
});

db.students.hasMany(db.groups, {
  foreignKey: {
    name: "student1_id",
    type: DataTypes.UUID,
  },
});

db.students.hasMany(db.groups, {
  foreignKey: {
    name: "student2_id",
    type: DataTypes.UUID,
  },
});

db.groupRequests.belongsTo(db.students, {
  foreignKey: {
    name: "student1_id",
    type: DataTypes.UUID,
  },
});

db.groupRequests.belongsTo(db.students, {
  foreignKey: {
    name: "student2_id",
    type: DataTypes.UUID,
  },
});

db.students.hasMany(db.groupRequests, {
  foreignKey: {
    name: "student1_id",
    type: DataTypes.UUID,
  },
});

db.students.hasMany(db.groupRequests, {
  foreignKey: {
    name: "student2_id",
    type: DataTypes.UUID,
  },
});

db.supervisors.belongsTo(db.teachers, {
  foreignKey: {
    name: "teacher_id",
    type: DataTypes.UUID,
  },
});

db.teachers.hasMany(db.supervisors, {
  foreignKey: {
    name: "teacher_id",
    type: DataTypes.UUID,
  },
});

db.supervisors.belongsTo(db.projects, {
  foreignKey: {
    name: "project_id",
    type: DataTypes.UUID,
  },
});

db.projects.hasOne(db.supervisors, {
  foreignKey: {
    name: "project_id",
    type: DataTypes.UUID,
  },
});

db.teachers.hasMany(db.supervisors, {
  foreignKey: {
    name: "teacher_id",
    type: DataTypes.UUID,
  },
});

db.teachers.hasMany(db.projectOrganizers, {
  foreignKey: {
    name: "teacher_id",
    type: DataTypes.UUID,
  },
});

db.projectOrganizers.belongsTo(db.teachers, {
  foreignKey: {
    name: "teacher_id",
    type: DataTypes.UUID,
  },
});

db.teachers.hasMany(db.assignments, {
  foreignKey: {
    name: "teacher_id",
    type: DataTypes.UUID,
  },
});

db.assignments.belongsTo(db.teachers, {
  foreignKey: {
    name: "teacher_id",
    type: DataTypes.UUID,
  },
});

db.students.hasMany(db.assignmentSubmissions, {
  foreignKey: {
    name: "student_id",
    type: DataTypes.UUID,
  },
});

db.assignments.hasMany(db.assignmentSubmissions, {
  foreignKey: {
    name: "assignment_id",
    onDelete: 'CASCADE',
    type: DataTypes.UUID,
  },
});

db.assignmentSubmissions.belongsTo(db.assignments, {
  foreignKey: {
    name: "assignment_id",
    onDelete: 'CASCADE',
    type: DataTypes.UUID,
  },
});

db.assignmentSubmissions.belongsTo(db.students, {
  foreignKey: {
    name: "student_id",
    type: DataTypes.UUID,
  },
});


db.teachers.hasMany(db.supervisorAssignments, {
  foreignKey: {
    name: "teacher_id",
    type: DataTypes.UUID,
  },
});

db.supervisorAssignments.belongsTo(db.teachers, {
  foreignKey: {
    name: "teacher_id",
    type: DataTypes.UUID,
  },
});

db.students.hasMany(db.supervisorAssignmentSubmissions, {
  foreignKey: {
    name: "student_id",
    type: DataTypes.UUID,
  },
});

db.supervisorAssignments.hasMany(db.supervisorAssignmentSubmissions, {
  foreignKey: {
    name: "assignment_id",
    type: DataTypes.UUID,
  },
});

db.supervisorAssignmentSubmissions.belongsTo(db.supervisorAssignments, {
  foreignKey: {
    name: "assignment_id",
    type: DataTypes.UUID,
  },
});

db.supervisorAssignmentSubmissions.belongsTo(db.students, {
  foreignKey: {
    name: "student_id",
    type: DataTypes.UUID,
  },
});


db.posts.belongsTo(db.teachers, {
  foreignKey: {
    name: "teacher_id",
    type: DataTypes.UUID,
  },
});

db.teachers.hasMany(db.posts, {
  foreignKey: {
    name: "teacher_id",
    type: DataTypes.UUID,
  },
});


db.posts.belongsTo(db.admins, {
  foreignKey: {
    name: "admin_id",
    type: DataTypes.UUID,
  },
});

db.admins.hasMany(db.posts, {
  foreignKey: {
    name: "admin_id",
    type: DataTypes.UUID,
  },
});



module.exports = db;
