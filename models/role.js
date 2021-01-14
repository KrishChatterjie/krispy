const sequelize = require('sequelize');
const db = require('../database/connection');
const logger = require('../logging/logger');

const schema = {
  roleId: {
    type: sequelize.STRING(255),
    primaryKey: true
  },
  role_name: {
    type: sequelize.STRING(255),
    allowNull: false
  },
  serverId: {
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
const role = db.define('role', schema, options);

Choice.sync({ alter: true })
  .then(() => {
    logger.info('role Migration Made');
  })
  .catch(err => {
    logger.error('An Error Occurred:' + err);
  });

module.exports = role;