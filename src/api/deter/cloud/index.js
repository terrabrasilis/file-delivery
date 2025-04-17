import router from 'koa-router'
import { index } from './cloud.controller'

const cloud = router()

cloud.get('/:project/:granularity/:loi', index)

export default cloud
