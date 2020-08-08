'use strict';

module.exports = (sequelizeConn, Sequelize) => {
    const User = sequelizeConn.define("user", {
        user_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        street: {
            type: Sequelize.STRING,
            allowNull: false
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        postal_code: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });

    return User;
};