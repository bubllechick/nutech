const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
  dialectOptions: {
    // useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: true,
    timezone: "+07:00",
  },
  operatorsAliases: 0,
  timezone: "+07:00", 
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.membership = require("./membership")(sequelize, Sequelize);
db.services = require("./services")(sequelize, Sequelize);
db.banner = require("./banner")(sequelize, Sequelize);
db.balance = require("./balance")(sequelize, Sequelize);
db.transaction = require("./transaction")(sequelize, Sequelize);

db.membership.hasMany(db.balance, { foreignKey: "idMembership" });
db.balance.belongsTo(db.membership, { foreignKey: "idMembership" });

db.membership.hasMany(db.transaction, { foreignKey: "idMembership" });
db.transaction.belongsTo(db.membership, { foreignKey: "idMembership" });

module.exports = db;
