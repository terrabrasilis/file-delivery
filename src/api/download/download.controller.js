import fs from 'fs'
import assert from 'assert'
import { get } from 'lodash'
import { constants, Utils } from '../utils'
import path from 'path'

import moment from 'moment'
import service from './download.service'
moment.locale('pt-BR')
const extname = path.extname

const Controller = {

  index (ctx, next) {
    const project = get(ctx, 'params.projectId')
    const frequency = get(ctx, 'params.frequency')

    const user = ctx.state.user
    const userType = user ? constants.ADMIN : constants.PUBLIC

    const filePath = service.getFileBasedOnProfile(userType, project, frequency)
    const FILE_IS_VALID = Utils.isFile(filePath)
    if (!FILE_IS_VALID) return ctx.body({ error: 'Sorry, we had a problem serving the file' })

    ctx.set('Content-disposition', 'attachment; filename=' + Controller.createFileName(project, filePath))
    ctx.type = extname(filePath)
    ctx.append('user-type', userType)
    ctx.body = Utils.getFileStream(filePath)
  },

  createFileName (project, filePath) {
    assert(project, 'project should be passed as param!')
    assert(filePath, 'filePath should be passed as param!')

    const dateString = moment().format('YYYYMMMDD')
    const extension = path.extname(filePath)
    const file = path.basename(filePath, extension)
    return `${project}-${file}-${dateString}${extension}`
  }

}

module.exports = Controller
