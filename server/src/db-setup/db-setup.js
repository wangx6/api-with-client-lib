/**
 * 
 * @param
 * @return
 */

module.exports = (function() {
    'use strict';

    const fs = require('fs');
    const sql = fs.readFileSync('./server/src/database/teckro_db.sql').toString();
    const mysql = require('mysql');
    const tables = [
        'user',
        'log',
        'api_key',
        'medical_profile',
    ];
    let connection = null;

    const initDatabase = () => {
        return new Promise((resolve, reject) => {
            const con = mysql.createConnection({
            	host: "localhost",
            	user: "root",
            	password: "",
                database: 'teckro_db',
                multipleStatements: true
            });

            con.connect(function(err) {
                if (err) reject({ok: false, err});
                resolve({ok: true, connection: con});
                connection = con;
                createDb();
            });
        });

    };

    const createDb = () => {
        const newSql = sql.replace(/CREATE TABLE/g, 'CREATE TABLE IF NOT EXISTS');

        return new Promise((resolve, reject) => {
            connection.query(newSql, function (err, result) {
                if (err) {
                    console.log(err);
                    reject({ok: false, error: err});
                }
                resolve({ok: true, result});
            });
        });
    }

    return { initDatabase };

})();