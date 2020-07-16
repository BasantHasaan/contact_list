const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./app/models");
const contacts = require("./app/routes/contactList");
const {validation} = require("./app/controllers/validation");


// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));




// db.sequelize.sync();
// // drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
app.use( validation );

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Contact_List" });
});

app.use('/contacts',contacts)
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use((err, req, res, next) => {
  console.log(err);
  if (!res.headersSent) {
    res.status(err.httpStatusCode || 500).render('UnknownError');
  }
});