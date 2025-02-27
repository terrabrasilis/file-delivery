import router from 'koa-router'
import { index } from './data.controller'

const data = router()

data.get('/:project/:granularity/:loi', index)

export default data
