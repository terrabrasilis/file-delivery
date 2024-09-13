import path from 'path'

const TEMPORARY_TEST_PUBLIC_PATH = path.join(__dirname, '../../test/files_mock/') 

const config = {
  filesPath: process.env.FILES_PATH || TEMPORARY_TEST_PUBLIC_PATH,
  env: process.env.NODE_ENV || 'dev',
  health: path.normalize(__dirname + '../../'),
  ip: process.env.IP || '0.0.0.0',
  port: process.env.PORT || 9003,
  logType: process.env.LOGTYPE || 'dev',
  oauthAPIURL:  process.env.OAUTH_API_URL,
  oauthAPIRole:  process.env.OAUTH_API_ROLE
}

module.exports = config
