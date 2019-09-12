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

    set(files, `${constants.PUBLIC}`, {
      daily: 'daily_d.json',
      monthly: 'month_d.json'
    })

    set(files, `${constants.ADMIN}`, {
      daily: 'daily_auth_d.json',
      monthly: 'month_auth_d.json'
    })

    return get(files, `${profile}.${frequency}`)
  },

}

export default Service
