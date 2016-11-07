'use strict';

class FlipTricksSvc {
    constructor (DbConnect) {
        this.DbConnect = DbConnect;
    }

    getAll (cb) {
        return this.DbConnect.query('SELECT * FROM flip_tricks', cb);
    }
}

module.exports = FlipTricksSvc;