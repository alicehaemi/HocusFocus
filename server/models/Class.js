const DataTypes = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Class = sequelize.define('Class', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    days: { // custome date string
        type: DataTypes.STRING,
        allowNull: false
    },

    startTime: {
        type: DataTypes.TIME,
        allowNull: false
    },

    endTime: {
        type: DataTypes.TIME,
        allowNull: false
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    
})

User.hasMany(Class, {
    foreignKey: 'user_id',
    targetKey: 'id',
    onDelete: 'CASCADE'
})

Class.hasOne(User, {
    foreignKey: 'id',
    targetKey: 'user_id',
    onDelete: 'NO ACTION'
})

module.exports = Class;