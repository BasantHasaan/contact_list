const { contactList } = require(".");

module.exports = (sequelize, DataTypes) => {
  const contactList = sequelize.define("contact_list", {
    email: {
      type: DataTypes.STRING,
    },
    mobile: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    }
  });

  return contactList;
};

