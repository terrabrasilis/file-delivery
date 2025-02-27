'use strict'

import mount from 'koa-mount'
import { download, health } from '../api'
import { aux, data, shapefile } from '../api/deter'

export default function configRoutes (app) {
  app.use(mount('/health', health.routes()))
  
  //Old routes (Old Dashboards: Amz and Cerrado)
  app.use(mount('/download', download.routes()))

  //New routes (New Dashboards: Pantanal)
  app.use(mount('/deter/data', data.routes()))
  app.use(mount('/deter/shapefile', shapefile.routes()))
  app.use(mount('/deter/aux', aux.routes()))
  console.log("Registering routes");
  // List Endpoints Here
}
