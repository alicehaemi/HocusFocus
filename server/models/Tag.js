const DataTypes = require('sequelize');
const sequelize = require('../db');

const Entry = require('./Entry')

const Tag = sequelize.define('Tag', {
    entry_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    tag_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
})

Entry.hasMany(Tag, {
    foreignKey: 'entry_id',
    targetKey: 'id',
    onDelete: 'CASCADE'
})

Tag.hasOne(Entry, {
    foreignKey: 'id',
    targetKey: 'entry_id',
    onDelete: 'NO ACTION'
})
