const DataTypes = require("sequelize").DataTypes;
const sequelize = require('../config/database');
const { Title } = require('./Title')
const User = require("./User")

const UserActivity = sequelize.define('UserActivity', {
    activityType: {
        type: DataTypes.ENUM(["favourite", "watchLater", "removeFavourited", "removeWatchLater"])
    }
});

UserActivity.belongsTo(User, { as: "user", foreignKey: "userId" })
UserActivity.belongsTo(Title, { as: "title", foreignKey: "TitleId" })

module.exports = UserActivity;