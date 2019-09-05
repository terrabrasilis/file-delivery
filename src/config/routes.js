'use strict'

import mount from 'koa-mount'
import { health } from '../api'

export default function configRoutes (app) {
  app.use(mount('/', health.routes()))

  // List Endpoints Here
}
