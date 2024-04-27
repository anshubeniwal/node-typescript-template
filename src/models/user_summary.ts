"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user_summary",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      api_type: {
        type: DataTypes.STRING,
      },
      customerID: {
        type: DataTypes.INTEGER,
      },
      provider_id: {
        type: DataTypes.INTEGER,
      },
      json_value: {
        type: DataTypes.JSON,
      },
      Status: {
        type: DataTypes.INTEGER,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      created_by: {
        type: DataTypes.INTEGER,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    },
    {
      tableName: "user_summary",
      timestamps: false, // If you want Sequelize to handle timestamps automatically, set this to true
    },
    { underscored: true }
  );
  User.associate = function (models) {
    //
  };
  return User;
};
