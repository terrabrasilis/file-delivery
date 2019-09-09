import path from 'path'
import {Utils} from '../api/utils'

const config = {
  publicFilePath: Utils.readDockerSecret(process.env.PUBLIC_FILE_PATH) || 'public_path',
  privateFilePath: Utils.readDockerSecret(process.env.PRIVATE_FILE_PATH) || 'private_path',
  secret: process.env.JWT_SECRET || 'jwt_secret',
  env: process.env.NODE_ENV || 'dev',
  health: path.normalize(__dirname + '../../'),
  ip: process.env.IP || 'localhost',
  port: process.env.PORT || 9000,
  logType: process.env.LOGTYPE || 'dev'
}

module.exports = config
