const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



const db = require("./app/models");
const TutorialController = require("./app/controllers/tutorial.controller");
const TagController = require("./app/controllers/tag.controller");

const run = async () => {
  const tut2 = await TutorialController.create({
    title: "Tut#2",
    description: "Tut#2 Description",
  });
  
  const tut3 = await TutorialController.create({
    title: "Tut#3",
    description: "Tut#3 Description",
  });
  
  const tut4 = await TutorialController.create({
    title: "Tut#4",
    description: "Tut#4 Description",
  });
  const tag1 = await TagController.create({
    name: "Tag#1",
  });

  const tag2 = await TagController.create({
    name: "Tag#2",
  });
  await TagController.addTutorial(tag1.id, tut1.id);
// >> added Tutorial id=1 to Tag id=1

await TagController.addTutorial(tag1.id, tut2.id);
// >> added Tutorial id=2 to Tag id=1

await TagController.addTutorial(tag1.id, tut3.id);
// >> added Tutorial id=3 to Tag id=1

await TagController.addTutorial(tag2.id, tut3.id);
// >> added Tutorial id=3 to Tag id=2

await TagController.addTutorial(tag2.id, tut4.id);
// >> added Tutorial id=4 to Tag id=2

await TagController.addTutorial(tag2.id, tut1.id);
const tags = await TagController.findAll();


};

// db.sequelize.sync();
// // drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Contact List application." });
});

// require("./app/routes/tutorial.route")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
