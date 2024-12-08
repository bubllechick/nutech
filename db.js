const Sequelize = require("sequelize");
require('dotenv').config();

const membership_model = require("./apps/models/membership");
const banner_model = require("./apps/models/banner");
const services_model = require("./apps/models/services");
const balance_model = require("./apps/models/balance");
const transaction_model = require("./apps/models/transaction");

const sequelize = new Sequelize( process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql", // or any other dialect
  pool: {
    max: 5, // Maximum number of connection in pool
    min: 0, // Minimum number of connection in pool
    acquire: 30000, // The maximum time (ms) that a connection can be idle before being released
    idle: 10000 // The maximum time (ms) that pool will try to get connection before throwing error
  }
});

var membership = membership_model(sequelize);
var banner = banner_model(sequelize);
var services = services_model(sequelize);
var balance = balance_model(sequelize);
var transaction = transaction_model(sequelize);

membership.hasMany(balance, { foreignKey: "idMembership" });
balance.belongsTo(membership, { foreignKey: "idMembership" });

membership.hasMany(transaction, { foreignKey: "idMembership" });
transaction.belongsTo(membership, { foreignKey: "idMembership" });

sequelize
  .sync({ alter: true })
  .then( async () => {
    console.log("Database and tables synchronized successfully.");
    process.exit()
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });

module.exports = {
  membership,
  banner,
  services,
  balance,
  transaction
};
