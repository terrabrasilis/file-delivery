import fs from 'fs'
import { get } from 'lodash'
import { constants, Utils } from '../utils'
import path from 'path'
import service from './download.service'
const extname = path.extname

const Controller = {

  index (ctx, next) {
    const project  = get(ctx, 'params.projectId')
    const frequency = get(ctx, 'params.frequency')

    const user = ctx.state.user
    const userType = user ? constants.ADMIN : constants.PUBLIC

    const filePath = service.getFileBasedOnProfile(userType, project, frequency)
    const FILE_IS_VALID = Utils.isFile(filePath)
    if (!FILE_IS_VALID) return ctx.body({ error: 'Sorry, we had a problem serving the file' })

    ctx.type = extname(filePath)
    ctx.append('user-type', userType)
    ctx.body = Utils.getFileStream(filePath)
  }

}

module.exports = { index: Controller.index }
