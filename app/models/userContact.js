module.exports = (sequelize, DataTypes) => {
  const userContact = sequelize.define("user_contact", {
    contactListId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.STRING,
    }
 
  });

  return userContact;
};

