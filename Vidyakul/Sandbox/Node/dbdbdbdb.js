const mysql2 = require("mysql2");

const pool = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "testdb",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

const add = (data) => {
  let FirstName = "Ahan";
  let LastName = "Jain";
  let Age = 21;
  let State = "Delhi";

  let qry = `INSERT into Details (FirstName, LastName, Age, State) VALUES(?, ?, ?, ?)`;

  pool.query(qry, [FirstName, LastName, Age, State], (error, result) => {
    if (error) {
      console.log("Error Occurred: " + error);
    } else {
      console.log("Successfully Added");
    }
  });
};

// const viewAll = () => {
//   let qry = "SELECT * FROM Details";

//   pool.query(qry, (error, result) => {
//     if (error) {
//       console.log("Error Occurred: " + error);
//     } else {
//       console.log(result);
//     }
//   });
// };

module.exports = { add };
