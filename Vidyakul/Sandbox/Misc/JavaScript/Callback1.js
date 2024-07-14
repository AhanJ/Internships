function greet(name, callback) {
  console.log("Hello " + name);
  callback();
}

function callb() {
  console.log("Callback function being called");
}

greet("Ahan", callb);
