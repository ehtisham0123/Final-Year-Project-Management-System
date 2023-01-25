module.exports = (sequelize, Sequelize, DataTypes) => {
  const Supervisor = sequelize.define(
    "supervisor", // Model name
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
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

  return Supervisor;
};
