const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const { comparePassword } = require('../../utils/password')
const { generateToken } = require('../../utils/tokens')

router.post('/', async (req, res) => {
    User.findOne({ where: { username: req.body.username } })
        .then(user => {
            comparePassword(req.body.password, user.password)
                .then(correct => {
                    if (correct) {
                        generateToken(user.id, user.username)
                            .then(token => res.send({
                                message: 'Logged in successfully',
                                accessToken: token,
                            }))
                            .catch(err => res.status(500).send(err))
                    } else {
                        res.status(401).send({ message: 'Incorrect credentials' })
                    }
                })
        })
        .catch(() => res.status(401).send({ message: 'Incorrect credentials' }))
})

module.exports = router