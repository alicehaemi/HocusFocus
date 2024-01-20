const router = require('express').Router();
const Entry = require('../models/entry');
require('dotenv').config()

router.route('/create').post((req, res) => {
    Entry.create({
        class_id: req.body.class_id,
        score: req.body.score,
        date: req.body.date
    })
    .then(() => res.json("Recorded!"))
    .catch((error) => console.error(error))
})

router.route('/update').post((req, res) => {
    Entry.update({ score: req.body.score}, {
        where: {
            id: req.body.id
        }
    })
    .then(() => res.json("Updated!"))
    .catch((error) => console.error(error))
})

router.route('/reqByDay').post((req, res) => {
    Entry.findAll({
        where: {
            class_id: req.body.class_id,
            date: req.body.date
        }
    })
    .then((entries) => res.json(entries))
    .catch((error) => console.error(error))
})

router.route('reqByThisWeek').post((req, res) => {
    const today = new Date();
    const last = today - 7;
    Entry.findAll({
        where: {
            [Op.and]: [
                { date: {
                    [Op.between]: [sunday, today]
                }}, {
                class_id: req.body.class_id
                }
            ]
        }
    })
})

router.route('reqByThisWeek').post((req, res) => {
    var dayOfWeek = req.body.date.getDay()
    var diff = req.body.date.getDate() - dayOfWeek;
    const sunday = new Date(date.setDate(diff));

    const today = new Date();
    Entry.findAll({
        where: {
            [Op.and]: [
                { date: {
                    [Op.between]: [sunday, today]
                }}, {
                class_id: req.body.class_id
                }
            ]
        }
    })
})



