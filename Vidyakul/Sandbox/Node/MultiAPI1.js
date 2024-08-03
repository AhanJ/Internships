const axios = require("axios");

const API1 = async () => {
  const apiResponse = await axios({
    method: "GET",
    url: "https://catfact.ninja/fact",
  });

  console.log("Fact: " + apiResponse.data.fact);
};

const API2 = async () => {
  const apiResponse = await axios({
    method: "GET",
    url: "https://api.coindesk.com/v1/bpi/currentprice.json",
  });

  console.log(
    "BitCoin Price Index as of " +
      apiResponse.data.time.updated +
      ": $" +
      apiResponse.data.bpi.USD.rate
  );
};

const API3 = async () => {
  const apiResponse = await axios({
    method: "GET",
    url: "https://official-joke-api.appspot.com/random_joke",
  });

  console.log(
    "Joke\n     Setup: " +
      apiResponse.data.setup +
      "\n     Punchline: " +
      apiResponse.data.punchline
  );
};

API1();
API2();
API3();
