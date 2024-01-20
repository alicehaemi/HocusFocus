const router = require('express').Router();
const Class = require('../models/class');
const JWTAuthenticate = require('../middleware/JWTAuthenticate');
require('dotenv').config()

router.route('/create').post((req, res) => {
    const userID = JWTAuthenticate(req.body.token)
    if (userID === null) {
        res.json("invalid token")
        return
    }

    Class.create({
        name: req.body.name,
        date: req.body.date,
        user_id: userID
    })
    .then(() => res.json("Added!"))
    .catch((error) => console.error(error))
})

module.exports = router;