const Users = require('../config/user');
const db = require("../models");
const contactList = db.contactList;
const userContact = db.userContact;


const validation = (req, res, next) => {
    const authorization = req.query.authorization;
    const deviceToken = req.query.deviceToken;
    const fingerPrint = req.query.fingerPrint;
    if (authorization&&deviceToken&&fingerPrint) {
      const user = Users.find(_user => _user.authorization === authorization
        &&_user.deviceToken===deviceToken&&_user.fingerPrint===fingerPrint);
        if(user){
          console.log(user)
          next()
        } else {
          res.status(401).send('Not authorized')
        }
    } else {
      res.status(401).send('Not authorized')
    }
}
const getUserId = (authorization)=>{
  const user = Users.find(_user => _user.authorization === authorization)
  return user.name
}

const contactExist = (mobile)=>{
  return new Promise((resolve,reject)=>{
    contactList.findOne({where:{mobile:mobile}}).then(contact=>{
    
        resolve(contact)
    }).catch(err=>{ reject(err)})

  })

}
const userExistBefore = (userId,contactId)=>{
  return new Promise((resolve,reject)=>{
    userContact.findOne({where:{userId:userId,contactListId:contactId}}).then(contact=>{
        resolve(contact)
    }).catch(err=>{ reject(err)})

  })

}

module.exports = {getUserId, validation, contactExist, userExistBefore}