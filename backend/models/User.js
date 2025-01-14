const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Availability = require('./Availability'); // Add this import at the top of your User.js file

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

User.hasMany(Availability, { foreignKey: 'userId' });

module.exports = User;
