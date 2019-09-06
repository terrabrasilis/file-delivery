'use strict'

const path = require('path')

const config = {
  secret: process.env.JWT_SECRET || 'jwt_secret',
  env: process.env.NODE_ENV || 'dev',
  health: path.normalize(__dirname + '../../'),
  ip: process.env.IP || 'localhost',
  port: process.env.PORT || 9000,
  logType: process.env.LOGTYPE || 'dev'
}

module.exports = config
