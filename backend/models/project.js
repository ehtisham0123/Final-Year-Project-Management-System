module.exports = (sequelize, Sequelize, DataTypes) => {
  const Project = sequelize.define(
    "project", // Model name
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: false,
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
      // options  
      timestamps: true,
      underscrored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Project;
};
