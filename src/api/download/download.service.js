import fs from 'fs'
import path from 'path'
import tokenService from '../token'
import { Utils } from '../utils'
import config from '../../config'

const Service = {
  getFileBasedOnProfile (userType, project, frequency) {
    const fileFrequency = Utils.getFileFrequencyName(userType, frequency)
    return path.join(config.filesPath, project, fileFrequency)
  }
}

export default Service
