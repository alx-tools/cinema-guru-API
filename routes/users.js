const express = require('express')
const { Title } = require('../models/Title')
const router = express.Router()
const User = require('../models/User')
const { verifyToken } = require('../utils/tokens')

// router.get('/', verifyToken, (req, res) => {
//     User.findAll().then(data => res.send(data)).catch(err => res.status(500).send(err))
// })

// router.get('/:username', verifyToken, (req, res) => {
//     const { username } = req.params
//     User.findOne({ where: { username }, include: [{ model: Title, as: "favourite" }, { model: Title, as: "watchLater" }] })
//         .then(data => res.send(data))
//         .catch(err => res.status(500).send(err))
// })

module.exports = router
