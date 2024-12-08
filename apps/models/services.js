const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('services', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        service_code: {
            type: Sequelize.STRING,
            allowNull: false
        },
        service_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        service_icon: {
            type: Sequelize.STRING,
            allowNull: false
        },
        service_tariff: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'services',
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
        ]
    });
};
