const express = require('express')
const router = express.Router()
const { Title } = require('../../models/Title')
const { verifyToken } = require('../../utils/tokens')
const { Op } = require('@sequelize/core');
const userTitlesRouter = require('./userTitles')
const axios = require('axios')

router.use('/', userTitlesRouter)

router.get('/advancedsearch', verifyToken, async (req, res) => {
    const maxYear = parseInt(req.query.maxYear)
    const minYear = parseInt(req.query.maxYear)
    const genre = req.query.genres ? req.query.genres.split(',').map(genre => genre.charAt(0).toUpperCase() + genre.slice(1)) : []
    const params = {
        maxYear: isNaN(maxYear) ? 2022 : maxYear,
        minYear: isNaN(minYear) ? 0 : minYear,
        sort: req.query.sort ?? "",
        genres: genre,
        title: req.query.title ? req.query.title : "",
        page: req.query.page ? req.query.page : 1,
    }
    const titles = await Title.findAll({
        where: {
            released: {
                [Op.between]: [params.minYear, params.maxYear]
            },
            genres: {
                [Op.contains]: params.genres ? params.genres : true
            },
            title: {
                [Op.iLike]: `%${params.title}%`
            }
        },
        order: [getSort(params.sort)],
        limit: params.page * 50,
    }).catch(err => res.status(500).send(err))
    res.send({ totalCount: titles.length, titles })
})

router.get('/:imdbId', verifyToken, (req, res) => {
    const { imdbId } = req.params
    Title.findOne({ where: { imdbId } }).then(data => res.send(data)).catch(err => res.status(500).send(err))
})

// router.post('/seedDb', async (req, res) => {
//     let seeded = []
//     const start = 207
//     const pages = Array.from({ length: 60 }, (_, i) => i + start)
//     const delay = ms => new Promise(res => setTimeout(res, ms));
//     for (let i = 0; i < pages.length; i++) {
//         console.log(`Seeding page ${pages[i]}`);
//         const options = {
//             method: 'GET',
//             url: 'https://ott-details.p.rapidapi.com/advancedsearch',
//             params: { page: pages[i] },
//             headers: {
//                 'X-RapidAPI-Host': 'ott-details.p.rapidapi.com',
//                 'X-RapidAPI-Key': 'f7f773b1d0msh32b4bca0bbaffefp1eecc0jsn4b8bf0257608'
//             }
//         }
//         const { data } = await axios.request(options)
//         for (let j = 0; j < data.results.length; j++) {
//             const title = data.results[j];
//             const newTitle = await Title.create({
//                 title: title.title,
//                 imdbId: title.imdbid,
//                 synopsis: title.synopsis,
//                 imageurls: title.imageurl,
//                 imdbrating: title.imdbrating ?? -1,
//                 released: title.released,
//                 type: title.type,
//                 genres: title.genre
//             })
//             console.log(`Added title ${newTitle.title}`);
//             seeded.push(newTitle.toJSON())
//         }
//         await delay(1000);
//     }
//     res.send(seeded)
// })

const getSort = (param) => {
    switch (param) {
        case "oldest":
            return ['released', 'ASC']
        case "highestrated":
            return ['imdbrating', 'DESC']
        case "lowestrated":
            return ['imdbrating', 'ASC']
        default:
            return ['released', 'DESC']
    }
}

module.exports = router
