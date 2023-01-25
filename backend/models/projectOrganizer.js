module.exports = (sequelize, Sequelize, DataTypes) => {
  const ProjectOrganizer = sequelize.define(
    "project_organizer", // Model name
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      discipline: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      session: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      // Options
      timestamps: true,
      underscrored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return ProjectOrganizer;
};
