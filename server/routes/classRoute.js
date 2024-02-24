const router = require('express').Router();
const Class = require('../models/Class');
const JWTAuthenticate = require('../middleware/JWTAuthenticate');
const Entry = require('../models/Entry');
const { Op, Sequelize } = require("sequelize");
const sequelize = require('sequelize');
require('dotenv').config()

function changeTime(dateString) {
    date = new Date(dateString)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    return String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0')
}

router.route('/create').post((req, res) => {
    const userID = JWTAuthenticate(req.body.token)
    if (userID === null) {
        res.json("invalid token")
        return
    }

    Class.create({
        name: req.body.name,
        days: req.body.days,
        startTime: changeTime(req.body.startTime),
        endTime: changeTime(req.body.endTime),
        user_id: userID
    })
    .then((newClass) => {
        const class_id = newClass.id;
        res.json(class_id);
    })
    .catch((error) => console.error(error))
})

router.route('/testing').post((req, res) => {
    Class.findAll()
    .then((classes) => res.json(classes))
    .catch((error) => console.error(error))
})

router.route("/dayData").post((req, res) => {
  const [className, score] = sequelize.query("SELECT class.name, entry.score \
FROM class, entry \
WHERE input.user = class.user_id \
AND input.date IN class.days \
AND class.id  = entry.class_id \
AND input \
.date = entry.date")
console.log(JSON.stringify(className))
console.log(JSON.stringify(score))
});

router.route('/day').post((req, res) => {
    const userID = JWTAuthenticate(req.body.token)
    if (userID === null) {
        res.json("invalid token")
        return
    }
    const days = ["U", "M", "T", "W", "R", "F", "S"]
    const dayDate = new Date(req.body.date)
    const day = days[dayDate.getDay()]
    Class.findAll({
        where: {
            [Op.and]: [
                {
                    user_id: userID
                },
                {
                    days: {
                        [Op.substring]: day
                    }
                }
            ]
        },
        include: [{
            model: Entry,
            where: {
                class_id: Sequelize.col('Class.id')
            },
            required: false
        }]
    })
    .then((classes) => res.json(classes))
    .catch((error) => console.error(error))
})

module.exports = router;