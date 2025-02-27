import router from 'koa-router'
import { index } from './aux.controller'

const aux = router()

aux.get('/:project/:auxFile', index)

export default aux
