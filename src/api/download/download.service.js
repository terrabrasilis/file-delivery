import fs from 'fs'
import tokenService from '../token'
import { constants, Utils } from '../utils'
import config from '../../config'

const Service = {

  getFileBasedOnProfile (userType) {
    switch (userType) {
      case constants.ADMIN:
        return this.getPrivateFile()
      case constants.PUBLIC:
        return this.getPublicFile()
      default:
    }
  },

  getPublicFile () {
    return Utils.readDockerSecret(config.publicFilePath)
  },

  getPrivateFile () {
    return Utils.readDockerSecret(config.privateFilePath)
  }
}

export default Service
