const sequelize = require('sequelize');
const db = require('../database/connection');
const logger = require('../logging/logger');

const schema = {
  Serverid: {
    type: sequelize.STRING(255),
    primaryKey: true
  },
  Servername: {
    type: sequelize.STRING(255),
    allowNull: false
  }
};

const options = {
  timestamps: false
};
const server = db.define('server', schema, options);

server.sync({ alter: true })
  .then(() => {
    logger.info('server Migration Made');
  })
  .catch(err => {
    logger.error('An Error Occurred:' + err);
  });

module.exports = server;