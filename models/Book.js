'use strict';

module.exports = (sequelizeConn, Sequelize) => {
  const Book = sequelizeConn.define("book", {
    book_id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    author_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'author',
        key: 'author_id'
      }
    },
    publisher_id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'publisher',
        key: 'publisher_id'
      }
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isbn: {
      type: Sequelize.STRING,
      allowNull: false
    },
    genre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    edition: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.STRING,
      allowNull: false
    },
    quantity: {
      type: Sequelize.BIGINT,
      allowNull: false
    },
    image_url: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true
  });

  return Book;
};