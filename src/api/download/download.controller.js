import fs from 'fs'
import { constants } from '../utils'
import path from 'path'
const extname = path.extname

const Controller = {

  index(ctx, next) {
    const user = ctx.state.user
    const userType = user ? constants.ADMIN : constants.PUBLIC

    const filePath = path.join(__dirname, './file-example.zip')
    const fstat = fs.statSync(filePath)

    if (fstat.isFile()) {
      ctx.type = extname(filePath)
      ctx.append('user-type', userType)
      ctx.body = fs.createReadStream(filePath)
    }
  },

  getFileBasedOnProfile(userType) {
    switch (userType) {
      case constants.ADMIN:
        this.getPrivateFile()
        break
      case constants.PUBLIC:
        this.getPublicFile()
        break
      default:
    }
  },

  getPublicFile() {
    return Utils.readDockerSecret(config.publicFilePath)
  },

  getPrivateFile() {
    return Utils.readDockerSecret(config.privateFilePath)
  }
}

module.exports = { index: Controller.index }
