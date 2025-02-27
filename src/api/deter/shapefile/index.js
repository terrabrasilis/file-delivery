import router from 'koa-router'
import { index } from './shapefile.controller'

const shapefile = router()

shapefile.get('/:project', index)

export default shapefile
