import fs from 'fs'
import { get, set } from 'lodash'
import constants from './constants'
  
const Utils = {
  readDockerSecret(filePath) {
    if (!filePath) return
    const FILE_EXISTS = this.isFile(filePath)
    if (!FILE_EXISTS) return
    return fs.readFileSync(filePath, 'utf8').trim()
  },

  getFileStream(filePath) {
    return fs.createReadStream(filePath)
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

  isFile(filePath) {
    let fileExists = false
    try {
      fileExists = fs.statSync(filePath).isFile()
    } catch (e) { console.error('File', filePath, ' does not exists') }

    return fileExists
  }

}

export default Utils
