const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) reject(err)
            resolve(hash)
        });
    })
    return hashedPassword
}

const comparePassword = async (password, hash) => {
    const result = await new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, res) => {
            if (err) reject(err)
            resolve(res)
        });
    })
    return result
}

module.exports = { hashPassword, comparePassword }