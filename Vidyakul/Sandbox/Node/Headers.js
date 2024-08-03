const app = require("express")();

app.listen(8080);

// request/req is used to request data i.e. from client to server
// response/res is used to respond to the client i.e send data from server to client

app.get("/", (req, res) => {
  res.send("Home Page");
});

const uname = "ahan";
const pass = "test";

app.get("/login", (req, res) => {
  if (req.header("Username") == uname && req.header("Password") == pass) {
    res.status(200).send("Authorised");
  } else {
    res.status(401).send("Unauthorised");
  }
});
