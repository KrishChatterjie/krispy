const sequelize = require('sequelize');
const db = require('../database/connection');
const logger = require('../logging/logger');

const schema = {
  UserId: {
    type: sequelize.UUID,
  },
  discordId :{
    type: sequelize.STRING(255),
    primaryKey= true
  },
  UserName: {
    type: sequelize.STRING(255),
    allowNull: false
  },
  Serverid: {
    type: sequelize.STRING(255),
    allowNull: false,
    references: {
      model: 'server',
      key: 'Serverid'
    }
  }
};
const options = {
  timestamps: false
};
const user = db.define('user', schema, options);

Poll.sync({ alter: true })
  .then(() => {
    logger.info('user Migration Made');
  })
  .catch(err => {
    logger.error('An Error Occurred:' + err);
  });

module.exports = user;