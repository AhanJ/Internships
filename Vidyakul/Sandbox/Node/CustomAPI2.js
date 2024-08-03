const app = require("express")();
const axios = require("axios");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.listen(8080);

app.post("/API", (req, res) => {
  // generates a random number and sends back the received value as is

  let num1 = Math.floor(Math.random() * 10);
  let num2 = req.body.a;

  console.log("Number Generated by API: " + num1);
  console.log("Number Received: " + num2);

  // res.json() is used to return a json response

  res.json({
    num1: num1,
    num2: num2,
  });
});

app.get("/APITest", async (req, res) => {
  const apiResponse = await axios({
    method: "POST",
    url: "http://127.0.0.1:8080/API",

    data: {
      a: 5,
    },
  });

  res.send(
    "Random Number: " +
      apiResponse.data.num1 +
      "\nSent Number: " +
      apiResponse.data.num2
  );
});
