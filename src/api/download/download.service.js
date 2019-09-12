import fs from 'fs'
import path from 'path'
import tokenService from '../token'
import { get, set } from 'lodash'
import { constants } from '../utils'
import config from '../../config'

const Service = {
  getFileBasedOnProfile (userType, project, frequency) {
    const fileFrequency = this.getFileFrequencyName(userType, frequency)
    return path.join(config.filesPath, project, fileFrequency)
  },

  getFileFrequencyName(profile, frequency) {
    let files = {}
    const baseFrequencyJson = {
      daily: 'daily_d.json',
      monthly: 'month_d.json'
    }
    set(files, `${constants.PUBLIC}`, baseFrequencyJson)
    set(files, `${constants.ADMIN}`, baseFrequencyJson)

    return get(files, `${profile}.${frequency}`)
  },

}

export default Service
