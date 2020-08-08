'use strict';

module.exports = (sequelizeConn, Sequelize) => {
    const Order = sequelizeConn.define("order", {
        order_id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        book_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: 'book',
                key: 'book_id'
            }
        },
        user_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: 'user',
                key: 'user_id'
            }
        },
        issued_at: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
            /* 1 : true : book currently issued to user_id */
            /* 0 : false : book returned by user_id */
        }
    }, {
        freezeTableName: true
    });

    return Order;
};