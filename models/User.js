const DataTypes = require("sequelize").DataTypes;
const sequelize = require('../config/database');
const { hashPassword } = require('../utils/password')

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

User.beforeCreate(async (user, _) => { user.password = await hashPassword(user.password) })

module.exports = User;