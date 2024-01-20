const router = require('express').Router();
const User = require('../models/user');
require('dotenv').config()

const jwt = require('jsonwebtoken');

router.route('/create').post((req, res) => {
    User.create({
        email: req.body.email,
        password: req.body.password
    })
    .then(() => res.json("Successfully Added!"))
    .catch((error) => console.error(error))
})

router.route('/testing').post((req, res) => {
    User.findAll()
    .then((users) => res.json(users))
    .catch((error) => console.error(error))
})

router.route('/login').post((req, res) => {
    User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    .then((user) => {
        const token = jwt.sign({ email: user.email}, process.env.JWTOKEN, { expiresIn: '1h'})
        res.json({token});
    })
    .catch((error) => console.error(error))
})
module.exports = router;