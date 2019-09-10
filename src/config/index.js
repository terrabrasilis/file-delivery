import path from 'path'
import {Utils} from '../api/utils'

const TEMPORARY_TEST_PUBLIC_PATH = path.join(__dirname, '../../test/download/secret_public.txt') 
const TEMPORARY_TEST_PRIVATE_PATH = path.join(__dirname, '../../test/download/secret_private.txt') 

const config = {
  publicFilePath: Utils.readDockerSecret(process.env.PUBLIC_FILE_PATH) || TEMPORARY_TEST_PUBLIC_PATH,
  privateFilePath: Utils.readDockerSecret(process.env.PRIVATE_FILE_PATH) || TEMPORARY_TEST_PRIVATE_PATH,
  secret: process.env.JWT_SECRET || 'jwt_secret',
  env: process.env.NODE_ENV || 'dev',
  health: path.normalize(__dirname + '../../'),
  ip: process.env.IP || 'localhost',
  port: process.env.PORT || 9000,
  logType: process.env.LOGTYPE || 'dev'
}

module.exports = config
