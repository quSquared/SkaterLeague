'use strict';

var mysql = require('mysql');

module.exports = function () {
  let pool = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : 'qSqrdSk@t3L3@gu3',
    database : 'skater_league'
  });      

  function poolManager(sql, cb) {
    
    pool.getConnection(function(err, connection){
      if (err) {
        res.json({"code" : 100, "status" : "Error in connection database"});
        return;
      }   

      console.log('connected as id ' + connection.threadId);
      
      connection.query(sql, function(err, rows, fields) {
        connection.release();
      
        cb(err, rows);
      });      

      connection.on('error', function(err) {      
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;     
      });
  });
}
  
  return {
    query: function (sql, cb) {
      poolManager(sql, cb)
    }
  }
}