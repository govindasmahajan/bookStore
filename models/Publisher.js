'use strict';

module.exports = (sequelizeConn, Sequelize) => {
  const Publisher = sequelizeConn.define("publisher", {
    publisher_id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    publication_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
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
    },
  }, {
    freezeTableName: true
  });

  return Publisher;
};