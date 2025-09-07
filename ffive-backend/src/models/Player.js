const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Player = sequelize.define('Player', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('IGL', 'AWPer', 'Rifler', 'Support', 'Coach'),
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  faceitNickname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  faceitLevel: {
    type: DataTypes.INTEGER,
    validate: { min: 1, max: 10 }
  },
  faceitElo: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  kdRatio: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  winRate: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  headshotPercentage: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  totalMatches: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  totalWins: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  averageKills: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  bio: {
    type: DataTypes.TEXT,
    defaultValue: ''
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'players',
  timestamps: true
});

module.exports = Player;