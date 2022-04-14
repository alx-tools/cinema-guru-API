const express = require('express')
const router = express.Router()
const { Title, UserFavourites, UserWatchLater } = require('../../models/Title')
const User = require('../../models/User')
const UserActivity = require('../../models/UserActivity')
const { verifyToken } = require('../../utils/tokens')

router.get('/favorite/', verifyToken, (req, res) => {
    User.findOne({ where: { id: req.userId }, include: { model: Title, as: "favourite" } }).then(user => {
        res.send(user.favourite)
    }).catch(err => res.status(500).send(err))
})

router.get('/watchLater/', verifyToken, (req, res) => {
    User.findOne({ where: { id: req.userId }, include: { model: Title, as: "watchLater" } }).then(user => {
        res.send(user.watchLater)
    }).catch(err => res.status(500).send(err))
})

router.post('/favorite/:imdbId', verifyToken, (req, res) => {
    const { imdbId } = req.params
    User.findOne({ where: { id: req.userId }, include: { model: Title, as: "favourite" } }).then(user => {
        Title.findOne({ where: { imdbId } }).then(async title => {
            await user.addFavourite(title, { as: "favourite" })
            await UserActivity.create({
                userId: user.id,
                TitleId: title.id,
                activityType: "favourite"
            })
            res.send(user.favourite)
        }).catch(err => res.status(500).send(err))
    }).catch(err => res.status(500).send(err))
})

router.post('/watchlater/:imdbId', verifyToken, (req, res) => {
    const { imdbId } = req.params
    User.findOne({ where: { id: req.userId }, include: { model: Title, as: "watchLater" } }).then(user => {
        Title.findOne({ where: { imdbId } }).then(async title => {
            try {
                await user.addWatchLater(title, { as: "watchLater" })
                await UserActivity.create({
                    userId: user.id,
                    TitleId: title.id,
                    activityType: "watchLater"
                })
                res.send(user.watchLater)
            } catch (error) { res.status(500).send(error) }
        }).catch(err => res.status(500).send(err))
    }).catch(err => res.status(500).send(err))
})

router.delete('/favorite/:imdbId', verifyToken, async (req, res) => {
    const { imdbId } = req.params
    try {
        const title = await Title.findOne({ where: { imdbId } })
        const user = await User.findOne({ where: { id: req.userId } })
        await (await UserFavourites.findOne({ where: { UserId: req.userId, TitleId: title.id } })).destroy()
        const userActivity = await UserActivity.create({
            userId: user.id,
            TitleId: title.id,
            activityType: "removeFavourited"
        })
        res.send(userActivity)
    } catch (error) { res.status(500).send(error) }
})

router.delete('/watchlater/:imdbId', verifyToken, async (req, res) => {
    const { imdbId } = req.params
    try {
        const title = await Title.findOne({ where: { imdbId } })
        const user = await User.findOne({ where: { id: req.userId } })
        await (await UserWatchLater.findOne({ where: { UserId: req.userId, TitleId: title.id } })).destroy()
        const userActivity = await UserActivity.create({
            userId: user.id,
            TitleId: title.id,
            activityType: "removeWatchLater"
        })
        res.send(userActivity)
    } catch (error) { res.status(500).send(error) }
})


module.exports = router
