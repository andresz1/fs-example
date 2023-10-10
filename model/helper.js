require("dotenv").config();
const mysql = require("mysql2");

module.exports = async function db(query) {
  const results = {
    data: [],
    error: null
  };
  let promise = await new Promise((resolve, reject) => {
    const DB_HOST = process.env.DB_HOST;
    const DB_USER = process.env.DB_USER;
    const DB_PASS = process.env.DB_PASS;
    const DB_NAME = process.env.DB_NAME;
    const DB_PORT = process.env.DB_PORT;

    const con = mysql.createConnection({
      host: DB_HOST || "127.0.0.1",
      user: DB_USER || "root",
      password: DB_PASS,
      database: DB_NAME || "database",
      multipleStatements: true,
      port: DB_PORT || 3306
    });

    console.log("DB", {
      host: DB_HOST || "127.0.0.1",
      user: DB_USER || "root",
      password: DB_PASS,
      database: DB_NAME || "database",
      multipleStatements: true,
      port: DB_PORT || 3306
    });

    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");

      console.log("query", query);

      con.query(query, function(err, result) {
        console.log("result", result);

        if (err) {
          results.error = err;
          console.log(err);
          reject(err);
          con.end();
          return;
        }

        if (!result.length) {
          if (result.affectedRows === 0) {
            results.error = "Action not complete";
            console.log(err);
            reject(err);
            con.end();
            return;
          }

          // push the result (which should be an OkPacket) to data
          // germinal - removed next line because it returns an array in an array when empty set
          // results.data.push(result);
        } else {
          result.forEach(row => results.data.push(row));
        }

        con.end();
        resolve(results);
      });
    });
  });

  return promise;
};
