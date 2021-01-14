const sequelize = require('sequelize');
const db = require('../database/connection');
const logger = require('../logging/logger');

const schema = {
  taskId: {
    type: sequelize.UUID,
    primaryKey: true
  },
  task_name: {
    type: sequelize.STRING(255),
    allowNull: false
  },
  assigned_by: {
    type: sequelize.STRING(255),
    allowNull: false,
    references: {
      model: 'user',
      key: 'UserId'
    }
},
  assigned_to: {
    type: sequelize.STRING(255),
    allowNull: false,
    references: {
      model: 'user',
      key: 'UserId'
    }
  },
  task_status: {
    type: sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
  }
};

const options = {
  timestamps: false
};
const task = db.define('task', schema, options);

Poll.sync({ alter: true })
  .then(() => {
    logger.info('task Migration Made');
  })
  .catch(err => {
    logger.error('An Error Occurred:' + err);
  });

module.exports = task;
