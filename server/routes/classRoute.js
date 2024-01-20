const router = require('express').Router();
const Class = require('../models/Class');
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
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        user_id: userID
    })
    .then((newClass) => {
        const class_id = newClass.id;
        res.json(class_id);
    })
    .catch((error) => console.error(error))
})

module.exports = router;