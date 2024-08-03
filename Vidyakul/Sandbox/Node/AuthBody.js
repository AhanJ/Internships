const app = require("express")();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.listen(8080);

// request/req is used to request data i.e. from client to server
// response/res is used to respond to the client i.e send data from server to client

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.post("/login", (req, res) => {
  if (req.body.Password.length < 8) {
    // Object.length returns size of JSON object

    res
      .status(401)
      .send("Invalid Password. Password Should be of at Least 8 Characters");
  } else if (req.body.Username == "Ahan" && req.body.Password == "Password") {
    res.send("Authorised");
  } else {
    res.status(401).send("Unauthorised");
  }
});
