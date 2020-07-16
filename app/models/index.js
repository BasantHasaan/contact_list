const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.contactList = require("./contactList")(sequelize, Sequelize);
db.userContact = require("./userContact")(sequelize, Sequelize);

db.contactList.hasMany(db.userContact, { as: "user_contact" });
db.userContact.belongsTo(db.contactList, {
  foreignKey: "contactListId",
  as: "contactList",
});

// db.tag.belongsToMany(db.tutorial, {
//   through: "tutorial_tag",
//   as: "tutorials",
//   foreignKey: "tag_id",
// });
// db.tutorial.belongsToMany(db.tag, {
//   through: "tutorial_tag",
//   as: "tags",
//   foreignKey: "tutorial_id",
// });

module.exports = db;