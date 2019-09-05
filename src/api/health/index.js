'use strict'

import { index } from './health.controller'
import router from 'koa-router'

const health = router()

health.get('/', index)

export default health
