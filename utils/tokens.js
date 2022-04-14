const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const { JWT_TOKEN_SECRET, TOKEN_EXPIRE_SECONDS } = process.env

const generateToken = async (userId, username) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ userId, username }, JWT_TOKEN_SECRET, { expiresIn: parseInt(TOKEN_EXPIRE_SECONDS) }, (err, token) => {
            if (err) {
                reject(new Error('Token generation unsuccessful'))
            }
            resolve(token)
        })
    })
}

const verifyToken = (req, res, next) => {
    const authHeader = req.header('authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) return res.sendStatus(401)

    jwt.verify(token, JWT_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403)
        req.userId = decoded.userId
        req.username = decoded.username
        next()
    })
}


const validateToken = (req, res) => {
    const authHeader = req.header('authorization')
    const token = authHeader && authHeader.split(' ')[1]
    let decodedD = {}
    if (token === null) return res.sendStatus(401)
    jwt.verify(token, JWT_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403)
        const { userId, username } = decoded
        User.findById(userId).then(user => {
            res.send(user)
        }).catch(err => res.status(500).send(err))
    })
    return decodedD
}

module.exports = {
    generateToken,
    verifyToken,
    validateToken
}