const bcrypt = require('bcryptjs')

const Users = require('../users/user-models.js')

module.exports = (req, res, next) => {
    const {username, password} = req.headers;
        
    if(username && password) {
        Users.findBy({username})
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                next();
            } else {
                res.status(401).json({message: "invalid credentials"})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({errorMessage:"Ran into an unexpected error"})
        })
    } else {
        res.status(400).json({message: "No credentials provided"})
    }
}
