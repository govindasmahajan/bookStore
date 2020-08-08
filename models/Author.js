'use strict';

module.exports = (sequelizeConn, Sequelize) => {
  const Author = sequelizeConn.define("author", {
    author_id: {
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
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
  }, {
    freezeTableName: true
  });

  return Author;
};