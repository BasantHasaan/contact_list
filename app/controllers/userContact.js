const db = require("../models");
const userContact = db.userContact;


const addUserContact = (contactId,userId)=>{
  console.log(contactId)
  return new Promise((resolve,reject)=>{
    return userContact.create({
      contactListId: contactId,
      userId: userId,
    }).then((usercontact) => {
      console.log(">> Created contact: " + JSON.stringify(usercontact, null, 4));
      resolve(usercontact)
      }).catch((err) => {
        console.log(">> Error while creating Tutorial: ", err);
        reject(err)
      });


  })


  

}

module.exports = addUserContact