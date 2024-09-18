import assert from 'assert'
import { get } from 'lodash'
import path from 'path'
import { constants, Utils } from '../utils'

import moment from 'moment'
import config from '../../config'
import Service from './download.service'
moment.locale('pt-BR')
const extname = path.extname

const Controller = {

  index (ctx, next) {

    const bearer = ctx.request.headers.authorization; 
    let userProfile = constants.PUBLIC;    
    let clientId = config.oauthAPIClientId;
    let role = config.oauthAPIRole;

    if(clientId && role)
    {
      if(bearer)
      {
        if(Service.validateUser(ctx, clientId, role, bearer))
        {
          userProfile = constants.AUTHENTICATED;
        }
      }
      Controller.processResponse(ctx, userProfile);
    }
    else
    {
      ctx.body = { error: 'Missing clientId or role configuration!' };
      return;
    }
  },

  processResponse(ctx, userProfile)
  {
    const project = get(ctx, 'params.projectId')
    const frequency = get(ctx, 'params.frequency')
    
    const filePath = Service.getFileBasedOnProfile(userProfile, project, frequency)
    const FILE_IS_VALID = Utils.isFile(filePath)
    if (!FILE_IS_VALID)
    {
      ctx.body = { error: 'Sorry, we had a problem serving the file' };
      return;
    } 

    ctx.set('Content-disposition', 'attachment; filename=' + Controller.createFileName(project, filePath))
    ctx.set("Access-Control-Allow-Origin", '*');
    ctx.set("Access-Control-Expose-Headers",'Content-Disposition');
    ctx.type = extname(filePath)
    ctx.append('user-type', userProfile)
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
