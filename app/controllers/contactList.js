const db = require("../models");
const contactList = db.contactList;
const userContact = db.userContact;

const addUserContact= require("./userContact");
const  {getUserId, contactExist, userExistBefore}  = require("./validation")
// const {userContact }= require("../models/userContact");

exports.create = (contact) => {
  return new Promise((resolve,reject)=>{
    let userId = getUserId(contact.query.authorization)
    contactExist(contact.body.mobile).then(conExist=>{
      if(!conExist){
        return contactList.create({
          email: contact.body.email,
          firstName: contact.body.firstName,
          lastName: contact.body.lastName,
          mobile: contact.body.mobile,
      
        })
          .then((contact) => {
            console.log(">> Created contact: " + JSON.stringify(contact, null, 4));
            addUserContact(contact.id,userId).then((usercontact)=>{
              console.log( JSON.stringify(usercontact, null, 4))
              resolve([contact,usercontact])
            }).catch((err) => {
            console.log(">> Error while creating userContact: ", err);
            reject(err)
            });
          })
          .catch((err) => {
            console.log(">> Error while creating Contact: ", err);
            reject(err)
          });
      }else{
        userExistBefore(userId,conExist.id).then((resut)=>{
          if(!resut){
            addUserContact(conExist.id,userId).then((res)=>{
              console.log( JSON.stringify(res, null, 4))
              resolve(res)
            }).catch((err) => {
                console.log(">> Error while creating userContact: ", err);
                reject(err)
            });
          } else {
            resolve("You already Created Before")
          }
        }).catch((err) => {
            console.log(">> Error while creating userContact: ", err);
            reject(err)
          });
      }
    }) .catch((err) => {
      console.log(">> Error while creating Contact: ", err);
      reject(err)
    });
  }) 
};

exports.findAll = (contact) => {
  return new Promise((resolve,reject)=>{
    let userId = getUserId(contact)
    contactList.findAll({
      attributes: ['email','firstName',"lastName","mobile"],
      include: [
        {
        model: userContact,
        as: "user_contact",
        where: {
          userId: userId
    
        },
        required:false 
      }
    ]
    }).then(function(res){
      resolve(res)
      console.log(res);
    }).catch(err=>reject(err))
  })
};

exports.findLatest = (contact) => {
  return new Promise((resolve,reject)=>{
    let userId = getUserId(contact)
    contactList.findAll({
      attributes: ['email','firstName',"lastName","mobile","createdAt"],
      include: [
        {
        model: userContact,
        as: "user_contact",
        where: {
          userId: userId
        },
        required:false ,
      }
    ],
    limit:5,
    order: [ [ 'createdAt', 'DESC' ]]
    }).then(function(res){
      console.log(res);
      resolve(res)
    }).catch(err=>reject(err))
  })
};
