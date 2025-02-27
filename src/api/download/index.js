import router from 'koa-router'
import { index } from './download.controller'

const download = router()

download.get('/:projectId/:frequency', index)


export default download
