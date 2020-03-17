'use strict'

import mount from 'koa-mount'
import { health, download } from '../api'

export default function configRoutes (app) {
  app.use(mount('/health', health.routes()))
  app.use(mount('/download', download.routes()))
  console.log("Registering routes");
  // List Endpoints Here
}
