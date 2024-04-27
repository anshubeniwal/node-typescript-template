const fs = require("fs");
const path = require("path");

const basename = path.basename(__filename);
const models: any = {};

const Sequelize = require("sequelize");
// Assuming you have already initialized Sequelize instance `db`
import db = require("../../config/database");

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
    );
  })
  .forEach((file) => {
    // Import model file
    const model = require(path.join(__dirname, file))(
      db.db,
      Sequelize.DataTypes
    );

    // Define model using Sequelize.define
    models[model.name] = model;
  });

// Associate models
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = db;

export default models;
