import assert from 'assert'
import { get } from 'lodash'
import path from 'path'
import { Utils } from '../../utils'

import moment from 'moment'
import Service from './cloud.service'
moment.locale('pt-BR')
const extname = path.extname

const Controller = {

  index (ctx, next) {

    Controller.processResponse(ctx);
  },

  processResponse(ctx)
  {
    const project = get(ctx, 'params.project')
    const granularity = get(ctx, 'params.granularity')
    const loi = get(ctx, 'params.loi')

    if(project && granularity && loi)
    {
      const filePath = Service.getFile(project, granularity, loi)
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
      ctx.body = Utils.getFileStream(filePath)
    }
    else
    {
      ctx.body = { error: 'Missing paramater, syntax is: /deter/cloud/:biome/:granularity/:loi' };
      return;
    }
    

  },

  createFileName (project, filePath) {
    assert(project, 'project should be passed as param!')
    assert(filePath, 'filePath should be passed as param!')

    const dateString = moment().format('YYYYMMMDD')
    const extension = path.extname(filePath)
    const file = path.basename(filePath, extension)
    return `${file}-${dateString}${extension}`
  }

}

module.exports = Controller
