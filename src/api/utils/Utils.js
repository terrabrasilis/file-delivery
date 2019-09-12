import fs from 'fs'
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

  isFile(filePath) {
    let fileExists = false
    try {
      fileExists = fs.statSync(filePath).isFile()
    } catch (e) { console.error('File', filePath, ' does not exists') }

    return fileExists
  }

}

export default Utils
