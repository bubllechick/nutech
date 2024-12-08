var DataTypes = require("sequelize").DataTypes;

var _membership = require("./membership");
var _services = require("./services");
var _banner = require("./banner");

function initModels(sequelize) {
  var membership = _membership(sequelize, DataTypes);
  var services = _services(sequelize, DataTypes);
  var banner = _banner(sequelize, DataTypes);

  return {
    membership,
    services,
    banner
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
