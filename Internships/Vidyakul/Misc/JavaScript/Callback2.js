greet = (name, callback) => {
  // cannot define a function inside the parameter of a newly defined function
  console.log("Hello " + name);
  callback();
};

greet("Ahan", function () {
  // can define a function inside the parameter of an already defined function
  console.log("Callback function being called\n");
});

greet("Ahan", () => {
  // using shorter syntax
  console.log("Callback function being called\n");
});
