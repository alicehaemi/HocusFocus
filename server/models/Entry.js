const DataTypes = require('sequelize');
const sequelize = require('../db');
const Class = require('./Class')

const Entry = sequelize.define('Entry', {
    class_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    date: { // date ONLY
        type: DataTypes.DATEONLY,
        allowNull: false
    }
    
})

Class.hasMany(Entry, {
    foreignKey: 'class_id',
    targetKey: 'id',
    onDelete: 'CASCADE'
})

Entry.hasOne(Class, {
    foreignKey: 'id',
    targetKey: 'class_id',
    onDelete: 'NO ACTION'
})

module.exports = Entry;