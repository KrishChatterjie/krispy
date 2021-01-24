const sequelize = require('sequelize')
const db = require('../database/connection')

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
    type: sequelize.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'UserId'
    }
  },

  task_status: {
    type: sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}

const options = {
  timestamps: true
}
const task = db.define('task', schema, options)

task.sync({ alter: true })
  .then(() => {
    console.log('task Migration Made')
  })
  .catch(err => {
    console.log('An Error Occurred:' + err)
  })

module.exports = task
