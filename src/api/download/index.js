import { index } from './download.controller'
import router from 'koa-router'

const download = router()

download.get('/:projectId/:frequency', index)

export default download
