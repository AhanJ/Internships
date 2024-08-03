const bcrypt = require("bcrypt");
const password = "Name@123";
const saltRounds = 10;

// saltrounds is the cost factor which determines how much time is needed to calculate a bcrypt hash
// higher the number, more secure is the password but more time consuming is the hash generation

// bcrypt.hash(password, saltRounds).then((hash) => {

//     console.log('Hash ' + hash)
//     validate(hash)

// }).catch(err => console.error(err.message))

// const validate = (hash) => {

//     bcrypt.compare(password, hash).then((res) => {
//     console.log(res)
// })
// }

var epass = "placeholder";

bcrypt
  .hash(password, saltRounds)
  .then((hash) => {
    validate(hash);
  })
  .catch((error) => {
    console.log("Error While Hashing Password");
  });

const validate = (hash) => {
  bcrypt.compare(password, hash).then((res) => {
    console.log(res);
  });
};
