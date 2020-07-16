// module.exports = app => {
  const contactList = require("../controllers/contactList");

  var router = require("express").Router();

  // Create a new Contact
  // router.post("/createContact",(req,res,next)=>{
  //   console.log("in1")
  // });
  router.post("/createContact",(req,res,next)=>{
    // return new Promise((resolve,reject)=>{
      contactList.create(req).then((contacts)=>{
        // console.log(`${contacts} in response`)
        res.status(200).send( JSON.stringify(contacts, null, 4))
      }).catch(err=>{
        next(err)
      })

    
  });

  // Retrieve all Contact
  router.post("/getList", (req,res,next)=>{
    contactList.findAll(req.query.authorization).then((contacts)=>{
      res.send(contacts)
    }).catch(err=>{
      next(err)
    })
  });

  // Retrieve Recent Contact
  router.post("/getRecentList", (req,res,next)=>{
    contactList.findLatest(req.query.authorization).then((contacts)=>{
      res.send(contacts)
    }).catch(err=>{
      next(err)
    })
  });
module.exports = router;