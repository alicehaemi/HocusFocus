const router = require('express').Router();
const Class = require('../models/class');
require('dotenv').config()

router.route('/create').post((req, res) => {
    Class.create({
        name: req.body.name,
        date: req.body.date,
        userid: req.body.user_id
    })
    .then(() => res.json("Successfully Added!"))
    .catch((error) => console.error(error))
})