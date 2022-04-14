const express = require('express')
const router = express.Router()
const UserActivity = require('../models/UserActivity')
const User = require('../models/User')
const { Title } = require('../models/Title')
const { verifyToken } = require('../utils/tokens')

router.get('/', verifyToken, (req, res) => {
    UserActivity.findAll({
        include: [{
            model: User, as: "user", attributes: ["username"]
        },
        {
            model: Title, as: "title", attributes: ["title"]
        }],
        order: [["createdAt", "DESC"]]
    }).then(data => res.send(data)).catch(err => res.status(500).send(err))
})

module.exports = router
