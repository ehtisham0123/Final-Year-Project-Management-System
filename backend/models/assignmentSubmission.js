module.exports = (sequelize, Sequelize, DataTypes) => {
  const AssignmentSubmission = sequelize.define(
    "project_oraganizer_assignment_submission", // Model name
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      file: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      file_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      obtained_marks: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      underscrored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return AssignmentSubmission;
};
