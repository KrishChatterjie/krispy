const sequelize = require('sequelize')
const db = require('../database/connection')

const schema = {
  Serverid: {
    type: sequelize.STRING(255),
    primaryKey: true
  },
  Servername: {
    type: sequelize.STRING(255),
    allowNull: false
  }
}

const options = {
  timestamps: true
}
const server = db.define('server', schema, options)

server.sync({ alter: true })
  .then(() => {
    console.log('server Migration Made')
  })
  .catch(err => {
    console.log('An Error Occurred:' + err)
  })

module.exports = server
