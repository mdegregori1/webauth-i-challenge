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
        res.status(201).json({hashedpassword,...saved});
      })
      .catch(error => {
        console.log(error)
        res.status(500).json(error);
      });
  });
  

router.post("/login", (req, res) => {
    let { username, password } = req.body;
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
          res.status(401).json({ message: "You shall not pass" });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  
  
module.exports = router;