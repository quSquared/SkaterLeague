'use strict';

var DbConnect = require('../dbConnect/dbConnect');

class FlipTricksSvc {
    constructor () {
        this.DbConnect = DbConnect();
    }

    getAll (cb) {
        return this.DbConnect.query('SELECT * FROM flip_tricks', cb);
    }
}

module.exports = FlipTricksSvc;