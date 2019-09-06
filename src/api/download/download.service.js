import fs from 'fs'
import tokenService from '../token'
import {constants} from '../utils'

const Service = {
  getFilePathBasedOnToken() {

  },

  getFileStream(filePath) {
    return fs.createReadStream(filePath)
  },

  isFile(filePath) {
    const fstat = fs.statSync(filePath)
    return fstat.isFile()
  }
}

export default Service
