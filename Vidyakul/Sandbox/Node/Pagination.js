const app = require("express")();
const mysql2 = require("mysql2");

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

app.get("/", (req, res) => {
  res.send("Demoing Pagination");
});

app.get("/results/all", (req, res) => {
  checkcon();

  const qry = "SELECT * FROM Employee";

  con.query(qry, (error, result) => {
    if (error) {
      res.send("Error");
    } else {
      res.send(result);
    }
  });
});

// ORDER BY changes the results on each page since results are fetched, are ordered and then applied limit and offset

app.get("/results", (req, res) => {
  const pageNumber = parseInt(req.query.page); // page number
  const lim = parseInt(req.query.limit); // results to show per page

  let off = (pageNumber - 1) * lim;

  checkcon();

  const qry = `SELECT * FROM Employee ORDER BY EEID DESC LIMIT ? OFFSET ?`;

  con.query(qry, [lim, off], (error, result) => {
    if (error) {
      res.send("Error");
    } else {
      res.send(result);
    }
  });
});
