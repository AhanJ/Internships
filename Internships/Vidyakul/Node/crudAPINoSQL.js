const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.listen(8080);

const url = "mongodb://localhost:27017/TestDB";

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to NoSQL Database");
  })
  .catch((error) => {
    console.log("Error Connecting to NoSQL Database.\n" + error);
  });

const schema = {
  name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  sub: {
    type: Boolean,
    required: true,
  },

  city: {
    type: String,
    required: false,
  },
};

const stu = mongoose.model("students", schema);

// CREATE - POST - Create an entity - /crud/add
// READ - GET - Get all entities from the resource - /crud/details
// READ - GET - Get a single entity - /crud/details/user
// UPDATE - PUT - Update an entity - /crud/details/user
// DELETE - DELETE - Delete an entity - /crud/details/user

app.get("/crud", (req, res) => {
  res.send("Welcome to CRUD API for NoSQL Database.");
});

app.post("/crud/add", async (req, res) => {
  try {
    const data = await stu.create(req.body);

    res.status(200).send("User Added.");
    console.log("User Added.");
  } catch (error) {
    res.send("Error Occurred While Adding User.\n" + error);
  }
});

app.get("/crud/details", async (req, res) => {
  try {
    const data = await stu.find({});

    res.status(200).json(data);
    console.log("All User Details Sent.");
  } catch (error) {
    res.send("Error Occurred While Getting Data.\n" + error);
  }
});

app.get("/crud/details/user", async (req, res) => {
  try {
    const data = await stu.findById(req.query.id);

    res.status(200).json(data);
    console.log("User Details Sent.");
  } catch (error) {
    res.send("Error Occurred While Getting Data.\n" + error);
  }
});

app.put("/crud/details/user", async (req, res) => {
  try {
    const data = await stu.findByIdAndUpdate(req.query.id, req.body);

    res.status(200).send("User Updated.");
    console.log("User Updated.");
  } catch (error) {
    res.send("Error Occurred While Updating User.\n" + error);
  }
});

app.delete("/crud/details/user", async (req, res) => {
  try {
    const data = await stu.findByIdAndDelete(req.query.id);

    res.status(200).send("User Deleted.");
    console.log("User Deleted.");
  } catch (error) {
    res.send("Error Occurred While Deleting User.\n" + error);
  }
});
