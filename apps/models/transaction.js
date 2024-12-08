const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('transaction', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        invoice_number: {
            type: Sequelize.STRING,
            allowNull: false
        },
        transaction_type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        total_amount: {
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
        tableName: 'transaction',
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
