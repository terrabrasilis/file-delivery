'use strict'

import config from './index'
import morgan from 'koa-morgan'
import parser from 'koa-bodyparser'
import cors from '@koa/cors'
import compress from 'koa-compress'
import jwt from 'koa-jwt'
import { get, includes } from 'lodash'

export default function configKoa (app) {
  app.use(compress())
  app.use(cors())
  app.use(parser({
    strict: false
  }))

   app.use((ctx, next) => {
    
    ctx.body = ctx.request.body
    
    return next()
  })
  
  app.on('error', err => console.error(err))

  app.use(morgan(config.logType))
}
