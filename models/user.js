const sequelize = require('sequelize')
const db = require('../database/connection')

const schema = {
  UserId: {
    type: sequelize.UUID,
    primaryKey: true
  },
  discordId: {
    type: sequelize.STRING(255)
  },
  UserName: {
    type: sequelize.STRING(255),
    allowNull: false
  },
  ServerId: {
    type: sequelize.STRING(255),
    allowNull: false,
    references: {
      model: 'servers',
      key: 'Serverid'
    }
  }
}
const options = {
  timestamps: true
}
const user = db.define('user', schema, options)

user.sync({ alter: true })
  .then(() => {
    console.log('user Migration Made')
  })
  .catch(err => {
    console.log('An Error Occurred:' + err)
  })

module.exports = user
