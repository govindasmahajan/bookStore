'use strict';
const db = require("../models");
const Book = db.books;
const Author = db.authors;
const Publisher = db.publishers;
const User = db.users;
const Order = db.orders;
const Step = require('step');
const utility = require('../middlewares/utility');
const lo = require('lodash');

module.exports = class Users {
    constructor(_name) {
        this.name = _name;
        console.info(this.name + ' initialized');
        this.utilityObj = new utility();
    }

    getUsers(req, res, next) {
        let self = this;
        let statusCode = 500;
        let _body = req.body;


        Step(

            function _getUsersDetails() {
                self.getUsersDetails(this);
            },

            function _sendResponse(err, _resp) {
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
                        "response": _resp
                    });
                }
            }
        );
    }

    getUsersDetails(cb) {
        User.findAll({
            raw: true
        }).then(resp => {
            return cb(null, resp);
        }).catch(err => {
            console.error(err);
            return cb(err, null)
        });
    }

};