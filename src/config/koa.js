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

  app.use(jwt({
    secret: config.secret,
    passthrough: true
  }))

  app.use((ctx, next) => {
    const error = get(ctx, 'state.jwtOriginalError.message')
    const IS_FORBIDDEN = includes(error, 'invalid') || includes(error, 'expired')

    if (IS_FORBIDDEN) {
      ctx.status = 401
      ctx.body = { error }
      return
    }

    ctx.body = ctx.request.body
    return next()
  })

  app.on('error', err => console.error(err))

  app.use(morgan(config.logType))
}
