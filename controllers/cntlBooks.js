'use strict';
const db = require("../models");
const Book = db.books;
const Author = db.authors;
const Publisher = db.publishers;
const Users = db.users;
const moment = require("moment");
const Orders = db.orders;
const Step = require('step');
const utility = require('../middlewares/utility');
const Sequelize = require("sequelize");

module.exports = class Books {
    constructor(_name) {
        this.name = _name;
        console.info(this.name + ' initialized');
        this.utilityObj = new utility();
    }

    getBooks(req, res, next) {
        let self = this;
        let statusCode = 400;

        Step(

            function _getAllBooks() {
                self.getAllBooks(this);
            },
            function _sendResponse(err, books) {
                if (err) {
                    console.error(err);
                    res.status(statusCode).send({
                        "status": false,
                        "message": null,
                        "error": err,
                        "response": null
                    });
                } else {
                    return res.status(200).send({
                        "status": true,
                        "message": 'success',
                        "error": null,
                        "response": books
                    });
                }
            }
        );
    }

    async getAllBooks(cb) {
        try {
            let books = await Book.findAll({
                raw: true,
                include: [
                    {
                        model: Author,
                        as: 'author',
                        required: false,
                        attributes: ['first_name', 'last_name', 'email']
                    },
                    {
                        model: Publisher,
                        as: 'publisher',
                        required: false,
                        attributes: {
                            exclude: ['publisher_id']
                        }
                    }
                ]
            })
            return cb(null, books);
        } catch (err) {
            console.error(err);
            return cb(err, null)
        }
    }

    getBookDetailsById(req, res, next) {
        let self = this;
        let statusCode = 400;
        let _body = req.body;
        let bookDetails;
        if (_body && _body.book_id) {
            Step(

                function _getDetailsById() {
                    self.getBookById(_body.book_id, this);
                },

                function _checkBookQty(err, book) {
                    if (err) {
                        throw err;
                    } else {
                        bookDetails = book;
                        bookDetails.available = true;
                        self.checkBookQuantity(_body, this);
                    }
                },

                function _sendResponse(err, quantity) {
                    if (err) {
                        res.status(statusCode).send({
                            "status": false,
                            "message": null,
                            "error": err,
                            "response": null
                        });
                    } else if (!quantity) {
                        bookDetails.available = false;
                        return res.status(202).send({
                            "status": true,
                            "message": 'Book quantity is not available...',
                            "error": null,
                            "response": bookDetails
                        });
                    } else {
                        return res.status(200).send({
                            "status": true,
                            "message": 'success',
                            "error": null,
                            "response": bookDetails
                        });
                    }
                }
            );
        } else {
            res.status(400).send({
                "status": false,
                "message": "Required field(s) missing in request body.",
                "response": null,
                "authorized": false
            });
        }
    }

    async getBookById(_id, cb) {
        try {
            let book = await Book.findOne({
                raw: true,
                where: { book_id: _id },
                include: [
                    {
                        model: Author,
                        as: 'author',
                        required: false,
                        attributes: ['first_name', 'last_name', 'email']
                    },
                    {
                        model: Publisher,
                        as: 'publisher',
                        required: false,
                        attributes: {
                            exclude: ['publisher_id']
                        }
                    }
                ]
            })
            return cb(null, book);
        } catch (err) {
            console.error(err);
            return cb(err, null)
        }
    }
    async getActiveOrders(cb) {
        try {
            let orders = await Orders.findAll({
                raw: true,
                where: { status: true }
            })
            return cb(null, orders);
        } catch (err) {
            console.error(err);
            return cb(err, null)
        }
    }

    userOrderBook(req, res, next) {
        let self = this;
        let statusCode = 400;
        let _body = req.body;
        let stack_order;
        if (_body && _body.book_id && _body.user_id) {
            Step(

                function _checkUserOrders() {
                    self.activeUserOrdersByBook(_body, this);
                },

                function _sendAssignBook(err, userOrders) {
                    if (err) {
                        res.status(statusCode).send({
                            "status": false,
                            "message": null,
                            "error": err,
                            "response": null
                        });
                    } else if (userOrders && userOrders.length) {
                        statusCode = 202
                        let error = `This book has already been assigned to this user!`;
                        stack_order = userOrders;
                        throw error;
                    } else {
                        self.checkBookQuantity(_body, this);
                    }
                },

                function _orderUserBook(err, order) {
                    if (err) {
                        throw err;
                    } else if (order) {
                        self.orderUserBook(_body, this);
                    } else {
                        statusCode = 202
                        let error = `Book quantity is not available...`;
                        throw error;
                    }
                },

                function _sendResponse(err, order) {
                    if (err) {
                        res.status(statusCode).send({
                            "status": false,
                            "message": null,
                            "error": err,
                            "response": stack_order || null
                        });
                    } else {
                        return res.status(200).send({
                            "status": true,
                            "message": 'success',
                            "error": null,
                            "response": order
                        });
                    }
                }
            );
        } else {
            res.status(400).send({
                "status": false,
                "message": "Required field(s) missing in request body.",
                "response": null,
                "authorized": false
            });
        }
    }

    async activeUserOrdersByBook(body, cb) {
        try {
            let orders = await Orders.findAll({
                raw: true,
                where: {
                    user_id: body.user_id,
                    book_id: body.book_id,
                    status: 1
                }
            })
            return cb(null, orders);
        } catch (err) {
            console.error(err);
            return cb(err, null)
        }
    }
    async activeOrdersByBookId(body, cb) {
        try {
            let orders = await Orders.findAll({
                raw: true,
                where: {
                    book_id: body.book_id,
                    status: 1
                }
            })
            return cb(null, orders);
        } catch (err) {
            console.error(err);
            return cb(err, null)
        }
    }
    async orderUserBook(body, cb) {
        try {
            /* status = true : book currently issues to user_id */
            let order = await Orders.create(body)
            return cb(null, order);
        } catch (err) {
            console.error(err);
            return cb(err, null)
        }
    }

    checkBookQuantity(body, cb) {
        let self = this;

        Step(

            function _checkBookQty() {
                self.getBookById(body.book_id, this.parallel());
                self.activeOrdersByBookId(body, this.parallel());
            },

            function _validateBookQty(err, book, orders) {

                if (err) {
                    return cb(err, null)
                } else if (orders && orders.length) {
                    if (book && book.quantity) {
                        let remainingCount = book.quantity - orders.length;
                        if (remainingCount && remainingCount > 0) {
                            return cb(null, remainingCount);
                        } else {
                            return cb(null, false);
                        }
                    } else {
                        return cb(err, null)
                    }
                } else {
                    /* No Orders Available : Direct issue of book is applicable*/
                    return cb(null, true);
                }
            }
        );
    }

    /* Controller to free up book by order_id */

    returnBookById(req, res, next) {
        let self = this;
        let statusCode = 400;
        let order_id = req.params.order_id;

        if (order_id) {
            Step(

                function _updateOrders() {
                    self.updateOrderById(order_id, this);
                },

                function _sendResponse(err, order) {
                    if (err) {
                        res.status(statusCode).send({
                            "status": false,
                            "message": null,
                            "error": err,
                            "response": null
                        });
                    } else {
                        return res.status(200).send({
                            "status": true,
                            "message": 'success',
                            "error": null,
                            "response": order
                        });
                    }
                }
            );
        } else {
            res.status(400).send({
                "status": false,
                "message": "Required field(s) missing in request body.",
                "response": null,
                "authorized": false
            });
        }
    }

    async updateOrderById(_id, cb) {
        try {
            let order = await Orders.update({ status: 0 }, {
                raw: true,
                where: {
                    order_id: _id,
                    status: 1
                }
            })
            return cb(null, order);
        } catch (err) {
            console.error(err);
            return cb(err, null)
        }
    }

    /* Controller to find orders of last 30 Days */

    orderHistory(req, res, next) {
        let self = this;
        let statusCode = 400;

        Step(

            function _getOrderHistory() {
                self.getOrderHistory(this);
            },

            function _sendResponse(err, orders) {
                if (err) {
                    res.status(statusCode).send({
                        "status": false,
                        "message": null,
                        "error": err,
                        "response": null
                    });
                } else {
                    return res.status(200).send({
                        "status": true,
                        "message": 'success',
                        "error": null,
                        "response": orders
                    });
                }
            }
        );
    }

    async getOrderHistory(cb) {
        try {
            let orders = await Orders.findAll({
                raw: true,
                where: {
                    issued_at: { [Sequelize.Op.between]: [moment().subtract(30, 'days').toDate(), moment().toDate()] }
                },
                include: [
                    {
                        model: Book,
                        as: 'book',
                        required: false
                    },
                    {
                        model: Users,
                        as: 'user',
                        required: false
                    }
                ]
            })
            return cb(null, orders);
        } catch (err) {
            console.error(err);
            return cb(err, null)
        }
    }
};