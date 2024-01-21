const router = require('express').Router();
const User = require('../models/User');
require('dotenv').config()

const jwt = require('jsonwebtoken');

router.route('/create').post((req, res) => {
    User.create({
        email: req.body.email,
        password: req.body.password
    })
    .then(() => res.json("Added!"))
    .catch((error) => console.error(error))
})

router.route('/testing').post((req, res) => {
    User.findAll()
    .then((users) => res.json(users))
    .catch((error) => console.error(error))
})

router.route('/login').post((req, res) => {
    User.findOne({
        where: {
            email: req.body.username,
            password: req.body.password
        }
    })
    .then((user) => {
        const token = jwt.sign({ id: user.id}, process.env.JWTOKEN, { expiresIn: '1h'})
        res.json({token});
    })
    .catch((error) => console.error(error))
})
module.exports = router;