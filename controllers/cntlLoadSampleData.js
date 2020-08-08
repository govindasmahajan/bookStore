'use strict';
const db = require("../models");
const Book = db.books;
const Author = db.authors;
const Publishers = db.publishers;
const Users = db.users;
const Step = require('step');
const path = require('path');
const lo = require('lodash');
const User = require("../models/User");

module.exports = class LoadSampleData {
    constructor(_name) {
        this.name = _name;
        console.info(this.name + ' initialized');
    }

    addAuthorsData(req, res, next) {
        let self = this;
        let _csvData = [];
        let invalidData, alreadyPresent, dataToSave = [];

        Step(

            function _processCSV() {
                self.processCSV('./sample-data/MOCK_DATA_AUTHORS.csv', this.parallel());

            },

            function _validateData(err, csvData) {
                let group = this.group();

                if (err) {
                    console.error(err);
                    throw err;
                } else {
                    _csvData = lo.cloneDeep(csvData);
                    csvData.forEach(function (_itm, _idx) {
                        _itm.error = '';
                        self.validateAuthorsData(_itm, _idx, group());
                    });
                }
            },

            function _saveAuthorsData(err, data) {
                if (err) {
                    console.error(err);
                    throw err;
                } else {
                    dataToSave = lo.filter(data, {
                        'exists': false,
                        'error': ''
                    });

                    alreadyPresent = lo.filter(data, {
                        'exists': true,
                        'error': ''
                    });

                    invalidData = lo.filter(data, function (o) {
                        return o.error != '';
                    })

                    self.saveAuthorsData(dataToSave, this.parallel());
                }
            },

            function _sendResponse(err, resp) {
                if (err) {
                    console.error(err);
                    res.status(500).send({
                        err
                    });
                } else {
                    res.status(200).send({
                        "record_inserted": resp,
                        "record_already_present": alreadyPresent,
                        "record_with_validation error": invalidData
                    });
                }
            }
        );
    }

    addPublishersData(req, res, next) {
        let self = this;
        let _csvData = [];
        let invalidData, alreadyPresent, dataToSave = [];

        Step(

            function _processCSV() {
                self.processCSV('./sample-data/MOCK_DATA_PUBLISHERS.csv', this.parallel());
            },

            function _validateData(err, csvData) {
                let group = this.group();

                if (err) {
                    console.error(err);
                    throw err;
                } else {
                    _csvData = lo.cloneDeep(csvData);
                    csvData.forEach(function (_itm, _idx) {
                        _itm.error = '';
                        self.validatePubData(_itm, _idx, group());
                    });
                }
            },

            function _savePubData(err, data) {
                if (err) {
                    console.error(err);
                    throw err;
                } else {
                    dataToSave = lo.filter(data, {
                        'exists': false,
                        'error': ''
                    });

                    alreadyPresent = lo.filter(data, {
                        'exists': true,
                        'error': ''
                    });

                    invalidData = lo.filter(data, function (o) {
                        return o.error != '';
                    })

                    self.savePubData(dataToSave, this.parallel());
                }
            },

            function _sendResponse(err, resp) {
                if (err) {
                    console.error(err);
                    res.status(500).send({
                        err
                    });
                } else {
                    res.status(200).send({
                        "record_inserted": resp,
                        "record_already_present": alreadyPresent,
                        "record_with_validation error": invalidData
                    });
                }
            }
        );
    }

    addBooksData(req, res, next) {
        let self = this;
        let _csvData = [];
        let invalidData, alreadyPresent, dataToSave = [];

        Step(

            function _processCSV() {
                self.processCSV('./sample-data/MOCK_DATA_BOOKS.csv', this.parallel());

            },

            function _validateData(err, csvData) {
                let group = this.group();

                if (err) {
                    console.error(err);
                    throw err;
                } else {
                    _csvData = lo.cloneDeep(csvData);
                    csvData.forEach(function (_itm, _idx) {
                        _itm.error = '';
                        self.validateBookData(_itm, _idx, group());
                    });
                }
            },

            function _saveBookData(err, data) {
                if (err) {
                    console.error(err);
                    throw err;
                } else {
                    dataToSave = lo.filter(data, {
                        'exists': false,
                        'error': ''
                    });

                    alreadyPresent = lo.filter(data, {
                        'exists': true,
                        'error': ''
                    });

                    invalidData = lo.filter(data, function (o) {
                        return o.error != '';
                    })

                    self.saveBookData(dataToSave, this.parallel());
                }
            },

            function _sendResponse(err, resp) {
                if (err) {
                    console.error(err);
                    res.status(500).send({
                        err
                    });
                } else {
                    res.status(200).send({
                        "record_inserted": resp,
                        "record_already_present": alreadyPresent,
                        "record_with_validation error": invalidData
                    });
                }
            }
        );
    }

    addUsersData(req, res, next) {
        let self = this;
        let _csvData = [];
        let invalidData, alreadyPresent, dataToSave = [];

        Step(

            function _processCSV() {
                self.processCSV('./sample-data/MOCK_DATA_USERS.csv', this.parallel());

            },

            function _validateData(err, csvData) {
                let group = this.group();

                if (err) {
                    console.error(err);
                    throw err;
                } else {
                    _csvData = lo.cloneDeep(csvData);
                    csvData.forEach(function (_itm, _idx) {
                        _itm.error = '';
                        self.validateUsersData(_itm, _idx, group());
                    });
                }
            },

            function _saveUsersData(err, data) {
                if (err) {
                    console.error(err);
                    throw err;
                } else {
                    dataToSave = lo.filter(data, {
                        'exists': false,
                        'error': ''
                    });

                    alreadyPresent = lo.filter(data, {
                        'exists': true,
                        'error': ''
                    });

                    invalidData = lo.filter(data, function (o) {
                        return o.error != '';
                    })

                    self.saveUsersData(dataToSave, this.parallel());
                }
            },

            function _sendResponse(err, resp) {
                if (err) {
                    console.error(err);
                    res.status(500).send({
                        err
                    });
                } else {
                    res.status(200).send({
                        "record_inserted": resp,
                        "record_already_present": alreadyPresent,
                        "record_with_validation error": invalidData
                    });
                }
            }
        );
    }

    processCSV(csvPath, cb) {
        const csvFilePath = path.resolve(csvPath);
        console.log('csvFilePath....', csvFilePath);
        const csv = require('csvtojson')
        csv().fromFile(csvFilePath)
            .then((jsonObj) => {
                return cb(null, jsonObj);
            }).error((error) => {
                console.error(error);
                return cb(error, null);
            });
    }

    validateBookData(itm, idx, cb) {
        let itmObj = lo.cloneDeep(itm);
        if (itmObj.title && itmObj.author_id && itmObj.publisher_id) {
            Book.findOne({
                raw: true,
                where: {
                    title: itmObj.title,
                    author_id: itmObj.author_id
                }
            }).then(response => {
                if (response) {
                    itmObj.exists = true;
                } else {
                    itmObj.exists = false;
                }
                return cb(null, itmObj)
            }).catch(err => {
                console.error(err);
                return cb(err, null);
            })
        } else {
            itmObj.error = "Mandatory field missing or misspelt";
            return cb(null, itmObj);
        }
    }

    validateAuthorsData(itm, idx, cb) {
        let itmObj = lo.cloneDeep(itm);
        if (itmObj.first_name && itmObj.last_name && itmObj.email) {
            Author.findOne({
                raw: true,
                where: {
                    first_name: itmObj.first_name,
                    last_name: itmObj.last_name,
                    email: itmObj.email
                }
            }).then(response => {
                if (response) {
                    itmObj.exists = true;
                } else {
                    itmObj.exists = false;
                }
                return cb(null, itmObj)
            }).catch(err => {
                console.error(err);
                return cb(err, null);
            })
        } else {
            itmObj.error = "Mandatory field missing or misspelt";
            return cb(null, itmObj);
        }
    }

    validatePubData(itm, idx, cb) {
        let itmObj = lo.cloneDeep(itm);
        if (itmObj.publication_name) {
            Publishers.findOne({
                raw: true,
                where: {
                    publication_name: itmObj.publication_name
                }
            }).then(response => {
                if (response) {
                    itmObj.exists = true;
                } else {
                    itmObj.exists = false;
                }
                return cb(null, itmObj)
            }).catch(err => {
                console.error(err);
                return cb(err, null);
            })
        } else {
            itmObj.error = "Mandatory field missing or misspelt";
            return cb(null, itmObj);
        }
    }

    validateUsersData(itm, idx, cb) {
        let itmObj = lo.cloneDeep(itm);
        if (itmObj.email && itmObj.phone && itmObj.first_name) {
            Users.findOne({
                raw: true,
                where: {
                    first_name: itmObj.first_name,
                    email: itmObj.email,
                    phone: itmObj.phone
                }
            }).then(response => {
                if (response) {
                    itmObj.exists = true;
                } else {
                    itmObj.exists = false;
                }
                return cb(null, itmObj)
            }).catch(err => {
                console.error(err);
                return cb(err, null);
            })
        } else {
            itmObj.error = "Mandatory field missing or misspelt";
            return cb(null, itmObj);
        }
    }

    saveBookData(data, cb) {
        Book.bulkCreate(data)
            .then(data => {
                return cb(null, data);
            })
            .catch(err => {
                console.error(err);
                return cb(err, null);
            });
    }

    saveAuthorsData(data, cb) {
        Author.bulkCreate(data)
            .then(data => {
                return cb(null, data);
            })
            .catch(err => {
                console.error(err);
                return cb(err, null);
            });
    }

    savePubData(data, cb) {
        Publishers.bulkCreate(data)
            .then(data => {
                return cb(null, data);
            })
            .catch(err => {
                console.error(err);
                return cb(err, null);
            });
    }

    saveUsersData(data, cb) {
        Users.bulkCreate(data)
            .then(data => {
                return cb(null, data);
            }).catch(err => {
                console.error(err);
                return cb(err, null);
            });
    }
};