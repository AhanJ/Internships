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

let message = "";

const add = (data) => {
  let FirstName = data.fname;
  let LastName = data.lname;
  let Age = data.age;
  let State = data.state;

  let qry = `INSERT into Details (FirstName, LastName, Age, State) VALUES(?, ?, ?, ?)`;

  pool.query(qry, [FirstName, LastName, Age, State], (error, result) => {
    if (error) {
      console.log(error);
      message = "Error Occurred";
    } else {
      message = "Successfully Added";
    }
    return message;
  });
};

// const viewAll = () => {
//   let qry = "SELECT * FROM Details";

//   pool.query(qry, (error, result) => {
//     if (error) {
//       console.log(error);
//       message = "Error Occurred";
//     } else {
//       message = "Processed";
//     }
//     return message;
//   });
// };

// const view = () => {
//   //add logic
// };

module.exports = { add };
