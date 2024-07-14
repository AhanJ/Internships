const app = require("express")();
const bodyParser = require("body-parser");
const mysql2 = require("mysql2");

app.use(bodyParser.json());

app.listen(8080);

const cdetails = {
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "TestDB",
};

const con = mysql2.createConnection(cdetails);

const checkcon = () => {
  con.connect((error) => {
    if (error) {
      console.log("Error Connecting");
    } else {
      console.log("Connection Successful");
    }
  });
};

app.get("/crud", (req, res) => {
  res.send("Welcome to CRUD API for SQL Database.");
});

app.get("/crud/details", (req, res) => {
  checkcon();

  let qry = "SELECT * FROM Details";

  con.query(qry, (error, result) => {
    if (error) {
      res.send("Error!");
    } else {
      res.send(result);
    }
  });
});

app.get("/crud/details/user", (req, res) => {
  checkcon();

  // here we can also use ${id} instead of question mark but that could result in SQL injection
  // SQL injection is placement of malicious code in databases over HTTP requests
  // id also has to be placed in the query() function and if we have multiple ? i.e multiple variables
  // an array is used to place all the variables
  // can use array for single variable too for code uniformity

  const id = parseInt(req.query.id);
  console.log(id);

  let qry = `SELECT * FROM Details WHERE id = ?`; // ` is the backtick character - used to define template literals

  con.query(qry, [id], (error, result) => {
    if (error) {
      res.send("User Not Found");
    } else {
      res.send(result);
    }
  });
});

// avoid taking id from user, auto increment it in database

app.post("/crud/details", (req, res) => {
  checkcon();

  let qry = `INSERT into Details (id,name,address,email,phone) VALUES(?, ?, ?, ?, ?)`;

  let id = req.body.id;
  let name = req.body.name;
  let address = req.body.address;
  let email = req.body.email;
  let phone = req.body.phone;

  con.query(qry, [id, name, address, email, phone], (error, result) => {
    if (error) {
      res.send("Error!");
    } else {
      res.send("User Added");
    }
  });
});

// update (PUT) in such a way that only one key is sent instead of entire json object - DONE

// fix possible SQL injection
// try not splitting into seprate statements as separate statements increase overhead

app.put("/crud/details", (req, res) => {
  checkcon();

  let id = req.body.id;

  let key = Object.keys(req.body);
  let val = Object.values(req.body);

  var keyval = [];

  for (i = 1; i < key.length; i++) {
    keyval[i - 1] = key[i] + " = " + JSON.stringify(val[i]);
  }

  var qry = `UPDATE Details SET ${keyval} WHERE id = ?`;

  console.log(qry);

  con.query(qry, [id], (error, result) => {
    if (error) {
      res.send("Error!");
    } else {
      res.send("User Updated");
    }
  });
});

// typecast id to see if it is a single integer

app.delete("/crud/details/:id", (req, res) => {
  let id = req.params.id;
  let qry = `DELETE FROM Details WHERE id = ?`;

  checkcon();

  con.query(qry, [id], (error, result) => {
    if (error) {
      res.send("Error!");
    } else {
      res.send(result);
    }
  });
});
