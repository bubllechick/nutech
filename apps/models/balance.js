const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('balance', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    balance: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    idMembership: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'membership',
          key: 'id'
        }
      },
  }, {
    sequelize,
    tableName: 'balance',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "idMembership",
        using: "BTREE",
        fields: [
          { name: "idMembership" },
        ]
      },
    ]
  });
};
