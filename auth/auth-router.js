const bcrypt = require("bcryptjs");

const router = require("express").Router();

const Users = require("../users/user-models.js");

router.post("/register", (req, res) => {
    let user = req.body;
    user.password = bcrypt.hashSync(user.password, 6); 
    console.log('password heading to db', user.password)

    const hashedpassword = user.password;

    Users.add(user)
      .then(saved => {
        req.session.user = saved;
        res.status(201).json({hashedpassword,...saved});
      })
      .catch(error => {
        console.log(error)
        res.status(500).json(error);
      });
  });
  

router.post("/login", (req, res) => {
    let { username, password } = req.body;
    //why do we have to destructure these?
    Users.findBy({ username })
      .first()
      //not 100% where the first is coming from/why its necessary
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          req.session.user = user;
          res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
          res.status(401).json({ message: "You shall not pass" });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  router.get('/logout', (req, res) => {
    if(req.session) {
      req.session.destroy(error => {
        if (error) {
          res.json({
            message: "you can checkout, but you cant leave"
          })
        } else {
           res.end();
        }
      })
    }
  })
  
  
module.exports = router;